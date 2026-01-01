"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import Link from "next/link"

interface RoomAvailability {
  roomId: string
  roomName: string
  capacity: number
  bookedSlots: number
  availableSlots: number
  status: "available" | "booked" | "fully-booked"
  bookings: Array<{
    id: string
    guest_id: string
    check_in_time: string
    check_out_time: string
  }>
}

interface TimeSlot {
  time: string
  displayTime: string
  available: boolean
  timezone: string
}

function BookingCalendarContent() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<RoomAvailability[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
  }, [router])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
    setAvailability([])
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
    setAvailability([])
  }

  const fetchAvailability = async (date: Date) => {
    setLoading(true)
    try {
      const dateString = date.toISOString().split("T")[0]
      const response = await fetch(`/api/bookings/availability?date=${dateString}`)

      if (response.ok) {
        const data = await response.json()
        setAvailability(data.availability || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching availability:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTimeSlots = async (date: Date, roomId: string) => {
    setLoading(true)
    try {
      const dateString = date.toISOString().split("T")[0]
      const response = await fetch(`/api/bookings/time-slots?date=${dateString}&roomId=${roomId}`)

      if (response.ok) {
        const data = await response.json()
        setTimeSlots(data.timeSlots || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching time slots:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)
    setSelectedRoom(null)
    setTimeSlots([])
    fetchAvailability(date)
  }

  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId)
    if (selectedDate) {
      fetchTimeSlots(selectedDate, roomId)
    }
  }

  const getDateStatus = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (date < today) {
      return "past"
    }
    return "future"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Booking Calendar Management</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar View */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="w-6 h-6" />
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 py-2 text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {Array(getFirstDayOfMonth(currentMonth))
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
              {Array(getDaysInMonth(currentMonth))
                .fill(null)
                .map((_, i) => {
                  const day = i + 1
                  const status = getDateStatus(day)
                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentMonth.getMonth() &&
                    selectedDate?.getFullYear() === currentMonth.getFullYear()

                  return (
                    <button
                      key={day}
                      onClick={() => status !== "past" && handleDateClick(day)}
                      disabled={status === "past"}
                      className={`p-3 rounded-lg text-center font-semibold transition ${
                        status === "past"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isSelected
                            ? "bg-amber-600 text-white"
                            : "bg-gray-50 hover:bg-amber-100 text-gray-900 cursor-pointer"
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-3 text-gray-700">Room Availability Legend</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-600 rounded"></div>
                  <span className="text-sm text-gray-600">Partially Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Fully Booked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Room Availability and Time Slots */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            {!selectedDate ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Select a date to view room availability</p>
                </div>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading availability...</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </h3>

                {/* Room availability list */}
                <div className="space-y-3 mb-6">
                  {availability.map((room) => (
                    <button
                      key={room.roomId}
                      onClick={() => handleRoomClick(room.roomId)}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        selectedRoom === room.roomId
                          ? "border-amber-600 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{room.roomName}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            room.status === "available"
                              ? "bg-green-500 text-white"
                              : room.status === "booked"
                                ? "bg-amber-600 text-white"
                                : "bg-red-500 text-white"
                          }`}
                        >
                          {room.status === "available"
                            ? "Available"
                            : room.status === "booked"
                              ? "Booked"
                              : "Fully Booked"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {room.availableSlots} of {room.capacity} slots available
                      </p>
                    </button>
                  ))}
                </div>

                {/* Time slots for selected room */}
                {selectedRoom && timeSlots.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-4 text-gray-900">Available Time Slots (GMT+8 Manila Time)</h4>
                    <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot.time}
                          className={`p-2 rounded-lg text-center text-sm font-medium ${
                            slot.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700 line-through"
                          }`}
                        >
                          {slot.displayTime}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {availability.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No rooms available for this date</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingCalendarPage() {
  return (
    <Suspense fallback={null}>
      <BookingCalendarContent />
    </Suspense>
  )
}

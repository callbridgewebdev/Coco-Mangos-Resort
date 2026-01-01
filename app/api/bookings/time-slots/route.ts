import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const roomId = searchParams.get("roomId")

    if (!date || !roomId) {
      return NextResponse.json({ error: "Date and roomId are required" }, { status: 400 })
    }

    const supabase = createClient()

    // Get all bookings for the specified date and room
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", roomId)
      .eq("check_in_date", date)
      .neq("status", "cancelled")

    if (error) throw error

    // Generate time slots (1:00 - 24:00 in GMT+8 Manila time)
    const timeSlots = []
    for (let hour = 1; hour <= 24; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`
      const isBooked = bookings?.some((booking) => {
        const checkInTime = booking.check_in_time || "00:00"
        const checkOutTime = booking.check_out_time || "23:59"
        return timeString >= checkInTime && timeString <= checkOutTime
      })

      timeSlots.push({
        time: timeString,
        displayTime: `${hour}:00`,
        available: !isBooked,
        timezone: "Asia/Manila (GMT+8)",
      })
    }

    return NextResponse.json({ date, roomId, timeSlots })
  } catch (error) {
    console.error("[v0] Error fetching time slots:", error)
    return NextResponse.json({ error: "Failed to fetch time slots" }, { status: 500 })
  }
}

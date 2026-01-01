import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const roomId = searchParams.get("roomId")

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }

    const supabase = createClient()

    // Get all bookings for the specified date
    let query = supabase
      .from("bookings")
      .select("*")
      .lte("check_in_date", date)
      .gte("check_out_date", date)
      .neq("status", "cancelled")

    if (roomId) {
      query = query.eq("room_id", roomId)
    }

    const { data: bookings, error } = await query

    if (error) throw error

    // Get all accommodations
    const { data: accommodations, error: accommodationsError } = await supabase
      .from("accommodations")
      .select("id, name, capacity")

    if (accommodationsError) throw accommodationsError

    // Calculate availability for each room
    const availability = accommodations?.map((room) => {
      const roomBookings = bookings?.filter((b) => b.room_id === room.id) || []
      const totalCapacity = room.capacity || 1
      const bookedSlots = roomBookings.length

      let status = "available"
      if (bookedSlots >= totalCapacity) {
        status = "fully-booked"
      } else if (bookedSlots > 0) {
        status = "booked"
      }

      return {
        roomId: room.id,
        roomName: room.name,
        capacity: totalCapacity,
        bookedSlots,
        availableSlots: totalCapacity - bookedSlots,
        status,
        bookings: roomBookings,
      }
    })

    return NextResponse.json({ date, availability })
  } catch (error) {
    console.error("[v0] Error fetching availability:", error)
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get("room_id")
    const approved = searchParams.get("approved")

    let query = supabase.from("reviews").select("*").order("created_at", { ascending: false })

    if (roomId) {
      query = query.eq("room_id", roomId)
    }

    if (approved !== null) {
      query = approved === "true" ? query.eq("is_approved", true) : query.eq("is_approved", false)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          room_id: body.room_id,
          booking_id: body.booking_id,
          guest_id: body.guest_id,
          rating: body.rating,
          comment: body.comment,
          is_approved: false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

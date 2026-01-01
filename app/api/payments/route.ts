import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("payments")
      .select("*, bookings(room_name), guests(full_name)")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("payments").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

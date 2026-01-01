import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const guestId = searchParams.get("guest_id")
    const status = searchParams.get("status")

    let query = supabase
      .from("top_up_transactions")
      .select("*, guests(full_name, email)")
      .order("created_at", { ascending: false })

    if (guestId) {
      query = query.eq("guest_id", guestId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching top-up transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("top_up_transactions")
      .insert([
        {
          guest_id: body.guest_id,
          amount: body.amount,
          payment_method: body.payment_method,
          reference_number: body.reference_number,
          receipt_url: body.receipt_url,
          status: "pending", // Always pending until admin approves
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error processing top-up:", error)
    return NextResponse.json({ error: "Failed to process top-up" }, { status: 500 })
  }
}

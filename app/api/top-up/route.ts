import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const guestId = searchParams.get("guest_id")

    let query = supabase.from("top_up_transactions").select("*").order("created_at", { ascending: false })

    if (guestId) {
      query = query.eq("guest_id", guestId)
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
          status: body.status || "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    // Update guest balance
    await supabase.from("guests").update({ account_balance: body.new_balance }).eq("id", body.guest_id)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error processing top-up:", error)
    return NextResponse.json({ error: "Failed to process top-up" }, { status: 500 })
  }
}

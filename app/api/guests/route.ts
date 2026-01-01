import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("guests").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching guests:", error)
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("guests")
      .insert([
        {
          full_name: body.full_name,
          email: body.email,
          phone: body.phone,
          account_balance: body.account_balance || 0,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating guest:", error)
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 })
  }
}

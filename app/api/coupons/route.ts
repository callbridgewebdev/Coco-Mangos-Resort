import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching coupons:", error)
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("coupons").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating coupon:", error)
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}

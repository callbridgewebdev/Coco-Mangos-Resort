import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    const { data, error } = await supabase.from("social_accounts").select("*").order("sort_order")

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching social accounts:", error)
    return NextResponse.json({ error: "Failed to fetch social accounts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from("social_accounts")
      .insert([{ ...body, updated_at: new Date().toISOString() }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating social account:", error)
    return NextResponse.json({ error: "Failed to create social account" }, { status: 500 })
  }
}

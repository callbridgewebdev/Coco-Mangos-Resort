import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page_name = searchParams.get("page_name")

    if (page_name) {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("page_name", page_name)
        .eq("is_enabled", true)
        .maybeSingle()

      if (error) throw error
      return NextResponse.json(data || {})
    }

    const { data, error } = await supabase.from("pages").select("*").order("page_name")

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from("pages")
      .insert([{ ...body, updated_at: new Date().toISOString() }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}

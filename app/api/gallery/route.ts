import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const publishedOnly = searchParams.get("published") === "true"

    let query = supabase.from("gallery").select("*").order("sort_order", { ascending: true })

    if (category) {
      query = query.eq("category", category)
    }

    if (publishedOnly) {
      query = query.eq("is_published", true)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("gallery")
      .insert([
        {
          title: body.title,
          description: body.description,
          image_url: body.image_url,
          category: body.category,
          sort_order: body.sort_order || 0,
          is_published: body.is_published !== false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

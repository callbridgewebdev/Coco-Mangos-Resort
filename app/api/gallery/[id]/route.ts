import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const id = params.id

    const { data, error } = await supabase
      .from("gallery")
      .update({
        title: body.title,
        description: body.description,
        image_url: body.image_url,
        category: body.category,
        sort_order: body.sort_order,
        is_published: body.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating gallery item:", error)
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const id = params.id

    const { error } = await supabase.from("gallery").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Gallery item deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting gallery item:", error)
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
  }
}

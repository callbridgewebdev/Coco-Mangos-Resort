import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("coupons").update(body).eq("id", params.id).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating coupon:", error)
    return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("coupons").delete().eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting coupon:", error)
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 })
  }
}

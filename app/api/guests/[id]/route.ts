import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const id = params.id

    const { data, error } = await supabase
      .from("guests")
      .update({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        account_balance: body.account_balance,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating guest:", error)
    return NextResponse.json({ error: "Failed to update guest" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const id = params.id

    const { error } = await supabase.from("guests").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting guest:", error)
    return NextResponse.json({ error: "Failed to delete guest" }, { status: 500 })
  }
}

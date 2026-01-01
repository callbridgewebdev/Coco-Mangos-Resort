import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const id = params.id

    const updateData: any = {
      status: body.status,
      updated_at: new Date().toISOString(),
    }

    if (body.admin_notes) {
      updateData.admin_notes = body.admin_notes
    }

    if (body.status === "approved") {
      updateData.approved_at = new Date().toISOString()

      // Get the transaction details
      const { data: transaction } = await supabase
        .from("top_up_transactions")
        .select("guest_id, amount")
        .eq("id", id)
        .single()

      if (transaction) {
        // Update guest balance
        const { data: guest } = await supabase
          .from("guests")
          .select("account_balance")
          .eq("id", transaction.guest_id)
          .single()

        if (guest) {
          const newBalance = (guest.account_balance || 0) + transaction.amount
          await supabase.from("guests").update({ account_balance: newBalance }).eq("id", transaction.guest_id)
        }
      }
    }

    const { data, error } = await supabase.from("top_up_transactions").update(updateData).eq("id", id).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating top-up transaction:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const id = params.id

    const { error } = await supabase.from("top_up_transactions").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting transaction:", error)
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 })
  }
}

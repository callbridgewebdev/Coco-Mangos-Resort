import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    const { data, error } = await supabase
      .from("settings")
      .select("setting_value")
      .eq("setting_key", "recaptcha_enabled")
      .maybeSingle()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ enabled: true }, { status: 200 })
    }

    if (!data) {
      // Initialize recaptcha_enabled setting if it doesn't exist
      await supabase.from("settings").insert({
        setting_key: "recaptcha_enabled",
        setting_value: "true",
      })
      return NextResponse.json({ enabled: true }, { status: 200 })
    }

    const enabled = data.setting_value === "true"
    return NextResponse.json({ enabled }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching reCAPTCHA setting:", error)
    return NextResponse.json({ enabled: true }, { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { enabled } = body
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    const { data, error } = await supabase
      .from("settings")
      .update({
        setting_value: enabled ? "true" : "false",
        updated_at: new Date().toISOString(),
      })
      .eq("setting_key", "recaptcha_enabled")
      .select()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error updating reCAPTCHA setting:", error)
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
  }
}

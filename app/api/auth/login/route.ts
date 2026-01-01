import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { verifyRecaptcha } from "@/lib/recaptcha"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    const { email, password, recaptchaToken, rememberMe } = await request.json()

    const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaValid) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Find guest by email
    const { data: guest, error } = await supabase.from("guests").select("*").eq("email", email).single()

    if (error || !guest) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, guest.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    let rememberMeToken = null
    if (rememberMe) {
      rememberMeToken = crypto.randomBytes(32).toString("hex")
      await supabase.from("guests").update({ remember_me_token: rememberMeToken }).eq("id", guest.id)
    }

    return NextResponse.json(
      {
        message: "Login successful",
        guest: {
          id: guest.id,
          email: guest.email,
          username: guest.username,
          fullName: guest.full_name,
        },
        rememberMeToken,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

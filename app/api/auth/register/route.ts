import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { validateEmail, validateUsername, validatePassword } from "@/lib/validation"
import { verifyRecaptcha } from "@/lib/recaptcha"

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

    const { email, username, password, fullName, phone, recaptchaToken, agreeToTerms } = await request.json()

    const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaValid) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Validate inputs
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const usernameValidation = validateUsername(username)
    if (!usernameValidation.valid) {
      return NextResponse.json({ error: usernameValidation.error }, { status: 400 })
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.error }, { status: 400 })
    }

    if (!agreeToTerms) {
      return NextResponse.json({ error: "You must agree to terms and conditions" }, { status: 400 })
    }

    const { data: existingEmail } = await supabase.from("guests").select("email").eq("email", email).single()

    if (existingEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const { data: existingUsername } = await supabase
      .from("guests")
      .select("username")
      .eq("username", username)
      .single()

    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create guest account
    const { data: guest, error } = await supabase
      .from("guests")
      .insert({
        email,
        username,
        full_name: fullName,
        phone,
        account_balance: 0,
        password_hash: hashedPassword,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
    }

    return NextResponse.json(
      { message: "Account created successfully", guest: { id: guest.id, email: guest.email } },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

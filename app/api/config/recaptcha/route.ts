export async function GET() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    return Response.json({ error: "reCAPTCHA site key not configured" }, { status: 500 })
  }

  return Response.json({ siteKey })
}

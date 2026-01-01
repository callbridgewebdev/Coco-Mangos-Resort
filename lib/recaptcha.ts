// Google reCAPTCHA v3 helper
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    // reCAPTCHA v3 returns a score between 0.0 and 1.0
    // Scores closer to 1.0 are more likely to be legitimate interactions
    return data.success && data.score > 0.5
  } catch (error) {
    console.error("[v0] reCAPTCHA verification error:", error)
    return false
  }
}

"use server"

export async function getRecaptchaKey() {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
}

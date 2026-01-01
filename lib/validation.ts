// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Username validation - minimum 6 characters, alphanumeric and underscores only
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (username.length < 6) {
    return { valid: false, error: "Username must be at least 6 characters" }
  }
  if (!/^[a-zA-Z0-9_]{6,}$/.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, and underscores" }
  }
  return { valid: true }
}

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" }
  }
  if (!/\d/.test(password)) {
    return { valid: false, error: "Password must contain at least 1 number" }
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { valid: false, error: "Password must contain at least 1 special character (!@#$%^&*, etc.)" }
  }
  return { valid: true }
}

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): { valid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match" }
  }
  return { valid: true }
}

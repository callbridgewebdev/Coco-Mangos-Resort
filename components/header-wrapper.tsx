"use client"

import { useState } from "react"
import Header from "./header"

export default function HeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
}

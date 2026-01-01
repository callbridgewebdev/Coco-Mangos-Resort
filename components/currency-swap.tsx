"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"

interface CurrencySwapProps {
  usdPrice: number
}

export default function CurrencySwap({ usdPrice }: CurrencySwapProps) {
  const [showPhp, setShowPhp] = useState(false)
  const exchangeRate = 56.5 // Philippine Peso to USD rate (approximate real-time)
  const phpPrice = usdPrice * exchangeRate

  return (
    <div
      className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:bg-muted/80 transition cursor-pointer"
      onClick={() => setShowPhp(!showPhp)}
    >
      <div className="flex items-center gap-2">
        <DollarSign size={18} className="text-secondary" />
        <span className="text-sm font-semibold text-foreground/70">Rate: 1 USD = ₱{exchangeRate.toFixed(2)}</span>
      </div>
      <div className="text-right">
        {showPhp ? (
          <div>
            <p className="text-xs text-foreground/60">Philippine Peso</p>
            <p className="text-lg font-bold text-secondary">₱{phpPrice.toFixed(2)}</p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-foreground/60">USD Price</p>
            <p className="text-lg font-bold text-primary">${usdPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

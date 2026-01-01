"use client"

import { useState, useEffect } from "react"
import { DollarSign, PiggyBank } from "lucide-react"

interface PriceConverterProps {
  priceUSD: number
}

export default function PriceConverter({ priceUSD }: PriceConverterProps) {
  const [pricePHP, setPricePHP] = useState<number | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
        const data = await response.json()
        const phpRate = data.rates.PHP
        setExchangeRate(phpRate)
        setPricePHP(Math.round(priceUSD * phpRate * 100) / 100)
      } catch (error) {
        console.log("[v0] Exchange rate fetch error:", error)
        // Fallback rate
        const fallbackRate = 55
        setExchangeRate(fallbackRate)
        setPricePHP(Math.round(priceUSD * fallbackRate * 100) / 100)
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRate()
  }, [priceUSD])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-foreground/70">
        <span>Loading rates...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <DollarSign size={18} className="text-green-500" />
        <span className="font-semibold">${priceUSD.toFixed(2)}</span>
        <span className="text-sm text-foreground/60">per night</span>
      </div>
      <div className="flex items-center gap-2">
        <PiggyBank size={18} className="text-blue-500" />
        <span className="font-semibold">₱{pricePHP?.toFixed(2)}</span>
        <span className="text-xs text-foreground/60">({exchangeRate?.toFixed(2)} rate)</span>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ApiTester } from "@/components/api-tester"
import { Button } from "@/components/ui/button"
import { RotateCcw, Clock } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // Use a key to force re-render of child components when reset
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    // Increment the key to force a re-render of all ApiTester components
    setResetKey((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Demo API</h1>
            <p className="text-gray-500">
              A simulation environment for testing Vercel platform behaviors. Generate HTTP status codes, test response
              times, and interact with endpoints that can succeed or fail on demand.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <div>
                Try status codes:
                <Link href="/200" className="text-primary hover:underline ml-1 mr-1">
                  200
                </Link>{" "}
                |
                <Link href="/404" className="text-primary hover:underline ml-1 mr-1">
                  404
                </Link>{" "}
                |
                <Link href="/500" className="text-primary hover:underline ml-1">
                  500
                </Link>
              </div>
              <div>
                <Link href="/speed" className="text-primary hover:underline inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Test response speed
                </Link>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="shrink-0 flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset All Stats
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ApiTester
            key={`users-${resetKey}`}
            title="/api/users"
            description="Fetches mock user data."
            endpoint="/api/users"
          />

          <ApiTester
            key={`products-${resetKey}`}
            title="/api/products"
            description="Fetches mock product data."
            endpoint="/api/products"
          />
        </div>
      </div>
    </main>
  )
}


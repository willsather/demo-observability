"use client";

import { ApiTester } from "@/components/api-tester";
import { Button } from "@/components/ui/button";
import { Clock, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Use a key to force re-render of child components when reset
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    // Increment the key to force a re-render of all ApiTester components
    setResetKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl tracking-tight">Demo API</h1>
            <p className="text-gray-500">
              A simulation environment for testing Vercel platform behaviors.
              Generate HTTP status codes, test response times, and interact with
              endpoints that can succeed or fail on demand.
            </p>
            <div className="space-y-1 text-gray-500 text-sm">
              <div>
                Try status codes:
                <Link
                  href="/200"
                  className="mr-1 ml-1 text-primary hover:underline"
                >
                  200
                </Link>{" "}
                |
                <Link
                  href="/404"
                  className="mr-1 ml-1 text-primary hover:underline"
                >
                  404
                </Link>{" "}
                |
                <Link href="/500" className="ml-1 text-primary hover:underline">
                  500
                </Link>
              </div>
              <div>
                <Link
                  href="/speed"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <Clock className="h-3 w-3" /> Test response speed
                </Link>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleReset}
            className="flex shrink-0 items-center gap-2"
          >
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
  );
}

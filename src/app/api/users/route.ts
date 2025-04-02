import { NextResponse } from "next/server"
import { shouldFail, getRandomError } from "@/lib/api-utils"

export async function GET(request: Request) {
  // Get URL to check for query parameters
  const url = new URL(request.url)
  const forceResult = url.searchParams.get("result")

  // Simulate processing delay (shortened)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

  // Force success or failure based on query parameter
  if (forceResult === "failure") {
    const error = getRandomError()
    return NextResponse.json({ message: error.message }, { status: error.status })
  }

  // Force success
  if (forceResult === "success") {
    return NextResponse.json({
      users: [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
        { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Editor" },
        { id: 4, name: "Dave Brown", email: "dave@example.com", role: "User" },
      ],
    })
  }

  // Random behavior (20% chance of failure)
  if (shouldFail()) {
    const error = getRandomError()
    return NextResponse.json({ message: error.message }, { status: error.status })
  }

  // Success response
  return NextResponse.json({
    users: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
      { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
      { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Editor" },
      { id: 4, name: "Dave Brown", email: "dave@example.com", role: "User" },
    ],
  })
}


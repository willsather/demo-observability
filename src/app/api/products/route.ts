import { getRandomError, shouldFail } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get URL to check for query parameters
  const url = new URL(request.url);
  const forceResult = url.searchParams.get("result");

  // Simulate processing delay (shortened)
  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 200),
  );

  // Force success or failure based on query parameter
  if (forceResult === "failure") {
    const error = getRandomError();
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  // Force success
  if (forceResult === "success") {
    return NextResponse.json({
      products: [
        { id: 101, name: "Smartphone", price: 699, inStock: true },
        { id: 102, name: "Laptop", price: 1299, inStock: true },
        { id: 103, name: "Headphones", price: 199, inStock: false },
        { id: 104, name: "Smartwatch", price: 249, inStock: true },
        { id: 105, name: "Tablet", price: 499, inStock: true },
      ],
    });
  }

  // Random behavior (20% chance of failure)
  if (shouldFail()) {
    const error = getRandomError();
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  // Success response
  return NextResponse.json({
    products: [
      { id: 101, name: "Smartphone", price: 699, inStock: true },
      { id: 102, name: "Laptop", price: 1299, inStock: true },
      { id: 103, name: "Headphones", price: 199, inStock: false },
      { id: 104, name: "Smartwatch", price: 249, inStock: true },
      { id: 105, name: "Tablet", price: 499, inStock: true },
    ],
  });
}

import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["hkg1"];

export async function GET() {
  console.log("Starting CN Cron Job...");

  const results = await generateTraffic(Math.random() * 20);

  console.log("Finished CN Cron Job");

  return NextResponse.json(results);
}

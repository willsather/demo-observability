import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["iad1", "hnd1"];

export async function GET() {
  console.log("Starting AU Cron Job...");

  const results = await generateTraffic(Math.random() * 12);

  console.log("Finished AU Cron Job");

  return NextResponse.json(results);
}

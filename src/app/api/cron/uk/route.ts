import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["lhr1"];

export async function GET() {
  console.log("Starting UK Cron Job...");

  const results = await generateTraffic(Math.random() * 15);

  console.log("Finished UK Cron Job");

  return NextResponse.json(results);
}

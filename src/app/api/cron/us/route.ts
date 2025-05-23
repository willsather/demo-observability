import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["iad1", "sfo1"];
export const runtime = "edge";

export async function GET() {
  console.log("Starting US Cron Job...");

  const results = await generateTraffic(Math.random() * 25);

  console.log("Finished US Cron Job");

  return NextResponse.json(results);
}

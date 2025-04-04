import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["cdg1", "arn1"];
export const runtime = "edge";

export async function GET() {
  console.log("Starting EU Cron Job...");

  const results = await generateTraffic(Math.random() * 15);

  console.log("Finished EU Cron Job");

  return NextResponse.json(results);
}

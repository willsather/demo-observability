import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["gru1"];

export async function GET() {
  console.log("Starting BR Cron Job...");

  const results = await generateTraffic(Math.random() * 10);

  console.log("Finished BR Cron Job");

  return NextResponse.json(results);
}

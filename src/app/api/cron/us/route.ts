import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["cle1"];

export async function GET() {
  console.log("Starting US Cron Job...");

  const results = await generateTraffic(Math.random() * 25);

  console.log("Finished US Cron Job");

  return NextResponse.json(results);
}

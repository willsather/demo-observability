import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["hnd1", "bom1"];
export const runtime = "edge";

export async function GET() {
  console.log("Starting AP Cron Job...");

  const results = await generateTraffic(Math.random() * 10);

  console.log("Finished AP Cron Job");

  return NextResponse.json(results);
}

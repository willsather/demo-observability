import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export const preferredRegion = ["cpt1"];
export const runtime = "edge";

export async function GET() {
  console.log("Starting ZA Cron Job...");

  const results = await generateTraffic(Math.random() * 25);

  console.log("Finished ZA Cron Job");

  return NextResponse.json(results);
}

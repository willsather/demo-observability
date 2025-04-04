import { NextResponse } from "next/server";

import { generateTraffic } from "@/app/api/generate-traffic";

export async function GET() {
  console.log("Starting Cron Job...");

  const results = await generateTraffic(Math.random() * 20);

  console.log("Finished Cron Job");

  return NextResponse.json(results);
}

import { chromium } from "playwright";

const PAGES = ["/", "/speed", "/200"];
const BASE_URL = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : "http://localhost:3000";

function getRandomVisitCount() {
  return Math.floor(Math.random() * 500) + 75; // 75 to 500
}

function getRandomUserAgent(): string {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X)...",
    "Mozilla/5.0 (iPhone; CPU iPhone OS)...",
    "Mozilla/5.0 (Linux; Android 11)...",
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function main() {
  console.log(`🚀 Starting at ${new Date().toISOString()}`);

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    userAgent: getRandomUserAgent(),
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  for (const route of PAGES) {
    const visitCount = getRandomVisitCount();
    console.log(`🌐 Visiting ${route} ${visitCount} times...`);

    for (let i = 0; i < visitCount; i++) {
      try {
        const fullUrl = `${BASE_URL}${route}`;
        await page.goto(fullUrl, { waitUntil: "load", timeout: 10000 });
        await page.waitForTimeout(500 + Math.random() * 1000);
      } catch (error) {
        throw new Error("Visit Failed", { cause: error });
      }
    }
  }

  await browser.close();

  console.log("✅ Finished Browser-Based Traffic Simulation");
}

main();

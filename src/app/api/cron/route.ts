import { NextResponse } from "next/server";

const PAGES = ["/", "/speed", "/200", "/404", "/500", "/307"];

const API_ENDPOINTS = ["/api/users", "/api/products"];

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
];

const getRandomItem = (array: string[]): string =>
  array[Math.floor(Math.random() * array.length)];

type RequestResult = {
  url: string;
  status: number;
  success: boolean;
  timeMs: number;
  error?: string;
};

type Results = {
  timestamp: string;
  pages: RequestResult[];
  apis: RequestResult[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    avgResponseTime: number;
  };
};

export async function GET() {
  console.log("Starting Cron Job...");

  const results: Results = {
    timestamp: new Date().toISOString(),
    pages: [],
    apis: [],
    summary: {
      total: 0,
      successful: 0,
      failed: 0,
      avgResponseTime: 0,
    },
  };

  const pageRequests: Promise<RequestResult>[] = [];
  for (const page of PAGES) {
    const count = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < count; i++) {
      pageRequests.push(makeRequest(page));
    }
  }

  const apiRequests: Promise<RequestResult>[] = [];
  for (const endpoint of API_ENDPOINTS) {
    const count = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < count; i++) {
      apiRequests.push(makeRequest(endpoint, true));
    }
  }

  results.pages = await Promise.all(pageRequests);
  results.apis = await Promise.all(apiRequests);

  const allRequests = [...results.pages, ...results.apis];
  results.summary.total = allRequests.length;
  results.summary.successful = allRequests.filter((r) => r.success).length;
  results.summary.failed = allRequests.filter((r) => !r.success).length;
  results.summary.avgResponseTime = Math.round(
    allRequests.reduce((sum, r) => sum + r.timeMs, 0) / allRequests.length,
  );

  printResults(results);

  return NextResponse.json(results);
}

function printResults(results: Results) {
  console.log("Traffic Simulation Summary:");
  console.table({
    timestamp: results.timestamp,
    totalRequests: results.summary.total,
    successful: results.summary.successful,
    failed: results.summary.failed,
    avgResponseTime: `${results.summary.avgResponseTime}ms`,
  });

  console.log("Detailed Request Results:");
  console.table([
    ...results.pages.map((r) => ({
      type: "Page",
      url: r.url,
      status: r.status,
      success: r.success,
      responseTime: `${r.timeMs}ms`,
      error: r.error || "-",
    })),
    ...results.apis.map((r) => ({
      type: "API",
      url: r.url,
      status: r.status,
      success: r.success,
      responseTime: `${r.timeMs}ms`,
      error: r.error || "-",
    })),
  ]);
}

async function makeRequest(url: string, isApi = false): Promise<RequestResult> {
  const startTime = Date.now();

  try {
    let method = "GET";
    if (isApi && Math.random() > 0.7) {
      method = ["POST", "PUT", "DELETE"][Math.floor(Math.random() * 3)] as
        | "POST"
        | "PUT"
        | "DELETE";
    }

    const options: RequestInit = {
      method,
      headers: {
        "User-Agent": getRandomItem(USER_AGENTS),
        Accept: "application/json, text/html",
        "X-Simulated-Traffic": "true",
      },
      redirect: "manual", // don't follow redirects
    };

    if (isApi && method !== "GET") {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify({
        timestamp: new Date().toISOString(),
        simulatedData: true,
        value: Math.random() * 100,
      });
    }

    // Get the base URL from the request or use a default
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    // Make the request
    const fullUrl = new URL(url, baseUrl).toString();
    const response = await fetch(fullUrl, options);

    const endTime = Date.now();

    return {
      url,
      status: response.status,
      success: response.status >= 200 && response.status < 400,
      timeMs: endTime - startTime,
    };
  } catch (error) {
    const endTime = Date.now();

    return {
      url,
      status: 0,
      success: false,
      timeMs: endTime - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

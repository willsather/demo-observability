import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Clock, Zap } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

// This function simulates a delay on the server side
async function getSpeedData() {
  // Generate a random delay between 100ms and 5000ms
  const delay = Math.floor(Math.random() * 4900) + 100;

  // Wait for the delay
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Categorize the speed
  let category: "fast" | "medium" | "slow";
  if (delay < 1000) {
    category = "fast";
  } else if (delay < 3000) {
    category = "medium";
  } else {
    category = "slow";
  }

  return {
    delay,
    category,
    timestamp: new Date().toISOString(),
  };
}

export default async function SpeedPage() {
  const speedData = await getSpeedData();

  // Define UI elements based on the speed category
  const uiConfig = {
    fast: {
      bgColor: "bg-green-50",
      headerBg: "bg-green-100",
      headerBorder: "border-green-200",
      icon: <Zap className="h-5 w-5 text-green-700" />,
      title: "Fast Response",
      titleColor: "text-green-900",
      description: "The server responded quickly with minimal delay.",
      cardBg: "bg-white",
      cardBorder: "border-green-200",
    },
    medium: {
      bgColor: "bg-yellow-50",
      headerBg: "bg-yellow-100",
      headerBorder: "border-yellow-200",
      icon: <Clock className="h-5 w-5 text-yellow-700" />,
      title: "Medium Response",
      titleColor: "text-yellow-900",
      description: "The server response time was acceptable but not optimal.",
      cardBg: "bg-white",
      cardBorder: "border-yellow-200",
    },
    slow: {
      bgColor: "bg-red-50",
      headerBg: "bg-red-100",
      headerBorder: "border-red-200",
      icon: <AlertTriangle className="h-5 w-5 text-red-700" />,
      title: "Slow Response",
      titleColor: "text-red-900",
      description:
        "The server took too long to respond. This could indicate performance issues.",
      cardBg: "bg-white",
      cardBorder: "border-red-200",
    },
  };

  const config = uiConfig[speedData.category];

  return (
    <div
      className={`min-h-screen ${config.bgColor} flex flex-col items-center justify-center p-6`}
    >
      <div
        className={`w-full max-w-md ${config.cardBg} rounded-lg border shadow-sm ${config.cardBorder} overflow-hidden`}
      >
        <div
          className={`${config.headerBg} border-b p-4 ${config.headerBorder}`}
        >
          <div className="flex items-center gap-2">
            {config.icon}
            <h1 className={`font-medium text-lg ${config.titleColor}`}>
              {config.title}
            </h1>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">
              Response Time: {speedData.delay}ms
            </h2>
            <p className="text-gray-600">{config.description}</p>
          </div>

          <div className="rounded-md border bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap text-gray-700 text-sm">
              {JSON.stringify(
                {
                  responseTime: `${speedData.delay}ms`,
                  category: speedData.category,
                  timestamp: speedData.timestamp,
                },
                null,
                2,
              )}
            </pre>
          </div>

          <div className="flex gap-2 pt-2">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to API Tester
              </Button>
            </Link>
            <Link href="/speed">
              <Button variant="outline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Test Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Zap, AlertTriangle } from "lucide-react"

// This function simulates a delay on the server side
async function getSpeedData() {
  // Generate a random delay between 100ms and 5000ms
  const delay = Math.floor(Math.random() * 4900) + 100

  // Wait for the delay
  await new Promise((resolve) => setTimeout(resolve, delay))

  // Categorize the speed
  let category: "fast" | "medium" | "slow"
  if (delay < 1000) {
    category = "fast"
  } else if (delay < 3000) {
    category = "medium"
  } else {
    category = "slow"
  }

  return {
    delay,
    category,
    timestamp: new Date().toISOString(),
  }
}

export default async function SpeedPage() {
  const speedData = await getSpeedData()

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
      description: "The server took too long to respond. This could indicate performance issues.",
      cardBg: "bg-white",
      cardBorder: "border-red-200",
    },
  }

  const config = uiConfig[speedData.category]

  return (
    <div className={`min-h-screen ${config.bgColor} flex flex-col items-center justify-center p-6`}>
      <div
        className={`max-w-md w-full ${config.cardBg} rounded-lg shadow-sm border ${config.cardBorder} overflow-hidden`}
      >
        <div className={`${config.headerBg} p-4 border-b ${config.headerBorder}`}>
          <div className="flex items-center gap-2">
            {config.icon}
            <h1 className={`text-lg font-medium ${config.titleColor}`}>{config.title}</h1>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Response Time: {speedData.delay}ms</h2>
            <p className="text-gray-600">{config.description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
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

          <div className="pt-2 flex gap-2">
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
  )
}


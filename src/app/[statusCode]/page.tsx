import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Info } from "lucide-react"
import { getStatusCodeInfo } from "@/lib/status-codes"

export default async function StatusCodePage({ params }: {
  params: Promise<{
    statusCode: string
  }>
}) {
  const { statusCode } = (await params);
  const code = Number.parseInt(statusCode, 10)

  if (isNaN(code)) {
    notFound()
  }

  const statusInfo = getStatusCodeInfo(code)

  if (!statusInfo) {
    notFound()
  }

  if (code >= 300 && code < 400) {
    redirect("/")
  }

  if (code == 404) {
    notFound()
  }

  if (code >= 500) {
    throw new Error("a fake error, oh no!")
  }


  if (code >= 200 && code < 300) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden">
          <div className="bg-green-100 p-4 border-b border-green-200">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-700" />
              <h1 className="text-lg font-medium text-green-900">HTTP Status {code}</h1>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{statusInfo.name}</h2>
              <p className="text-gray-600">{statusInfo.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    status: code,
                    statusText: statusInfo.name,
                    message: statusInfo.description,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>

            <div className="pt-2">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to API Tester
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  notFound()
}


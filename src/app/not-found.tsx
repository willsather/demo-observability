import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const code = 404;
  const statusInfo = {
    name: "Page Not Found",
    description: "The requested resource could not be found on this server.",
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-red-200 bg-white shadow-sm">
        <div className="border-red-200 border-b bg-red-100 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-700" />
            <h1 className="font-medium text-red-900 text-lg">{code}</h1>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">{statusInfo.name}</h2>
            <p className="text-gray-600">{statusInfo.description}</p>
          </div>

          <div className="rounded-md border bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap text-gray-700 text-sm">
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
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

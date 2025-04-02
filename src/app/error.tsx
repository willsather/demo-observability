"use client";

import { Button } from "@/components/ui/button";
import { AlertOctagon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const code = 500;
  const statusInfo = {
    name: "Internal Server Error",
    description:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-red-200 bg-white shadow-sm">
        <div className="border-red-200 border-b bg-red-100 p-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-red-700" />
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
                  digest: error.digest,
                },
                null,
                2,
              )}
            </pre>
          </div>

          <div className="pt-2 flex gap-2">
            <Button
              onClick={reset}
              variant="default"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
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

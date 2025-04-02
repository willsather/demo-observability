"use client";

import { AlertCircle, CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApiTesterProps {
  title: string;
  description: string;
  endpoint: string;
}

export function ApiTester({ title, description, endpoint }: ApiTesterProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [callCount, setCallCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);

  const callApi = async (forceResult?: "success" | "failure") => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const url = forceResult ? `${endpoint}?result=${forceResult}` : endpoint;

    try {
      const res = await fetch(url);
      setCallCount((prev) => prev + 1);

      if (!res.ok) {
        const errorData = await res.json();
        setError(`${res.status}: ${errorData.message || "Unknown error"}`);
        setFailureCount((prev) => prev + 1);
      } else {
        const data = await res.json();
        setResponse(data);
        setSuccessCount((prev) => prev + 1);
      }
    } catch (err) {
      setError(
        `Network error: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
      setFailureCount((prev) => prev + 1);
      setCallCount((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const successRate =
    callCount > 0 ? Math.round((successCount / callCount) * 100) : 0;
  const failureRate =
    callCount > 0 ? Math.round((failureCount / callCount) * 100) : 0;

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="font-mono text-lg">{title}</CardTitle>
        <div className="space-y-1">
          <CardDescription>{description}</CardDescription>
          <Link
            href={endpoint}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary text-xs underline underline-offset-2 hover:text-primary/80"
          >
            Open API <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Calls: {callCount}</Badge>
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Success: {successCount} ({successRate}%)
          </Badge>
          <Badge variant="destructive">
            Failures: {failureCount} ({failureRate}%)
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => callApi()}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calling...
              </>
            ) : (
              "Call API (Randomized)"
            )}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => callApi("success")}
              disabled={loading}
              variant="default"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Force Success
            </Button>
            <Button
              onClick={() => callApi("failure")}
              disabled={loading}
              variant="destructive"
            >
              Force Failure
            </Button>
          </div>
        </div>

        {/* Response area with consistent height to prevent layout shift */}
        <div className="min-h-[180px]">
          {/* Skeleton loader */}
          {loading && (
            <div className="animate-pulse rounded-md border p-4">
              <div className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-gray-200" />
                <div className="w-full">
                  <div className="mb-3 h-4 w-24 rounded bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                    <div className="h-3 w-4/6 rounded bg-gray-200" />
                    <div className="h-3 w-3/6 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error response */}
          {!loading && error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <div className="flex items-start">
                <AlertCircle className="mt-0.5 mr-2 h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-800">Error</h4>
                  <p className="mt-1 text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success response */}
          {!loading && response && (
            <div className="rounded-md border border-green-200 bg-green-50 p-4">
              <div className="flex items-start">
                <CheckCircle className="mt-0.5 mr-2 h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium text-green-800">Success</h4>
                  <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap text-green-700 text-sm">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && !response && (
            <div className="flex h-full items-center justify-center rounded-md border border-dashed p-4">
              <p className="text-gray-400 text-sm">
                Click any button above to test the endpoint
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

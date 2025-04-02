import { Button } from "@/components/ui/button";
import { getStatusCodeInfo } from "@/lib/status-codes";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function StatusCodePage({
  params,
}: {
  params: Promise<{
    statusCode: string;
  }>;
}) {
  const { statusCode } = await params;
  const code = Number.parseInt(statusCode, 10);

  if (Number.isNaN(code)) {
    notFound();
  }

  const statusInfo = getStatusCodeInfo(code);

  if (!statusInfo) {
    notFound();
  }

  if (code >= 300 && code < 400) {
    redirect("/");
  }

  if (code === 404) {
    notFound();
  }

  if (code >= 500) {
    throw new Error("a fake error, oh no!");
  }

  if (code >= 200 && code < 300) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-6">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-green-200 bg-white shadow-sm">
          <div className="border-green-200 border-b bg-green-100 p-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-700" />
              <h1 className="font-medium text-green-900 text-lg">{code}</h1>
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
                  Back to API Tester
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  notFound();
}

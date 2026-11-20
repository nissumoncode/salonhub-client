"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-[#E8D8C3] text-center shadow-sm">
        <CardHeader>
          <div className="mb-3 text-5xl">🛡️</div>

          <CardTitle className="text-3xl font-bold text-foreground">
            Access Denied
          </CardTitle>

          <CardDescription className="mt-2 text-xl font-semibold text-[#B8955A]">
            403 - Unauthorized
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-[#6B5B50]">
            You are not authorized to access this dashboard.
          </p>

          <p className="text-sm text-[#6B5B50]">
            Please contact the administrator if you believe this is a mistake.
          </p>

          <Button
            className="w-full bg-[#4A382E] text-white hover:bg-[#6B5B50]"
            onClick={() => router.push("/")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default UnauthorizedPage;

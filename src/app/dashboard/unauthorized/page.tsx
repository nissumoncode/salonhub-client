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
    <main className="flex min-h-screen items-center justify-center bg-background p-3 sm:p-4">
      <Card className="w-full max-w-md border-border text-center shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="mb-3 text-5xl">{"\uD83D\uDEE1\uFE0F"}</div>

          <CardTitle className="text-2xl font-bold text-foreground sm:text-3xl">
            Access Denied
          </CardTitle>

          <CardDescription className="mt-2 text-lg font-semibold text-gold-text sm:text-xl">
            403 - Unauthorized
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          <p className="text-muted-foreground">
            You are not authorized to access this dashboard.
          </p>

          <p className="text-sm text-muted-foreground">
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


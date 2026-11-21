"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function BlockedPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            Account Blocked
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Your account access has been restricted.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Your SalonHub account has been blocked by the administrator. You
            cannot access customer dashboard features or book appointments while
            your account is blocked.
          </p>

          <p className="text-sm text-muted-foreground">
            Please contact the administrator for assistance.
          </p>

          <Button
            className="w-full bg-[#6B4F3A] text-white hover:bg-[#4A382E]"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

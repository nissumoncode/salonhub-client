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
    <main className="flex min-h-screen items-center justify-center bg-[#F8F1E8] p-6">
      <Card className="w-full max-w-md border-[#E8DCCB] text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-red-700">
            Account Blocked
          </CardTitle>

          <CardDescription className="text-[#6B5B50]">
            Your account access has been restricted.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-sm leading-6 text-[#6B5B50]">
            Your SalonHub account has been blocked by the administrator. You
            cannot access customer dashboard features or book appointments while
            your account is blocked.
          </p>

          <p className="text-sm text-[#6B5B50]">
            Please contact the administrator for assistance.
          </p>

          <Button
            className="w-full bg-[#6B4F3A] hover:bg-[#4A382E]"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

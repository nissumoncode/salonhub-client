"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const GoogleAuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: session, error } = await authClient.getSession();

        if (error || !session) {
          toast.error("Google sign in failed. Please try again.");
          router.replace("/sign-in");
          return;
        }

        const role = (session.user as { role?: string }).role;
        const params = new URLSearchParams(window.location.search);
        const requestedURL = params.get("callbackURL") || "/";

        const callbackURL =
          requestedURL.startsWith("/") && !requestedURL.startsWith("//")
            ? requestedURL
            : "/";

        toast.success("Signed in successfully!");

        if (role === "admin") {
          router.replace("/dashboard/admin");
        } else {
          router.replace(callbackURL);
        }
      } catch {
        toast.error("Something went wrong during Google sign in.");
        router.replace("/sign-in");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Completing Google sign in...</p>
    </div>
  );
};

export default GoogleAuthCallbackPage;

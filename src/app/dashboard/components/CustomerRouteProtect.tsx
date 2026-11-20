"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const CustomerRouteProtect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkCustomer = async () => {
      try {
        const { data: session } = await authClient.getSession();

        if (!session) {
          router.replace("/sign-in");
          return;
        }

        const user = session.user as {
          role?: string;
          isBlocked?: boolean;
        };

        if (user.isBlocked) {
          router.replace("/dashboard/blocked");
          return;
        }

        if (user.role !== "customer") {
          router.replace("/dashboard/unauthorized");
          return;
        }

        setIsAuthorized(true);
      } catch {
        router.replace("/sign-in");
      }
    };

    checkCustomer();
  }, [router]);

  if (!isAuthorized) {
    return <div className="p-6">Checking access...</div>;
  }

  return <>{children}</>;
};

export default CustomerRouteProtect;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AdminRouteProtect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
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

        if (user.role !== "admin") {
          router.replace("/dashboard/unauthorized");
          return;
        }

        setIsAuthorized(true);
      } catch {
        router.replace("/sign-in");
      }
    };

    checkAdmin();
  }, [router]);

  if (!isAuthorized) {
    return <div className="p-6">Checking access...</div>;
  }

  return <>{children}</>;
};

export default AdminRouteProtect;

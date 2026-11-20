"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user as
    | {
        name?: string;
        role?: string;
      }
    | undefined;

  const handleLogout = async () => {
    await authClient.signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/customer";

  return (
    <nav className="border-b border-[#E8D8C3] bg-[#F8F1E8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-[#4A382E]">
          SalonHub
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-[#4A382E] hover:text-[#B8955A]">
            Home
          </Link>

          <Link
            href="/services"
            className="text-[#4A382E] hover:text-[#B8955A]"
          >
            Browse Services
          </Link>

          {!isPending && (
            <>
              {!session ? (
                <div className="flex items-center gap-3">
                  <Link href="/sign-in" className="text-[#4A382E]">
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-md bg-[#B8955A] px-5 py-2 text-white hover:bg-[#9E7D48]"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="border-[#B8955A] text-[#4A382E]"
                  >
                    {user?.name || "My Account"} ▼
                  </Button>

                  {dropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg">
                      <p className="px-3 py-2 text-sm text-gray-500">
                        {user?.name}
                      </p>

                      <Link
                        href={dashboardLink}
                        onClick={() => setDropdownOpen(false)}
                        className="block rounded px-3 py-2 text-sm hover:bg-[#F8F1E8]"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

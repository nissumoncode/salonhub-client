"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

import { getMyProfile, type UserProfile } from "@/services/profileApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => {
    let ignore = false;

    if (!session || isPending) return;

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();

        if (!ignore) {
          setProfile(data);
        }
      } catch {
        // Profile loading failed
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [session, isPending]);
  const user = session?.user as
    | {
        name?: string;
        role?: string;
      }
    | undefined;

  const handleLogout = async () => {
    await authClient.signOut();
    //setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/customer";

  return (
    <nav className="border-b border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-foreground">
          SalonHub
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-gold-text">
              Home
            </Link>

            <Link
              href="/services"
              className="text-foreground hover:text-gold-text"
            >
              Browse Services
            </Link>
          </div>

          {!isPending && (
            <>
              {!session ? (
                <div className="flex items-center gap-3">
                  <ThemeToggle />

                  <Link href="/sign-in" className="text-foreground hover:text-gold-text">
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground hover:bg-primary-hover"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    Welcome, {profile?.name || user?.name || "User"}
                  </span>
                  <ThemeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-full p-2 hover:bg-accent"
                        />
                      }
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={profile?.image || ""} />
                        <AvatarFallback>
                          {(profile?.name || user?.name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-64 bg-card p-3"
                    >
                      <div className="space-y-2 px-2 py-2 text-sm">
                        <p className="font-semibold text-foreground">
                          {profile?.name || user?.name}
                        </p>
                        <p className="text-muted-foreground">{profile?.email}</p>
                        <p className="text-muted-foreground">
                          {profile?.phoneNumber || "No phone number"}
                        </p>
                      </div>

                      <div className="my-2 border-t" />

                      <Link
                        href={dashboardLink}
                        className="block rounded px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        Dashboard
                      </Link>

                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-2 text-sm text-destructive hover:bg-destructive/10"
                      >
                        Logout
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

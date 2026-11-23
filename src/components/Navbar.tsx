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
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [profileState, setProfileState] = useState<{
    userId: string;
    profile: UserProfile;
  } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    const userId = session?.user?.id;

    if (isPending || !userId) {
      return () => {
        ignore = true;
      };
    }

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();

        if (!ignore) {
          setProfileState({
            userId,
            profile: data,
          });
        }
      } catch {
        if (!ignore) {
          setProfileState(null);
        }
      }
    };

    void loadProfile();

    return () => {
      ignore = true;
    };
  }, [session, isPending]);

  const userId = session?.user?.id;

  const profile =
    !isPending && userId && profileState?.userId === userId
      ? profileState.profile
      : null;

  const user = session?.user as
    | {
        name?: string;
        role?: string;
      }
    | undefined;

  const displayName = profile?.name || user?.name || "User";

  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/customer";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    await authClient.signOut();
    closeMobileMenu();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="relative z-50 border-b border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0 text-2xl font-bold text-foreground sm:text-3xl"
        >
          SalonHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-gold-text"
          >
            Home
          </Link>

          <Link
            href="/services"
            className="text-foreground transition-colors hover:text-gold-text"
          >
            Browse Services
          </Link>

          {!isPending && (
            <>
              {!session ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/sign-in"
                    className="text-foreground transition-colors hover:text-gold-text"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-md bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary-hover"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="max-w-48 truncate text-sm font-medium text-foreground">
                    Welcome, {displayName}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button
                          type="button"
                          aria-label="Open profile menu"
                          className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-accent"
                        />
                      }
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={profile?.image || ""} />
                        <AvatarFallback>
                          {displayName.charAt(0).toUpperCase()}
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
                          {displayName}
                        </p>
                        <p className="break-all text-muted-foreground">
                          {profile?.email}
                        </p>
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

          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Home
            </Link>

            <Link
              href="/services"
              onClick={closeMobileMenu}
              className="rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Browse Services
            </Link>

            {!isPending && (
              <>
                {!session ? (
                  <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
                    <Link
                      href="/sign-in"
                      onClick={closeMobileMenu}
                      className="rounded-md px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={closeMobileMenu}
                      className="rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="mt-3 border-t border-border pt-4">
                    <div className="mb-3 flex items-center gap-3 px-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.image || ""} />
                        <AvatarFallback>
                          {displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {displayName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {profile?.email || ""}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={dashboardLink}
                      onClick={closeMobileMenu}
                      className="block rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      Dashboard
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="mt-1 w-full justify-start px-4 py-3 text-sm text-destructive hover:bg-destructive/10"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

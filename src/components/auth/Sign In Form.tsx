"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    const { data: session } = await authClient.getSession();
    const role = (session?.user as { role?: string })?.role;
    console.log("Logged in user:", session?.user);

    toast.success("Signed in successfully!");
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push(callbackURL);
    }
  };
  const handleGoogleSignIn = async () => {
    const redirectURL = `${window.location.origin}/auth/callback?callbackURL=${encodeURIComponent(callbackURL)}`;

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectURL,
    });

    if (error) {
      toast.error(error.message || "Google sign in failed.");
    }
  };

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-card shadow-xl md:grid md:grid-cols-2">
      <section className="hidden md:flex flex-col justify-between bg-background p-10">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Salon<span className="text-gold-text">Hub</span>
        </Link>

        <div>
          <div className="relative h-90 overflow-hidden rounded-2xl">
            <Image
              src="/images/salon-1.jpg"
              alt="Salon interior"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <h2 className="mt-8 text-3xl font-bold text-foreground">
            Welcome Back!
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Sign in to manage your appointments and enjoy your salon experience.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 SalonHub. All rights reserved.
        </p>
      </section>

      <section className="flex min-w-0 flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12">
        <div className="mb-5 sm:mb-7">
          <Link
            href="/"
            className="text-2xl font-bold text-foreground md:hidden"
          >
            Salon<span className="text-gold-text">Hub</span>
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-foreground sm:mt-5 sm:text-3xl">Sign In</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg px-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Sign In
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="h-11 w-full rounded-lg border-border text-foreground"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </form>

        <p className="mt-5 text-center text-sm leading-6 text-muted-foreground sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up?callbackURL=${encodeURIComponent(callbackURL)}`}
            className="font-semibold text-gold-text hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignInForm;


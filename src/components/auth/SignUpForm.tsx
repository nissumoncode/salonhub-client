"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Camera,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: profileImage || undefined,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully!");
    router.push(`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`);
  };

  const handleGoogleSignUp = async () => {
    const redirectURL = `${window.location.origin}/auth/callback?callbackURL=${encodeURIComponent(callbackURL)}`;

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectURL,
    });

    if (error) {
      toast.error(error.message || "Google sign up failed.");
    }
  };
  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-card shadow-xl md:grid md:grid-cols-2">
      {/* Branding */}
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
            Beauty begins with you.
          </h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Discover your beauty, book your favorite services, and enjoy a
            relaxing salon experience with SalonHub.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 SalonHub. All rights reserved.
        </p>
      </section>

      {/* Sign Up Form */}
      <section className="flex min-w-0 flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12">
        <div className="mb-5 sm:mb-7">
          <Link
            href="/"
            className="text-2xl font-bold text-foreground md:hidden"
          >
            Salon<span className="text-gold-text">Hub</span>
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-foreground sm:mt-5 sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Join SalonHub and book your perfect salon experience.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-background text-gold-text">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile preview"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <UserRound size={25} />
            )}
          </div>

          <div>
            <label
              htmlFor="profile-photo"
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-gold-text"
            >
              <Camera size={15} />
              Upload Photo
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event.target.files?.[0])}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Optional profile picture
            </p>
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Or Enter Image URL
          </label>

          <Input
            type="url"
            placeholder="https://example.com/profile.jpg"
            value={profileImage.startsWith("data:") ? "" : profileImage}
            onChange={(event) => setProfileImage(event.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Full Name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg pl-10"
              />
            </div>
          </div>

          {/* Email */}
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
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg px-10"
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

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 w-full rounded-lg px-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Create Account
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            className="h-11 w-full rounded-lg border-border text-foreground"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </form>

        <p className="mt-5 text-center text-sm leading-6 text-muted-foreground sm:mt-6">
          Already have an account?{" "}
          <Link
            href={`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`}
            className="font-semibold text-gold-text hover:underline"
          >
            Sign In
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignUpForm;


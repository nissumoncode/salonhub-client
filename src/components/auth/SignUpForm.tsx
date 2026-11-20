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

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl grid md:grid-cols-2">
      {/* Branding */}
      <section className="hidden md:flex flex-col justify-between bg-[#F8F1E8] p-10">
        <Link href="/" className="text-3xl font-bold text-[#4A382E]">
          Salon<span className="text-[#B8955A]">Hub</span>
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

          <h2 className="mt-8 text-3xl font-bold text-[#4A382E]">
            Beauty begins with you.
          </h2>

          <p className="mt-3 leading-7 text-[#6B5B50]">
            Discover your beauty, book your favorite services, and enjoy a
            relaxing salon experience with SalonHub.
          </p>
        </div>

        <p className="text-sm text-[#6B5B50]">
          © 2026 SalonHub. All rights reserved.
        </p>
      </section>

      {/* Sign Up Form */}
      <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
        <div className="mb-7">
          <Link
            href="/"
            className="text-2xl font-bold text-[#4A382E] md:hidden"
          >
            Salon<span className="text-[#B8955A]">Hub</span>
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#4A382E]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#6B5B50]">
            Join SalonHub and book your perfect salon experience.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#F8F1E8] text-[#B8955A]">
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
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#B8955A]"
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
            <p className="mt-1 text-xs text-[#8A7A70]">
              Optional profile picture
            </p>
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 block text-sm font-medium text-[#4A382E]">
            Or Enter Image URL
          </label>

          <Input
            type="url"
            placeholder="https://example.com/profile.jpg"
            value={profileImage.startsWith("data:") ? "" : profileImage}
            onChange={(event) => setProfileImage(event.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A382E]">
              Full Name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A887C]" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg pl-10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A382E]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A887C]" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A382E]">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A887C]" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg px-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A887C]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A382E]">
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A887C]" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 rounded-lg px-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A887C]"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#B8955A] text-white hover:bg-[#9E7D48]"
          >
            Create Account
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border-[#E8D8C3] text-[#4A382E]"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B5B50]">
          Already have an account?{" "}
          <Link
            href={`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`}
            className="font-semibold text-[#B8955A] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignUpForm;

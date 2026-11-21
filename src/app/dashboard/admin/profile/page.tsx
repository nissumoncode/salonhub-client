"use client";
import BackToHome from "@/components/BackToHome";
import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { toast } from "sonner";
import {
  getMyProfile,
  updateMyProfile,
  type UserProfile,
} from "@/services/profileApi";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();

        if (!ignore) {
          setProfile(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load profile information.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  const handleProfileUpdate = async (data: {
    name: string;
    image: string;
    phoneNumber: string;
  }): Promise<void> => {
    setError("");

    try {
      await updateMyProfile(data);

      const updatedProfile = await getMyProfile();
      setProfile(updatedProfile);

      toast.success("Profile updated successfully.");
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      throw error;
    }
  };

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (error && !profile) {
    return <p className="p-6 text-destructive">{error}</p>;
  }

  if (!profile) {
    return <p className="p-6 text-destructive">Profile not found.</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your profile information.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <ProfileInfo profile={profile} onSave={handleProfileUpdate} />
    </div>
  );
}

"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import BackToHome from "@/components/BackToHome";
import {
  getMyProfile,
  updateMyProfile,
  type UserProfile,
} from "@/services/profileApi";

const CustomerProfilePage = () => {
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

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="mt-1 text-sm text-[#8A786B]">
          View and manage your profile information.
        </p>
      </div>

      {loading && (
        <p className="py-6 text-center text-sm text-gray-500">
          Loading profile...
        </p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && profile && (
        <ProfileInfo profile={profile} onSave={handleProfileUpdate} />
      )}
    </div>
  );
};

export default CustomerProfilePage;

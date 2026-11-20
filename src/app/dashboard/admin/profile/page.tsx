"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileForm from "../../components/ProfileForm";
import ChangePassword from "../../components/ChangePassword";
import { getMyProfile, type UserProfile } from "@/services/profileApi";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getMyProfile()
      .then((data) => {
        if (isMounted) {
          setProfile(data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load profile information.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfileUpdated = (updatedProfile: {
    name: string;
    phoneNumber: string;
    image: string;
  }) => {
    setProfile((previousProfile) => {
      if (!previousProfile) return previousProfile;

      return {
        ...previousProfile,
        ...updatedProfile,
      };
    });
  };

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (error || !profile) {
    return <p className="p-6 text-red-600">{error || "Profile not found."}</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A382E]">My Profile</h1>
        <p className="text-sm text-[#6B5B50]">
          Manage your personal information and account settings.
        </p>
      </div>

      <ProfileHeader
        name={profile.name}
        email={profile.email}
        image={profile.image}
      />

      <ProfileForm
        name={profile.name}
        email={profile.email}
        phoneNumber={profile.phoneNumber}
        image={profile.image}
        onProfileUpdated={handleProfileUpdated}
      />

      <ChangePassword />
    </div>
  );
}

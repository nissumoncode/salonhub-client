"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/services/profileApi";
import EditProfile from "./EditProfile";

interface ProfileInfoProps {
  profile: UserProfile;
  onSave: (data: {
    name: string;
    image: string;
    phoneNumber: string;
  }) => Promise<void>;
}

const ProfileInfo = ({ profile, onSave }: ProfileInfoProps) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = async (data: {
    name: string;
    image: string;
    phoneNumber: string;
  }) => {
    await onSave(data);
    setEditOpen(false);
  };

  return (
    <>
      <Card className="border-[#E8DCCB] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">
              Personal Information
            </CardTitle>

            <Badge variant="secondary">{profile.role}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.image || ""} alt={profile.name} />
              <AvatarFallback className="bg-[#F5EFE8] text-2xl text-foreground">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[#8A786B]">Full Name</p>
                <p className="mt-1 font-medium text-foreground">
                  {profile.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#8A786B]">Email Address</p>
                <p className="mt-1 break-all font-medium text-foreground">
                  {profile.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#8A786B]">Phone Number</p>
                <p className="mt-1 font-medium text-foreground">
                  {profile.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-[#F0E7DD] pt-4">
            <Button onClick={() => setEditOpen(true)}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      {editOpen && (
        <EditProfile
          profile={profile}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProfileInfo;

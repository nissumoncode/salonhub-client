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
      <Card className="border-border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-lg text-foreground">
              Personal Information
            </CardTitle>

            <Badge variant="secondary">{profile.role}</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.image || ""} alt={profile.name} />
              <AvatarFallback className="bg-secondary text-2xl text-secondary-foreground">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="mt-1 font-medium text-foreground">
                  {profile.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="mt-1 break-all font-medium text-foreground">
                  {profile.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="mt-1 font-medium text-foreground">
                  {profile.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-border pt-4 sm:mt-6">
            <Button className="w-full sm:w-auto" onClick={() => setEditOpen(true)}>Edit Profile</Button>
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


"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image?: string;
}

const ProfileHeader = ({ name, email, image }: ProfileHeaderProps) => {
  return (
    <Card className="border-[#E8DCCB]">
      <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={image || undefined} alt={name} />
          <AvatarFallback className="bg-[#E8DCCB] text-xl text-[#4A382E]">
            {name?.charAt(0)?.toUpperCase() || "A"}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-[#4A382E]">{name}</h2>

          <p className="text-sm text-[#6B5B50]">{email}</p>

          <Badge className="bg-[#4A382E] text-white hover:bg-[#4A382E]">
            Admin
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

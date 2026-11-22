"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadServiceImage } from "@/services/serviceApi";
import { updateMyProfile } from "@/services/profileApi";

interface ProfileFormProps {
  name: string;
  email: string;
  phoneNumber?: string;
  image?: string;
  onProfileUpdated: (profile: {
    name: string;
    phoneNumber: string;
    image: string;
  }) => void;
}

const ProfileForm = ({
  name,
  email,
  phoneNumber = "",
  image = "",
  onProfileUpdated,
}: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    name,
    phoneNumber,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setSaving(true);

      let imageUrl = image;

      if (selectedImage) {
        imageUrl = await uploadServiceImage(selectedImage);
      }

      const response = await updateMyProfile({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        ...(selectedImage ? { image: imageUrl } : {}),
      });

      const updatedUser = response.user;

      onProfileUpdated({
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber || "",
        image: updatedUser.image || "",
      });

      setMessage("Profile updated successfully.");
      setSelectedImage(null);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (file: File | undefined) => {
    setError("");
    setMessage("");

    if (!file) {
      setSelectedImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size cannot exceed 5 MB.");
      return;
    }

    setSelectedImage(file);
  };

  return (
    <Card className="border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-foreground">Personal Information</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} disabled />
            <p className="text-xs text-muted-foreground">
              Email address cannot be changed.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />
            <p className="text-xs text-muted-foreground">
              Maximum image size: 5 MB.
            </p>
            {selectedImage && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedImage.name}
              </p>
            )}
          </div>

          {message && <p className="text-sm text-green-700 dark:text-green-400">{message}</p>}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-[#4A382E] text-white hover:bg-[#6B5B50] sm:w-auto"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;


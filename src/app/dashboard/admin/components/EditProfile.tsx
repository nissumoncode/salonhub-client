"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserProfile } from "@/services/profileApi";
import { uploadProfileImage } from "@/services/profileApi";

interface EditProfileProps {
  profile: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    name: string;
    image: string;
    phoneNumber: string;
  }) => Promise<void>;
}

const EditProfile = ({
  profile,
  open,
  onOpenChange,
  onSave,
}: EditProfileProps) => {
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(profile.image || "");
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size cannot exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);
    setError("");
    setImageUploaded(false);

    try {
      const imageUrl = await uploadProfileImage(file);
      setImage(imageUrl);
      setImageUploaded(true);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await onSave({ name, image, phoneNumber });
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information below.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-name">Full Name</Label>
            <Input
              id="admin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-image">Profile Image</Label>
            <Input
              id="admin-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading || saving}
            />

            <p className="text-xs text-muted-foreground">
              Maximum image size: 5 MB.
            </p>

            {imageUploaded && (
              <p className="text-xs text-green-700 dark:text-green-400">
                Profile image uploaded successfully.
              </p>
            )}

            {uploading && (
              <p className="text-sm text-muted-foreground">Uploading image...</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-phoneNumber">Phone Number</Label>
            <Input
              id="admin-phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={saving || uploading}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={saving || uploading}>
              {uploading
                ? "Uploading..."
                : saving
                  ? "Saving..."
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;

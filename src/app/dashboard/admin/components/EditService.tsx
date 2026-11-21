"use client";

import { useState } from "react";
import { updateService, uploadServiceImage } from "@/services/serviceApi";
import type { Service } from "@/types/service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditServiceProps {
  service: Service;
  onUpdated: () => void;
}

const EditService = ({ service, onUpdated }: EditServiceProps) => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    serviceName: service.serviceName,
    category: service.category,
    description: service.description,
    price: String(service.price),
    duration: String(service.duration),
    status: service.status,
  });

  const handleUpdate = async () => {
    setError("");

    if (
      !formData.serviceName.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.duration
    ) {
      setError("Please fill in all service fields.");
      return;
    }

    if (Number(formData.price) <= 0 || Number(formData.duration) <= 0) {
      setError("Price and duration must be positive numbers.");
      return;
    }

    try {
      setSaving(true);

      const imageUrl = imageFile
        ? await uploadServiceImage(imageFile)
        : service.image;

      await updateService(service._id, {
        serviceName: formData.serviceName.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        duration: Number(formData.duration),
        image: imageUrl,
        status: formData.status,
      });

      setOpen(false);
      onUpdated();
    } catch {
      setError("Failed to update service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-8 items-center justify-center rounded-md bg-[#4A382E] px-3 text-sm font-medium text-white shadow-sm hover:bg-[#3D2D25]">
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Service</DialogTitle>
          <DialogDescription>Update the service information.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              min="1"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Estimated Duration (minutes)</Label>
            <Input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Service Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => {
                if (value !== null) {
                  setFormData({ ...formData, status: value });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-[#4A382E] text-white hover:bg-[#604838]"
        >
          {saving ? "Updating..." : "Update Service"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;

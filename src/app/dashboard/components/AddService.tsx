"use client";

import { useState } from "react";
import { createService, uploadServiceImage } from "@/services/serviceApi";

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

interface AddServiceProps {
  onAdded: () => void;
}

const AddService = ({ onAdded }: AddServiceProps) => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    status: "active",
  });

  const handleSaveService = async () => {
    setSaveError("");

    if (
      !formData.serviceName.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.duration
    ) {
      setSaveError("Please fill in all service fields.");
      return;
    }

    if (Number(formData.price) <= 0 || Number(formData.duration) <= 0) {
      setSaveError("Price and duration must be positive numbers.");
      return;
    }

    try {
      setSaving(true);

      const imageUrl = imageFile ? await uploadServiceImage(imageFile) : "";

      await createService({
        serviceName: formData.serviceName.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        duration: Number(formData.duration),
        image: imageUrl,
        status: formData.status,
      });

      setFormData({
        serviceName: "",
        category: "",
        description: "",
        price: "",
        duration: "",
        status: "active",
      });

      setImageFile(null);
      setOpen(false);
      onAdded();
    } catch {
      setSaveError("Failed to save service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#4A382E] px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-[#3D2D25]">
        Add New Service
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-[#4A382E]">Add New Service</DialogTitle>
          <DialogDescription>
            Enter the details of your salon service.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceName: e.target.value,
                })
              }
              placeholder="Enter service name"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              placeholder="Enter category"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Enter service description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              min="1"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <Label>Estimated Duration (minutes)</Label>
            <Input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: e.target.value,
                })
              }
              placeholder="Enter duration"
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
                  setFormData({
                    ...formData,
                    status: value,
                  });
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

        {saveError && <p className="text-sm text-red-500">{saveError}</p>}

        <Button
          type="button"
          onClick={handleSaveService}
          disabled={saving}
          className="bg-[#4A382E] hover:bg-[#604838]"
        >
          {saving ? "Saving..." : "Save Service"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;

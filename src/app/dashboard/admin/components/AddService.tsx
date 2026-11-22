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
    durationHours: "",
    durationMinutes: "",
    status: "active",
  });

  const handleSaveService = async () => {
    setSaveError("");

    if (
      !formData.serviceName.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      (!formData.durationHours && !formData.durationMinutes)
    ) {
      setSaveError("Please fill in all service fields.");
      return;
    }

    const hours = Number(formData.durationHours || 0);
    const minutes = Number(formData.durationMinutes || 0);
    const totalDuration = hours * 60 + minutes;

    if (
      Number(formData.price) <= 0 ||
      !Number.isFinite(Number(formData.price)) ||
      !Number.isInteger(hours) ||
      !Number.isInteger(minutes) ||
      hours < 0 ||
      minutes < 0 ||
      minutes > 59 ||
      totalDuration <= 0
    ) {
      setSaveError(
        "Enter a valid price and duration. Minutes must be between 0 and 59.",
      );
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
        duration: totalDuration,
        image: imageUrl,
        status: formData.status,
      });

      setFormData({
        serviceName: "",
        category: "",
        description: "",
        price: "",
        durationHours: "",
        durationMinutes: "",
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
      <DialogTrigger className="w-full rounded-md bg-[#4A382E] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D2D25] sm:w-auto">
        Add New Service
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] overflow-y-auto p-4 sm:w-full sm:max-w-xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Service</DialogTitle>
          <DialogDescription>
            Enter the details of your salon service.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
              placeholder="Enter service name"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Enter category"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Estimated Duration</Label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Hours</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.durationHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationHours: e.target.value,
                    })
                  }
                  placeholder="Hours"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Minutes</Label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  value={formData.durationMinutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationMinutes: e.target.value,
                    })
                  }
                  placeholder="Minutes (0-59)"
                />
              </div>
            </div>
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

        {saveError && <p className="text-sm text-destructive">{saveError}</p>}

        <Button
          type="button"
          onClick={handleSaveService}
          disabled={saving}
          className="bg-[#4A382E] text-white hover:bg-[#604838]"
        >
          {saving ? "Saving..." : "Save Service"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;


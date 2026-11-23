"use client";

import { useState } from "react";
import { deleteService } from "@/services/serviceApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteServiceProps {
  serviceId: string;
  onDeleted: () => void;
}

const DeleteService = ({ serviceId, onDeleted }: DeleteServiceProps) => {
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteService(serviceId);

      toast.success("Service deleted successfully.");
      setOpen(false);
      onDeleted();
    } catch {
      toast.error("Failed to delete service.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className="h-8 w-18 min-w-18 px-3 text-sm"
          />
        }
      >
        Delete
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this service? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Confirm, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteService;

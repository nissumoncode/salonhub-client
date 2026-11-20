"use client";

import { useState } from "react";
import { deleteService } from "@/services/serviceApi";
import { Button } from "@/components/ui/button";

interface DeleteServiceProps {
  serviceId: string;
  onDeleted: () => void;
}

const DeleteService = ({ serviceId, onDeleted }: DeleteServiceProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteService(serviceId);
      onDeleted();
    } catch {
      window.alert("Failed to delete service.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className="h-8 w-18 min-w-18 px-3 text-sm"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteService;

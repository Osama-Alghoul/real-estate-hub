"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/app/services/propertyService";
import { Property } from "@/types/property.type";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/ui/toast";

interface DeletePropertyModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function DeletePropertyModal({
  property,
  open,
  onOpenChange,
  onSuccess,
}: DeletePropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!property) return;
    setLoading(true);
    try {
      await deleteProperty(property.id);
      onOpenChange(false);
      setShowToast(true);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{property?.title}</strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showToast && (
        <SuccessToast
          message="Property deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

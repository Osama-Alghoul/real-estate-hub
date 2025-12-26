"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { deleteProperty } from "@/app/services/propertyService";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";
import { SuccessToast, ErrorToast } from "@/components/ui/Toast";

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
  const [showErrorToast, setShowErrorToast] = useState(false);
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
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
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

      {showErrorToast && (
        <ErrorToast
          message="Failed to delete property"
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </>
  );
}

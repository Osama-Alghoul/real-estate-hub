"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import PropertyForm from "./PropertyForm";
import { updateProperty } from "@/app/services/propertyService";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/ui/Toast";

interface EditPropertyModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditPropertyModal({
  property,
  open,
  onOpenChange,
  onSuccess,
}: EditPropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: Omit<Property, "id">) => {
    if (!property) return;
    setLoading(true);
    try {
      await updateProperty(property.id, data);
      onOpenChange(false);
      setShowToast(true);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to update property:", error);
      alert("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {property && (
            <PropertyForm
              initialData={property}
              onSubmit={handleSubmit}
              isLoading={loading}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {showToast && (
        <SuccessToast
          message="Property updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyForm from "./PropertyForm";
import { createProperty } from "@/app/services/propertyService";
import { createNotification } from "@/app/services/notificationService";
import { Property } from "@/types/property.type";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/ui/toast";

interface AddPropertyModalProps {
  onSuccess?: () => void;
}

export default function AddPropertyModal({ onSuccess }: AddPropertyModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: Omit<Property, "id">) => {
    setLoading(true);
    try {
      await createProperty(data);

      // Notify about new property
      await createNotification({
        userId: "all",
        type: "property",
        title: "New Property Added",
        message: `Property "${data.title}" has been listed`,
        link: "/dashboard/admin/properties",
      });

      setOpen(false);
      setShowToast(true);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create property:", error);
      alert("Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white gap-2">
            <Plus size={16} /> Add Property
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <PropertyForm
            onSubmit={handleSubmit}
            isLoading={loading}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {showToast && (
        <SuccessToast
          message="Property created successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

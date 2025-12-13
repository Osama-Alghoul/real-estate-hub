"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
import { updateUser } from "@/app/services/userService";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/ui/toast";

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditUserModal({
  user,
  open,
  onOpenChange,
  onSuccess,
}: EditUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: Omit<User, "id">) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUser(user.id, data);
      onOpenChange(false);
      setShowToast(true);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {user && (
            <UserForm
              initialData={user}
              onSubmit={handleSubmit}
              isLoading={loading}
              onCancel={() => onOpenChange(false)}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>

      {showToast && (
        <SuccessToast
          message="User updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import UserForm from "./UserForm";
import { createUser } from "@/app/services/userService";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/ui/Toast";

interface AddUserModalProps {
  onSuccess?: () => void;
}

export default function AddUserModal({ onSuccess }: AddUserModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: Omit<User, "id">) => {
    setLoading(true);
    try {
      await createUser(data);
      setOpen(false);
      setShowToast(true);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white gap-2">
            <Plus size={16} /> Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={handleSubmit}
            isLoading={loading}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {showToast && (
        <SuccessToast
          message="User created successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

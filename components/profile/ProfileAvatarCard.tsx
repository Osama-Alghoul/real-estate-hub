"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { uploadImage, deleteImage } from "@/app/services/uploadService";
import { updateUser } from "@/app/services/authService";
import {
  Loader2,
  Camera,
  User as UserIcon,
  ZoomIn,
  ZoomOut,
  Check,
} from "lucide-react";
import { SuccessToast, ErrorToast } from "@/components/ui/Toast";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/app/utils/cropImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/UiSlider";

export default function ProfileAvatarCard() {
  const { user, updateUser: updateAuthUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Cropping State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  if (!user) return null;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setIsCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleUploadCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setUploading(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImageBlob) throw new Error("Failed to crop image");

      const file = new File([croppedImageBlob], "avatar.jpg", {
        type: "image/jpeg",
      });

      // 1. Upload new image
      const newAvatarUrl = await uploadImage(file);

      // 2. Delete old image if it was a custom upload
      if (user.avatar && user.avatar.startsWith("/uploads/")) {
        await deleteImage(user.avatar);
      }

      // 3. Update user profile
      const result = await updateUser(String(user.id), {
        avatar: newAvatarUrl,
      });

      if (result.error) throw new Error(result.error);

      // 4. Update context
      updateAuthUser({ avatar: newAvatarUrl });

      setToast({ type: "success", message: "Avatar updated successfully" });
      setIsCropModalOpen(false);
      setImageSrc(null);
    } catch (error) {
      console.error("Avatar update failed", error);
      setToast({ type: "error", message: "Failed to update avatar" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center transition-all hover:shadow-xl">
      <div className="relative group mb-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-gray-50 flex items-center justify-center relative z-10 ring-4 ring-blue-50">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
          ) : (
            <UserIcon className="w-20 h-20 text-gray-300" />
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 z-20 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-110 group-hover:animate-bounce-subtle"
          title="Change Avatar"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
      <p className="text-gray-500 font-medium mb-6">{user.email}</p>

      <div className="w-full pt-6 border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
          <span className="text-gray-600 font-medium text-sm">
            Account Role
          </span>
          <span className="font-bold capitalize px-3 py-1 rounded-lg bg-white text-blue-600 text-xs shadow-sm border border-blue-100">
            {user.role}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
          <span className="text-gray-600 font-medium text-sm">
            Member Since
          </span>
          <span className="font-bold text-gray-800 text-sm">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* Crop Modal */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden mt-4">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="py-4 flex items-center gap-4">
            <ZoomOut className="w-4 h-4 text-gray-500" />
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4 text-gray-500" />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCropModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadCroppedImage} disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" /> Save Avatar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {toast &&
        (toast.type === "success" ? (
          <SuccessToast
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ) : (
          <ErrorToast message={toast.message} onClose={() => setToast(null)} />
        ))}
    </div>
  );
}

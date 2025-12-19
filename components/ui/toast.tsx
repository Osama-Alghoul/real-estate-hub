"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function SuccessToast({ message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => setIsVisible(true), 10);

    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); 
    }, 5000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-green-100 p-4 pr-12 max-w-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Success!</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorToast({ message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => setIsVisible(true), 10);
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-red-100 p-4 pr-12 max-w-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Error</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

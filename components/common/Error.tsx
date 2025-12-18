import React from "react";

interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex justify-center items-center mt-10">
      <p className="text-red-500 text-lg">{message || "Something went wrong"}</p>
    </div>
  );
}

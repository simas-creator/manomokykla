"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const LoadingSpinner = () => (
  <Loader2 className="h-10 w-10 animate-spin text-primary" />
);

const Fallback = ({ isActive }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isActive]);

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default Fallback;

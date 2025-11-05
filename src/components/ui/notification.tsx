
"use client";

import { useState } from "react";
import { Button } from "./button";
import { X } from "lucide-react";

interface NotificationProps {
  message: string;
  onDismiss: () => void;
}

export function Notification({ message, onDismiss }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  return (
    <div className="relative rounded-lg border bg-background p-4 text-sm text-foreground shadow-lg">
      <p>{message}</p>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

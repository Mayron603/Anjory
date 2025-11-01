"use client";

import React, { useState, useEffect } from 'react';
import { CartProvider } from '@/contexts/cart-context';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <CartProvider>
      {children}
      {isClient && <Toaster />}
    </CartProvider>
  );
}

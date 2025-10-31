"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export function CartButton() {
  const { cartCount } = useCart();

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart" aria-label={`Carrinho com ${cartCount} itens`}>
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
}

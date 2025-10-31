"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} className="h-11 w-11 rounded-r-none">
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="h-11 w-16 text-center rounded-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} className="h-11 w-11 rounded-l-none">
          +
        </Button>
      </div>
      <Button size="lg" className="flex-1 h-11" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Adicionar ao Carrinho
      </Button>
    </div>
  );
}

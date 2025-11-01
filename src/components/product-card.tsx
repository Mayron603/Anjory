"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageById } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const image = getImageById(product.images[0]);

  return (
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-none border-none shadow-none bg-transparent group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <div className="aspect-[4/5] relative">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Sem imagem</span>
              </div>
            )}
          </div>
        </Link>
        <Button 
          aria-label='Adicionar ao carrinho'
          size='sm'
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <CardTitle className="text-lg font-serif tracking-tight mb-1">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
        <p className="font-semibold text-muted-foreground">
          {formatPrice(product.price)}
        </p>
      </CardContent>
    </Card>
  );
}

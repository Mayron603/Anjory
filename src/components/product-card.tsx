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
    <Card className="w-full max-w-sm flex flex-col overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg">
      <CardHeader className="p-0 border-b">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <div className="aspect-square relative">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Sem imagem</span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline tracking-tight mb-1">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
        <p className="font-bold text-primary text-xl">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product, 1)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}

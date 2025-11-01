import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from './add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';
import { ProductImageGallery } from './product-image-gallery';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <ProductImageGallery imageIds={product.images} />
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-4">{formatPrice(product.price)}</p>
          <p className="text-muted-foreground mt-1">em 2x sem juros</p>
          <Separator className="my-6" />
          <p className="text-foreground/80 leading-relaxed">{product.description}</p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

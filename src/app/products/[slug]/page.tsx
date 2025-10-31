import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from './add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const image = getImageById(product.images[0]);

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-primary">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm text-muted-foreground">(34 avaliações)</span>
          </div>
          <p className="text-3xl font-bold text-primary mt-4">{formatPrice(product.price)}</p>
          <p className="text-muted-foreground mt-1">em até 3x sem juros</p>
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

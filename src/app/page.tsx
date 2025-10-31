
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const products = await getProducts();
  const heroImage = getImageById('vela-pote-vidro-1');

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
<section className="relative w-full bg-primary/20 overflow-hidden paint-splatter">
  <div className="absolute top-0 right-0 h-full w-2/3 bg-background/50 rounded-bl-full z-0" />

  <div className="container mx-auto min-h-[80vh] flex items-center justify-center relative z-10 py-16 md:py-0">
    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 w-full">
      
      {/* Image Section */}
      <div className="md:col-span-5 relative flex items-center justify-center h-96">
        {heroImage && (
          <div className="relative w-72 h-80 md:w-[22rem] md:h-[26rem] bg-white p-4 rounded-2xl shadow-2xl transform -rotate-6 transition-transform hover:scale-105 duration-300">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Text Section */}
      <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start relative">
        <p className="font-script text-4xl md:text-5xl text-foreground/60 mb-2">Seja Bem Vindo!</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground/80 leading-tight">
          O toque artesanal
        </h1>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground/80 leading-tight mt-2">
          que seu lar merece
        </h1>
        <Button asChild size="lg" className="mt-8 rounded-md px-10 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="#featured-products">Conheça os produtos</Link>
        </Button>
      </div>

    </div>
  </div>
</section>

    </div>
  );
}

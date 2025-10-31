
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
      <section className="relative w-full bg-primary/20 overflow-hidden">
        <div className="container mx-auto min-h-[70vh] flex items-center justify-center relative z-10 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
            
            {/* Text Section */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <p className="font-script text-4xl md:text-5xl text-foreground/60 mb-2">Seja Bem Vindo!</p>
                <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground/80 leading-tight">
                O toque artesanal
                </h1>
                <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground/80 leading-tight mt-2">
                que seu lar merece
                </h1>
                <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                    Velas aromáticas, papelaria criativa e jogos feitos à mão para trazer mais aconchego e personalidade para o seu espaço.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-md px-10 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/products">Conheça os produtos</Link>
                </Button>
            </div>

            {/* Image Section */}
            <div className="relative flex items-center justify-center h-96">
                <div className="relative w-full h-full max-w-md">
                    {heroImage && (
                        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
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
                    )}
                </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}

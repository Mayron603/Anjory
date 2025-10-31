import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { PlaceHolderImages, getImageById } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const products = await getProducts();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const flowerImage3 = PlaceHolderImages.find(p => p.id === 'flower-3');


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-background">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[70vh] items-center">
            <div className="relative w-full h-64 md:h-full min-h-[40vh] md:min-h-0 rounded-lg overflow-hidden">
                 {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
            </div>
            <div className="text-center md:text-left p-8 md:p-16">
                 <p className="font-serif text-lg md:text-xl mb-2 tracking-wider text-muted-foreground">Seja Bem Vindo</p>
                <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground leading-tight">
                    O toque artesanal que seu lar merece.
                </h1>
                <Button asChild size="lg" className="mt-8 rounded-md px-10">
                  <Link href="#featured-products">Conheça nossos produtos</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 md:py-24 bg-secondary/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Essenciais de Decoração Moderna
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Informações sobre o seu negócio para seus clientes. Esta seção é ótima para SEO! Descreva seus produtos e serviços de forma atraente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12 rounded-none px-10 py-6 text-sm tracking-widest bg-transparent border-foreground/30 hover:bg-foreground/5">
            <Link href="/products">Ver Todos</Link>
          </Button>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 md:py-24 bg-background">
         <div className="container text-center relative">
            <div className="relative z-10">
                <p className="font-script text-4xl text-foreground/80 mb-0">apresentando uma</p>
                <h2 className="text-5xl font-serif font-bold text-foreground tracking-tighter mb-4">OFERTA ESPECIAL</h2>
                <p className="text-muted-foreground mb-8">Assine nossa lista para ser o primeiro a saber sobre novidades, vendas e ofertas especiais!</p>
                <div className="flex max-w-sm mx-auto">
                    <Input type="email" placeholder="Seu e-mail" className="rounded-none border-r-0 h-12 text-base" />
                    <Button variant="outline" size="icon" className="rounded-none h-12 w-12 border-l-0 bg-transparent">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
}

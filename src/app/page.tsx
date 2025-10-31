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
  const heroImage = getImageById('vela-pote-vidro-1');
  const singleDaisy = getImageById('daisy-flower');
  const flowerBouquet = getImageById('flower-bouquet');


  return (
    <div className="flex flex-col">
       {/* Hero Section */}
      <section className="relative w-full bg-primary/20 overflow-hidden paint-splatter">
        <div className="absolute top-0 right-0 h-full w-2/3 bg-background/50 rounded-bl-full z-0" />
        <div className="container mx-auto min-h-[80vh] flex items-center justify-center relative z-10 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 w-full">
            
            {/* Image Section */}
            <div className="md:col-span-5 relative flex items-center justify-center h-full">
                {heroImage && (
                    <div className="relative w-72 h-80 md:w-[22rem] md:h-[26rem] bg-white p-4 shadow-2xl transform -rotate-6 transition-transform hover:scale-105 duration-300">
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            data-ai-hint={heroImage.imageHint}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                         {singleDaisy && (
                            <div className="absolute -bottom-5 -left-5 w-20 h-20 transform -rotate-12">
                                <Image
                                    src={singleDaisy.imageUrl}
                                    alt={singleDaisy.description}
                                    data-ai-hint={singleDaisy.imageHint}
                                    width={80}
                                    height={80}
                                />
                            </div>
                        )}
                    </div>
                )}
               
            </div>
            
            {/* Text Section */}
            <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start relative">
               {flowerBouquet && (
                    <div className="absolute -bottom-32 -right-16 w-80 h-80 md:w-96 md:h-96 opacity-80">
                        <Image
                            src={flowerBouquet.imageUrl}
                            alt={flowerBouquet.description}
                            data-ai-hint={flowerBouquet.imageHint}
                            fill
                            className="object-contain"
                            sizes="30vw"
                        />
                    </div>
                )}
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

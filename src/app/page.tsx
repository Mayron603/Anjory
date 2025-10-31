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
  const heroImage2 = PlaceHolderImages.find(p => p.id === 'flower-5');


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
             <svg viewBox="0 0 1440 895" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M-2.5 528.5C187 638.833 601.7 821.2 971.5 693.5C1341.3 565.8 1442 334 1442 334V-2.5H-2.5V528.5Z" fill="hsl(var(--primary) / 0.2)"/>
                <path d="M1442.5 426C1253 315.667 838.3 133.3 468.5 261C98.7 388.7 -2.5 620.5 -2.5 620.5V895.5H1442.5V426Z" fill="hsl(var(--primary) / 0.2)"/>
             </svg>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center gap-12 relative z-10">
            <div className="text-left md:text-left pt-12 md:pt-0">
                 <p className="font-serif text-lg md:text-xl mb-4 tracking-wider text-muted-foreground">Seja Bem Vindo à Anjory</p>
                <div className="relative">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-accent leading-tight relative z-10" style={{color: 'hsl(var(--accent))'}}>
                       O toque artesanal 
                    </h1>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight absolute top-0 left-0 z-0 opacity-50" style={{ WebkitTextStroke: '1px hsl(var(--accent))', color: 'transparent', transform: 'translate(4px, 4px)'}}>
                        O toque artesanal 
                    </h2>
                </div>
                 <div className="relative mt-2">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-accent leading-tight relative z-10" style={{color: 'hsl(var(--accent))'}}>
                       que seu lar merece.
                    </h1>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight absolute top-0 left-0 z-0 opacity-50" style={{ WebkitTextStroke: '1px hsl(var(--accent))', color: 'transparent', transform: 'translate(4px, 4px)'}}>
                       que seu lar merece.
                    </h2>
                </div>
                <p className="max-w-md mt-8 text-base text-muted-foreground">
                    Descubra nossas coleções de velas, papelaria e jogos feitos à mão. Cada peça é criada com amor e carinho para trazer mais aconchego e beleza para sua vida.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-md px-10 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#featured-products">Conheça nossos produtos</Link>
                </Button>
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
                 {heroImage && (
                    <div className="relative w-64 h-80 md:w-72 md:h-96 bg-white p-3 shadow-2xl transform -rotate-6 transition-transform hover:scale-105 duration-300">
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
                {heroImage2 && (
                    <div className="absolute w-48 h-64 md:w-56 md:h-72 bg-white p-3 shadow-xl transform rotate-3 -bottom-8 -right-4 md:right-0 transition-transform hover:scale-105 duration-300">
                        <Image
                            src={heroImage2.imageUrl}
                            alt={heroImage2.description}
                            data-ai-hint={heroImage2.imageHint}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                )}
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

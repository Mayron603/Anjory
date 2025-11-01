
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { ArrowRight, Instagram } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { InstagramCarousel } from '@/components/instagram-carousel';


export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const heroImage = getImageById('vela-pote-vidro-1');

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
       <section className="relative w-full bg-secondary/30 overflow-hidden paint-splatter">
         <div className="container mx-auto min-h-[70vh] flex items-center justify-center relative z-10 py-16 md:py-0">
           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
              {/* Image Section */}
              <div className="relative flex items-center justify-center h-96 md:h-auto">
                  <div className="relative w-full h-full max-w-sm">
                      {/* Main Polaroid */}
                      {heroImage && (
                          <div className="relative w-[300px] h-[350px] md:w-[320px] md:h-[370px] bg-white p-4 shadow-xl transform -rotate-6">
                              <div className="relative w-full h-full">
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
              </div>
            
           {/* Text Section */}
           <div className="text-center md:text-left flex flex-col items-center md:items-start relative z-20">
             <h1 className="text-7xl md:text-8xl font-script text-foreground leading-tight">Seja bem-vindo! </h1>
             <p className="mt-4 text-lg text-muted-foreground">O toque artesanal que seu lar merece.</p>
             <Button asChild size="lg" className="mt-8 rounded-sm px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-body tracking-widest">
               <Link href="/products">VER PRODUTOS</Link>
             </Button>
           </div>
         </div>
         {/* Decorative Background Elements */}
         <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Large Circle */}
            <div className="absolute -right-1/4 -bottom-1/3 w-2/3 h-2/3 bg-white/30 rounded-full opacity-50 z-0"></div>

            {/* Panda Drawing in Corner */}
            <div className="absolute bottom-0 right-0 z-10 w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-80">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="hsl(var(--foreground))" d="M49.9,-27.1C60.3,-5.4,61.5,19.9,50.7,39.3C39.9,58.7,16.2,72.2,-6.4,73.1C-29,73.9,-50.6,62.1,-63.1,43.2C-75.7,24.3,-79.3,-1.7,-70.7,-25.1C-62.1,-48.5,-41.3,-69.3,-19.7,-74.2C1.9,-79,23,-68,36.5,-52.8C49.9,-37.6,56.6,-18.2,49.9,-27.1Z" transform="translate(110 110) scale(1.2)" opacity="0.1" />
                <defs>
                  <filter id="pencil-texture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" result="turbulence" />
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <g transform="translate(40 40)" style={{ filter: 'url(#pencil-texture)' }}>
                  <path d="M 80,100 C 50,130 20,110 20,80 C 20,50 40,20 80,20 C 120,20 140,50 140,80 C 140,110 110,130 80,100 Z" fill="white" stroke="hsl(var(--foreground))" strokeWidth="2.5" />
                  <ellipse cx="55" cy="65" rx="12" ry="18" fill="hsl(var(--foreground))" transform="rotate(-15, 55, 65)" />
                  <ellipse cx="105" cy="65" rx="12" ry="18" fill="hsl(var(--foreground))" transform="rotate(15, 105, 65)" />
                  <circle cx="55" cy="62" r="4" fill="white" />
                  <circle cx="105" cy="62" r="4" fill="white" />
                  <path d="M 70,85 C 75,95 85,95 90,85" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="80" cy="78" r="4" fill="hsl(var(--foreground))" />
                  <path d="M 40,40 Q 20,20 40,10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 120,40 Q 140,20 120,10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
         </div>
       </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Nossos Queridinhos</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Uma seleção dos produtos mais amados pelos nossos clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">
                Ver todos os produtos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Fique por Dentro</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Assine nossa newsletter e seja o primeiro a saber sobre lançamentos, promoções exclusivas e novidades do nosso ateliê.
          </p>
          <form className="mt-8 flex w-full max-w-md mx-auto items-center space-x-2">
            <Input type="email" placeholder="Seu melhor e-mail" className="flex-1" />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Inscrever</Button>
          </form>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Nos encontre no Instagram</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Acompanhe nosso dia a dia e inspire-se com nossas criações.
            </p>
          </div>
          <InstagramCarousel />
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" /> Siga @anjory
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

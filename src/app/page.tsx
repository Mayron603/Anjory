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
              <h1 className="text-7xl md:text-8xl font-script text-foreground leading-tight">
                Seja bem-vindo!
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                O toque artesanal que seu lar merece.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-sm px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-body tracking-widest"
              >
                <Link href="/products">VER PRODUTOS</Link>
              </Button>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -right-1/4 -bottom-1/3 w-2/3 h-2/3 bg-white/30 rounded-full opacity-50 z-0"></div>
            <div className="absolute bottom-0 right-0 z-10 w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-80">
              <Image src="/panda-hero.png" alt="Panda desenhado" width={400} height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Nossos Queridinhos
            </h2>
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Fique por Dentro
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Assine nossa newsletter e seja o primeiro a saber sobre lançamentos,
            promoções exclusivas e novidades do nosso ateliê.
          </p>
          <form className="mt-8 flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Inscrever
            </Button>
          </form>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Nos encontre no Instagram
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Acompanhe nosso dia a dia e inspire-se com nossas criações.
            </p>
          </div>

          <InstagramCarousel />

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" /> Siga @anjory
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

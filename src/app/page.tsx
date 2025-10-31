
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const heroImage = getImageById('vela-pote-vidro-1');

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
      <section className="relative w-full bg-primary/20 overflow-hidden">
        <div className="container mx-auto min-h-[70vh] flex items-center justify-center relative z-10 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
            
            {/* Text Section */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start relative">
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
                <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10">
                   <Image
                        src="/flor.png"
                        alt="Aquarela de flor"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Image Section */}
            <div className="relative flex items-center justify-center h-96">
                <div className="relative w-full h-full max-w-md">
                    {heroImage && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[350px] bg-white p-4 shadow-lg transform -rotate-6">
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
                                <div className="absolute -bottom-4 -left-4 w-24 h-24">
                                     <Image
                                        src="/flor2.png"
                                        alt="Aquarela de flor"
                                        width={96}
                                        height={96}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Nossos Queridinhos</h2>
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
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Fique por Dentro</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Assine nossa newsletter e seja o primeiro a saber sobre lançamentos, promoções exclusivas e novidades do nosso ateliê.
          </p>
          <form className="mt-8 flex w-full max-w-md mx-auto items-center space-x-2">
            <Input type="email" placeholder="Seu melhor e-mail" className="flex-1" />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Inscrever</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

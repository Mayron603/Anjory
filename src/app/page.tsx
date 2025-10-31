import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { PlaceHolderImages, getImageById } from '@/lib/placeholder-images';

export default async function HomePage() {
  const products = await getProducts();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[400px] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
            Feito à Mão, com Amor
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
            Descubra nossas velas artesanais e itens personalizados que trazem aconchego e estilo para o seu lar.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#featured-products">Conheça os Produtos</Link>
          </Button>
        </div>
      </section>

      <section id="featured-products" className="py-12 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

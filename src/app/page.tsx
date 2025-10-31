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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-[#EAE3E3] py-16 md:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="relative z-10 text-center md:text-left">
            <p className="font-script text-4xl md:text-5xl text-foreground/80 mb-2">She's a</p>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground tracking-tighter">
              WILD ONE
            </h1>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-10 py-6 text-sm tracking-widest">
              <Link href="#featured-products">SHOP NOW</Link>
            </Button>
          </div>

          {/* Image Content */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/50 rounded-full" />
            <div className="absolute top-10 right-10 w-16 h-16 bg-white/30 rounded-full" />

            {heroImage && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[360px] md:w-[350px] md:h-[420px] bg-white p-4 shadow-xl rotate-[-5deg]">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
             <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-70">
                <Image src="https://images.unsplash.com/photo-1518895318357-96e7392b9b77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" layout="fill" objectFit="contain" />
            </div>
            <div className="absolute -bottom-12 -left-4 w-24 h-24 opacity-80 transform rotate-[-20deg]">
                <Image src="https://images.unsplash.com/photo-1518895318357-96e7392b9b77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 md:py-24 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Modern Home Decor Essentials
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Share information about your business with your customers. This section is great for SEO! Cotton candy sesame snaps candy sweet roll halvah cotton candy chupa chups pastry candy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12 rounded-none px-10 py-6 text-sm tracking-widest bg-transparent border-foreground/30 hover:bg-foreground/5">
            <Link href="/products">View all</Link>
          </Button>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 md:py-24 bg-[#EAE3E3]">
         <div className="container text-center relative">
            <div className="absolute -top-16 right-10 w-48 h-48 opacity-70">
                <Image src="https://images.unsplash.com/photo-1562690868-603772b7b85d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" layout="fill" objectFit="contain" />
            </div>
             <div className="absolute -bottom-16 left-10 w-24 h-24 opacity-80 transform rotate-[-20deg]">
                <Image src="https://images.unsplash.com/photo-1518895318357-96e7392b9b77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" layout="fill" objectFit="contain" />
            </div>

            <div className="relative z-10">
                <p className="font-script text-4xl text-foreground/80 mb-0">showcase a</p>
                <h2 className="text-5xl font-serif font-bold text-foreground tracking-tighter mb-4">SPECIAL OFFER</h2>
                <p className="text-muted-foreground mb-8">Join the list to be the first to hear about new arrivals, sales and special offers!</p>
                <div className="flex max-w-sm mx-auto">
                    <Input type="email" placeholder="Email" className="rounded-none border-r-0 h-12 text-base" />
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

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const instagramPosts = [
  { id: 1, imageHint: 'woman coffee', imageUrl: 'https://picsum.photos/seed/insta1/400/400' },
  { id: 2, imageHint: 'open book', imageUrl: 'https://picsum.photos/seed/insta2/400/400' },
  { id: 3, imageHint: 'woman skincare', imageUrl: 'https://picsum.photos/seed/insta3/400/400' },
  { id: 4, imageHint: 'polaroid camera', imageUrl: 'https://picsum.photos/seed/insta4/400/400' },
  { id: 5, imageHint: 'woman white sweater', imageUrl: 'https://picsum.photos/seed/insta5/400/400' },
  { id: 6, imageHint: 'laptop', imageUrl: 'https://picsum.photos/seed/insta6/400/400' },
  { id: 7, imageHint: 'woman hands', imageUrl: 'https://picsum.photos/seed/insta7/400/400' },
  { id: 8, imageHint: 'coffee cup', imageUrl: 'https://picsum.photos/seed/insta8/400/400' },
  { id: 9, imageHint: 'woman looking away', imageUrl: 'https://picsum.photos/seed/insta9/400/400' },
];


export default function NosEncontrePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Nosso Cantinho no Instagram</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Acompanhe nosso dia a dia, novidades, bastidores e muito mais. Adoramos compartilhar nosso amor por velas e decoração com você!
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2 h-5 w-5" />
            Siga @anjory
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
        {instagramPosts.map((post) => (
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={post.id} className="relative aspect-square group overflow-hidden">
                <Image
                src={post.imageUrl}
                alt={`Post do Instagram ${post.id}`}
                data-ai-hint={post.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Instagram className="h-8 w-8 text-white" />
                </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

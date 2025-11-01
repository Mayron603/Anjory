import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import { getImageById } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export const instagramPostsConfig = [
  { id: 'candle-light-1', className: 'md:col-span-1 md:row-span-2' },
  { id: 'stationery-flatlay-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'writing-journal-1', className: 'md:col-span-2 md:row-span-2' },
  { id: 'candle-making-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'notebook-pen-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'scented-candle-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'planner-stickers-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'cozy-candle-1', className: 'md:col-span-2 md:row-span-1' },
  { id: 'handmade-candle-1', className: 'md:col-span-1 md:row-span-2' },
  { id: 'journaling-supplies-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'vela-bulbos-mini-1', className: 'md:col-span-1 md:row-span-1' },
  { id: 'caderno-personalizado-1', className: 'md:col-span-1 md:row-span-1' },
];


export default function NosEncontrePage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-16">
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

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
        {instagramPostsConfig.map((postConfig) => {
          const image = getImageById(postConfig.id);
          if (!image) return null;
          return (
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={image.id} className={cn("group relative overflow-hidden rounded-md", postConfig.className)}>
              <Image
                src={image.imageUrl}
                alt={`Post do Instagram: ${image.description}`}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

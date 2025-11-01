
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getProducts } from '@/lib/products';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { getImageById } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setAllProducts(products);
    }
    fetchProducts();
  }, []);

  const filteredProducts = query.length > 1
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Pesquisar">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Pesquisar Produtos</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <Input
              placeholder="O que você procura?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10"
            />
            <Button type="submit" size="icon" aria-label="Pesquisar">
              <Search className="h-5 w-5" />
            </Button>
          </form>
          {query.length > 1 && (
            <div className="mt-4 max-h-[400px] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <ul className="space-y-4">
                  {filteredProducts.slice(0, 5).map(product => {
                    const image = getImageById(product.images[0]);
                    return (
                      <li key={product.id}>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="flex items-center gap-4 p-2 rounded-md hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            {image && <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-8">Nenhum resultado encontrado.</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

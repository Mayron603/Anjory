"use client";

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

export function ProductFilters({ categories, minPrice, maxPrice }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('categories')?.split(',') || []);
  const [price, setPrice] = useState<number>(searchParams.get('price') ? parseInt(searchParams.get('price'), 10) : maxPrice);
  const [sortOption, setSortOption] = useState<string>(searchParams.get('sort') || 'relevance');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }
    
    if (price < maxPrice) {
      params.set('price', String(price));
    } else {
        params.delete('price');
    }

    if (sortOption !== 'relevance') {
      params.set('sort', sortOption);
    } else {
      params.delete('sort');
    }
    params.delete('page'); // Reset to first page on filter change

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [selectedCategories, price, sortOption, pathname, router, maxPrice]);

  const handleCategoryChange = (category: string) => {
    const lowerCaseCategory = category.toLowerCase();
    setSelectedCategories(prev =>
      prev.includes(lowerCaseCategory)
        ? prev.filter(c => c !== lowerCaseCategory)
        : [...prev, lowerCaseCategory]
    );
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPrice(maxPrice);
    setSortOption('relevance');
    router.replace(pathname);
  };

  return (
    <div className="sticky top-24 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevância</SelectItem>
            <SelectItem value="price-asc">Preço: Menor para o Maior</SelectItem>
            <SelectItem value="price-desc">Preço: Maior para o Menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categorias</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category.toLowerCase()}
                checked={selectedCategories.includes(category.toLowerCase())}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category.toLowerCase()} className="capitalize cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Preço</h3>
        <Slider
          value={[price]}
          onValueChange={(value) => setPrice(value[0])}
          min={minPrice}
          max={maxPrice}
          step={1}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>{formatPrice(minPrice)}</span>
          <span>Até {formatPrice(price)}</span>
        </div>
      </div>
      
      <Button variant="ghost" onClick={handleClearFilters} className="w-full">
        Limpar Filtros
      </Button>
    </div>
  );
}

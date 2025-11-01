import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { ProductFilters } from './product-filters';
import type { Product } from '@/lib/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: { 
    categories?: string;
    price?: string;
    sort?: string;
    page?: string;
    q?: string;
  }
}) {
  const allProducts = await getProducts();
  const allCategories = [...new Set(allProducts.map(p => p.category))];
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  const minPrice = Math.min(...allProducts.map(p => p.price));

  // Filtering logic
  let filteredProducts: Product[] = allProducts;

  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  const selectedCategories = searchParams.categories?.split(',') || [];
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category.toLowerCase()));
  }

  const priceRange = searchParams.price ? parseInt(searchParams.price, 10) : maxPrice;
  if (priceRange) {
    filteredProducts = filteredProducts.filter(p => p.price <= priceRange);
  }

  // Sorting logic
  const sortOption = searchParams.sort || 'relevance';
  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  // Pagination logic
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const title = searchParams.q 
    ? `Resultados para "${searchParams.q}"`
    : "Todos os Produtos";

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          {title}
        </h1>
        {!searchParams.q && (
          <p className="mt-2 text-muted-foreground">Explore nossa coleção de produtos artesanais.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
           <ProductFilters 
            categories={allCategories} 
            minPrice={minPrice}
            maxPrice={maxPrice} 
           />
        </aside>
        
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {paginatedProducts.length === 0 && (
              <p className="text-center col-span-full text-muted-foreground py-12">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            )}
          </div>
          
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href={`/products?${new URLSearchParams({...searchParams, page: String(Math.max(1, currentPage - 1))})}`}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {/* You can add page numbers here if you want */}
                <PaginationItem>
                  <PaginationNext 
                    href={`/products?${new URLSearchParams({...searchParams, page: String(Math.min(totalPages, currentPage + 1))})}`}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}

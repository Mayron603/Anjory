import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import type { Product } from '@/lib/types';

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string }}) {
  const allProducts = await getProducts();

  const filteredProducts = searchParams.category 
    ? allProducts.filter(p => p.category.toLowerCase() === searchParams.category?.toLowerCase())
    : allProducts;
  
  const title = searchParams.category ? `Produtos de ${searchParams.category}` : "Todos os Produtos";

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

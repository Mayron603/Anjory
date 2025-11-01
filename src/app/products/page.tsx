import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string }}) {
  const allProducts = await getProducts();
  
  const categories = [...new Set(allProducts.map(p => p.category))];

  const filteredProducts = searchParams.category 
    ? allProducts.filter(p => p.category.toLowerCase() === searchParams.category?.toLowerCase())
    : allProducts;
  
  const currentCategory = searchParams.category;
  const title = currentCategory ? `${currentCategory}` : "Todos os Produtos";

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground">Explore nossa coleção de produtos artesanais.</p>
      </div>

      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        <Button asChild variant={!currentCategory ? 'default' : 'outline'}>
          <Link href="/products">Todos</Link>
        </Button>
        {categories.map(category => (
          <Button 
            asChild 
            key={category}
            variant={currentCategory?.toLowerCase() === category.toLowerCase() ? 'default' : 'outline'}
          >
            <Link href={`/products?category=${category}`}>{category}</Link>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center col-span-full text-muted-foreground">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>
    </div>
  );
}

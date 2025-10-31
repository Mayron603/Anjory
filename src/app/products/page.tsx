import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Todos os Produtos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

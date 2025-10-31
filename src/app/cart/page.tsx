"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { getImageById } from '@/lib/placeholder-images';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Seu carrinho está vazio</h2>
          <p className="mt-2 text-muted-foreground">Adicione produtos para vê-los aqui.</p>
          <Button asChild className="mt-6">
            <Link href="/">Continuar Comprando</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map(item => {
                    const image = getImageById(item.product.images[0]);
                    return (
                      <li key={item.product.id} className="flex items-center gap-4 p-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          {image && <Image src={image.imageUrl} alt={item.product.name} fill className="object-cover" />}
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                            className="h-9 w-16 text-center"
                          />
                        </div>
                        <p className="w-24 text-right font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} {cartCount > 1 ? 'itens' : 'item'})</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-primary font-semibold">Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

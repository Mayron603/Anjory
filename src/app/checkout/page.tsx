"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  if (cartItems.length === 0) {
    // In a real app, you might want a more sophisticated check,
    // but for now, this prevents empty checkouts.
    if (typeof window !== 'undefined') {
        router.push('/cart');
    }
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Pedido Recebido!',
      description: 'Obrigado pela sua compra. Enviamos um email de confirmação.',
    });
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Finalizar Compra</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, Número, Bairro" required />
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Sua cidade" required />
              </div>
              <div>
                <Label htmlFor="zip">CEP</Label>
                <Input id="zip" placeholder="00000-000" required />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Informações de Pagamento</CardTitle>
              <CardDescription>Todos os pagamentos são seguros e criptografados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="**** **** **** ****" required />
                </div>
                <div>
                    <Label htmlFor="card-name">Nome no Cartão</Label>
                    <Input id="card-name" placeholder="Nome como no cartão" required />
                </div>
                <div>
                    <Label htmlFor="expiry-date">Validade</Label>
                    <Input id="expiry-date" placeholder="MM/AA" required />
                </div>
                <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                </div>
               </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Seu Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                {cartItems.map(item => (
                  <li key={item.product.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-muted-foreground">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" size="lg" className="w-full">
                Finalizar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}

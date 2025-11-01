
"use client";

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { placeOrder } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/hooks/use-session';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { session, isLoading } = useSession();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    if (!isLoading && session) {
        setName(session.name || '');
        setPhone(session.phone || '');
        setZip(session.zip || '');
        setStreet(session.street || '');
        setNumber(session.number || '');
        setNeighborhood(session.neighborhood || '');
        setCity(session.city || '');
        setState(session.state || '');
    }
  }, [session, isLoading]);


  useEffect(() => {
    if (cartItems.length === 0 && !isPending) {
      router.push('/cart');
    }
  }, [cartItems, router, isPending]);
  
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setZip(cep);

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setStreet(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
        } else {
            toast({
                variant: 'destructive',
                title: 'CEP não encontrado',
                description: 'Verifique o CEP e tente novamente.',
            })
        }
      } catch (error) {
        console.error("Failed to fetch CEP", error);
        toast({
            variant: 'destructive',
            title: 'Erro ao buscar CEP',
            description: 'Não foi possível consultar o CEP. Tente novamente.',
        })
      }
    }
  };


  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto max-w-6xl py-8 md:py-12 text-center">
            <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mt-2">Você será redirecionado para o seu carrinho.</p>
        </div>
    );
  }

  const handlePlaceOrder = () => {
    startTransition(async () => {
      try {
        const result = await placeOrder({
          cartItems,
          cartTotal,
          customer: {
            name,
            phone,
            zip,
            street,
            number,
            neighborhood,
            city,
            state,
          },
        });

        if (result.whatsappUrl) {
          clearCart();
          window.open(result.whatsappUrl, '_blank');
          router.push('/order-confirmation');
        } else if (result.error) {
           toast({
            variant: "destructive",
            title: "Erro ao finalizar pedido",
            description: result.error,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erro desconhecido",
            description: "Não foi possível gerar la URL do WhatsApp.",
          });
        }
      } catch (error) {
        console.error("Falha ao processar o pedido:", error);
         toast({
            variant: "destructive",
            title: "Erro Inesperado",
            description: "Ocorreu uma falha ao processar o pedido. Tente novamente.",
          });
      }
    });
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
              <CardDescription>Preencha seus dados para agilizar o atendimento no WhatsApp.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-6">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
               <div className="md:col-span-6">
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input id="phone" placeholder="(00) 90000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="zip">CEP</Label>
                <Input id="zip" placeholder="00000-000" value={zip} onChange={handleCepChange} required maxLength={9}/>
              </div>
              <div className="md:col-span-4">
                <Label htmlFor="street">Rua</Label>
                <Input id="street" placeholder="Sua rua" value={street} onChange={(e) => setStreet(e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="123" value={number} onChange={(e) => setNumber(e.target.value)} required />
              </div>
              <div className="md:col-span-4">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Seu bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required />
              </div>
               <div className="md:col-span-4">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Sua cidade" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" placeholder="UF" value={state} onChange={(e) => setState(e.target.value)} required />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
              <CardDescription>O pagamento será combinado diretamente pelo WhatsApp.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Aceitamos Pix e transferência bancária.</p>
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
                  <span>A combinar</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePlaceOrder} size="lg" className="w-full" disabled={isPending || !name || !phone || !zip || !street || !number || !neighborhood || !city || !state}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Finalizar no WhatsApp'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

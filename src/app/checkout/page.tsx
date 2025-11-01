
"use client";

import { useState, useEffect } from 'react';
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

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    // This effect now runs only on the client after the component mounts.
    // It will redirect to cart if it's empty.
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);


  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto max-w-6xl py-8 md:py-12 text-center">
            <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mt-2">Você será redirecionado para o seu carrinho.</p>
        </div>
    );
  }

  const handlePlaceOrder = async () => {
    // 1. Format message for WhatsApp
    const phoneNumber = "558184019864";
    let whatsappMessage = `Olá! 👋 Gostaria de finalizar minha compra com os seguintes itens: 🛍️\n\n`;
    cartItems.forEach(item => {
        whatsappMessage += `🛒 *${item.product.name}* (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}\n`;
    });
    whatsappMessage += `\n*Total do Pedido: ${formatPrice(cartTotal)}* 💰\n\n`;
    whatsappMessage += `*Meus Dados para Entrega:* 🚚\n`;
    whatsappMessage += `Nome: ${name}\n`;
    whatsappMessage += `Telefone: ${phone} 📱\n`;
    whatsappMessage += `Endereço: ${address}, ${city}, ${zip}\n`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 2. Format message for Discord Webhook
    const webhookUrl = "https://discord.com/api/webhooks/1434225043923013916/Y07sjzhIBWBioQWfsvkCS2vH_67orSQhQfkYwEfC2vCNFg5wzduWSGkYOlkT_oVwwMCN";
    const discordPayload = {
      content: "🎉 Novo Pedido Recebido!",
      embeds: [
        {
          title: "Detalhes do Pedido",
          color: 3447003, // Blue color
          fields: [
            { name: "Cliente", value: name, inline: true },
            { name: "Telefone", value: phone, inline: true },
            { name: "Endereço", value: `${address}, ${city} - CEP: ${zip}` },
            { 
              name: "Produtos", 
              value: cartItems.map(item => `${item.product.name} (x${item.quantity})`).join('\n') 
            },
            { name: "Valor Total", value: `**${formatPrice(cartTotal)}**`, inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Anjory Store"
          }
        }
      ]
    };

    try {
        // Send to Discord
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordPayload),
        });

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Clear cart and redirect
        clearCart();
        router.push('/order-confirmation');

    } catch (error) {
        console.error("Failed to send Discord notification:", error);
        // Still try to open WhatsApp even if Discord fails
         window.open(whatsappUrl, '_blank');
         clearCart();
         router.push('/order-confirmation');
    }
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
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input id="phone" placeholder="(00) 90000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, Número, Bairro" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Sua cidade" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="zip">CEP</Label>
                <Input id="zip" placeholder="00000-000" value={zip} onChange={(e) => setZip(e.target.value)} />
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
              <Button onClick={handlePlaceOrder} size="lg" className="w-full">
                Finalizar no WhatsApp
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

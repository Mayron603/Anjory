"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    // Generate order details on the client side to avoid hydration mismatch
    setOrderId(`ANJ-${Math.floor(Math.random() * 100000)}`);
    setOrderDate(new Date().toLocaleDateString('pt-BR'));
  }, []);

  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 flex justify-center items-center">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl mt-4">Obrigado pela sua compra!</CardTitle>
          <CardDescription>
            Seu pedido foi recebido e está sendo processado. Você receberá uma confirmação por e-mail em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            {orderId && <p>Número do Pedido: <span className="font-medium text-foreground">{orderId}</span></p>}
            {orderDate && <p>Data do Pedido: <span className="font-medium text-foreground">{orderDate}</span></p>}
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">Continuar Comprando</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

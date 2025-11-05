
"use client";

import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { getOrders, getSession, dismissProfileCompletionNotification } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from '@/app/actions';
import { UserDetailsForm } from './user-details-form';
import { SettingsForm } from './settings-form';
import { Separator } from '@/components/ui/separator';
import { getImageById } from '@/lib/placeholder-images';
import { Notification } from '@/components/ui/notification';
import { use, useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchSessionAndOrders = async () => {
      const session = await getSession();
      if (!session) {
        redirect('/login');
      }
      setUser(session);
      const userOrders = await getOrders();
      setOrders(userOrders);

      if (session && !session.profileCompletionNotificationSeen) {
        setShowNotification(true);
      }
    };

    fetchSessionAndOrders();
  }, []);

  if (!user) {
    return null; // Or a loading spinner
  }
  
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'entregue':
        case 'delivered':
            return 'success';
        case 'pending':
            return 'secondary';
        default:
            return 'default';
    }
  }
  
  const handleDismissNotification = async () => {
    await dismissProfileCompletionNotification();
    setShowNotification(false);
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
         {showNotification && (
            <div className="mb-8">
                <Notification
                message="Bem-vindo! Para uma melhor experiência, por favor, preencha seus dados de perfil na aba 'Meus Dados'."
                onDismiss={handleDismissNotification}
                />
            </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <Avatar className="h-24 w-24">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
             <form action={signOut} className="mt-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                </Button>
            </form>
        </div>
      </div>
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="details">Meus Dados</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pedidos</CardTitle>
              <CardDescription>
                Veja o histórico de todos os seus pedidos realizados na Anjory.
              </CardDescription>
            </CardHeader>
            <CardContent>
               {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order: any) => {
                        const orderDate = new Date(order.createdAt).toLocaleDateString('pt-BR');
                        return (
                            <Card key={order.orderId}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">Pedido <span className="text-primary">#{order.orderId}</span></h3>
                                        <p className="text-sm text-muted-foreground">Realizado em {orderDate}</p>
                                    </div>
                                    <Badge variant={getStatusVariant(order.status) as any} className="capitalize">
                                        {order.status}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {order.items.map((item: any) => {
                                            const image = getImageById(item.image);
                                            return (
                                                <li key={item.productId} className="flex items-center gap-4">
                                                     <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                                      {image ? (
                                                        <Image
                                                          src={image.imageUrl}
                                                          alt={item.name}
                                                          fill
                                                          className="object-cover"
                                                        />
                                                      ) : (
                                                        <div className="w-full h-full bg-muted" />
                                                      )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link href={`/products/${item.slug}`} className="font-semibold hover:underline">
                                                            {item.name}
                                                        </Link>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.quantity} x {formatPrice(item.price)}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        {formatPrice(item.quantity * item.price)}
                                                    </p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </CardContent>
                                <Separator />
                                <CardFooter className="flex justify-end pt-4 font-semibold">
                                    <div className="flex gap-4">
                                        <span>Total</span>
                                        <span>{formatPrice(order.total)}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
               ) : (
                <div className="text-center py-16 border border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">Nenhum pedido encontrado</h3>
                    <p className="mt-2 text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                    <Button asChild className="mt-6">
                        <Link href="/products">Começar a comprar</Link>
                    </Button>
                </div>
               )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
              <CardHeader>
                <CardTitle>Meus Dados</CardTitle>
                <CardDescription>Gerencie suas informações pessoais e endereços para agilizar futuras compras.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserDetailsForm user={user} />
              </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Gerencie suas credenciais de acesso e foto de perfil.</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

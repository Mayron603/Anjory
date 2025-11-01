
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { getOrders, getSession } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { signOut } from '@/app/actions';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const user = session;
  const orders = await getOrders();

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

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="details">Meus Dados</TabsTrigger>
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
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Pedido</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {orders.map((order: any) => (
                        <TableRow key={order.orderId}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(order.status) as any} className="capitalize">
                            {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
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
                <CardDescription>Gerencie suas informações pessoais e endereços.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>Funcionalidade em desenvolvimento.</p>
              </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

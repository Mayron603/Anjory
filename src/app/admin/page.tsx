
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
} from "@/components/ui/table"
import { getSession, getAllOrdersForAdmin, getUsersCountForAdmin, getAllUsersForAdmin } from '@/app/actions';
import { formatPrice } from '@/lib/utils';
import { DollarSign, Package, CreditCard, Users } from 'lucide-react';
import { OrderStatusSelector } from './order-status-selector';
import type { Order } from '@/lib/types';
import { OrderDetailsDialog } from './order-details-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersTable } from './users-table';


export default async function AdminDashboardPage() {
  const session = await getSession();
  if (session?.role !== 'admin') {
    redirect('/login');
  }

  const [orders, usersCount, users] = await Promise.all([
    getAllOrdersForAdmin(),
    getUsersCountForAdmin(),
    getAllUsersForAdmin(),
  ]);
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalSales = orders.length;
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Soma de todas as vendas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                Total de pedidos realizados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(avgOrderValue)}</div>
              <p className="text-xs text-muted-foreground">
                Valor médio por pedido
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clientes Cadastrados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{usersCount}</div>
              <p className="text-xs text-muted-foreground">
                Total de usuários na plataforma
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="users">Clientes</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>
                  Uma lista de todos os pedidos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead className='hidden sm:table-cell'>Status</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order: Order) => (
                      <TableRow key={order.orderId}>
                        <TableCell>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground hidden md:inline">
                            {order.customer.email}
                          </div>
                        </TableCell>
                        <TableCell className='hidden sm:table-cell'>
                          <OrderStatusSelector orderId={order._id} currentStatus={order.status} />
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                        <TableCell className="text-right hidden sm:table-cell">
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <OrderDetailsDialog order={order} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Clientes</CardTitle>
                <CardDescription>
                  Visualize, pesquise e edite os dados dos seus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersTable users={users} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

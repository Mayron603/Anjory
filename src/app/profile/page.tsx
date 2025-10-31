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
import type { Order } from '@/lib/types';

// Mock data for order history
const mockOrders: Order[] = [
  {
    id: 'ANJ-84372',
    date: '2024-05-20',
    status: 'Delivered',
    total: 139.70,
    items: [],
    shippingAddress: { name: '', address: '', city: '', zip: '', country: ''}
  },
  {
    id: 'ANJ-81934',
    date: '2024-05-12',
    status: 'Delivered',
    total: 65.00,
    items: [],
    shippingAddress: { name: '', address: '', city: '', zip: '', country: ''}
  },
  {
    id: 'ANJ-78129',
    date: '2024-04-28',
    status: 'Delivered',
    total: 79.90,
    items: [],
    shippingAddress: { name: '', address: '', city: '', zip: '', country: ''}
  },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Minha Conta</h1>
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="details" disabled>Meus Dados</TabsTrigger>
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
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                          Entregue
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          {/* Profile details form would go here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

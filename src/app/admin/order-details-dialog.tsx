
"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { getImageById } from '@/lib/placeholder-images';
import { deleteOrder } from '@/app/actions';
import type { Order } from '@/lib/types';
import { Eye, Trash2, Loader2, Mail, Phone, Home } from 'lucide-react';

interface OrderDetailsDialogProps {
  order: Order;
}

export function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fullAddress = `${order.customer.street}, ${order.customer.number} - ${order.customer.neighborhood}, ${order.customer.city}/${order.customer.state} - CEP: ${order.customer.zip}`;

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteOrder(order._id);
      if (result.success) {
        toast({
          title: "Pedido Excluído",
          description: result.success,
        });
        setIsDeleteDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao Excluir",
          description: result.error,
        });
      }
    });
  };
  
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'entregue': return 'success';
      case 'enviado': return 'default';
      case 'pendente': return 'secondary';
      case 'cancelado': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido <span className="font-mono text-primary">#{order.orderId}</span></DialogTitle>
          <DialogDescription>
            Realizado em {new Date(order.createdAt).toLocaleString('pt-BR')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Itens do Pedido</h4>
            <ul className="space-y-4">
              {order.items.map((item) => {
                const image = getImageById(item.image);
                return (
                  <li key={item.productId} className="flex items-start gap-4 text-sm">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                      {image ? (
                        <Image src={image.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.quantity * item.price)}</p>
                  </li>
                );
              })}
            </ul>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
            </div>
          </div>
          <div className="space-y-4 rounded-md bg-muted/50 p-4 border">
            <h4 className="font-semibold">Informações do Cliente</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <p className="font-medium flex-1">{order.customer.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{order.customer.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-4 w-4 text-muted-foreground mt-1" />
                <p className="text-muted-foreground">{fullAddress}</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 justify-between w-full">
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Pedido
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o pedido do banco de dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirmar Exclusão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

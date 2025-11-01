
"use client";

import { useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Loader2 } from "lucide-react";
import { updateOrderStatus } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Order } from '@/lib/types';

interface OrderStatusSelectorProps {
  orderId: string;
  currentStatus: Order['status'];
}

export function OrderStatusSelector({ orderId, currentStatus }: OrderStatusSelectorProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'entregue': return 'success';
      case 'enviado': return 'default';
      case 'pendente': return 'secondary';
      case 'cancelado': return 'destructive';
      default: return 'outline';
    }
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        toast({
          title: "Status Atualizado!",
          description: result.success,
        });
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar status",
          description: result.error,
        });
      }
    });
  };
  
  const statuses: Order['status'][] = ['Pendente', 'Enviado', 'Entregue', 'Cancelado'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Badge variant={getStatusVariant(currentStatus) as any} className="capitalize">
              {currentStatus}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={status === currentStatus}
            className={cn(
                "capitalize",
                status === currentStatus && "bg-accent"
            )}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

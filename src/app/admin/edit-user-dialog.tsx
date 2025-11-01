
"use client";

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import { updateUserByAdmin } from '@/app/actions';
import type { User } from '@/lib/types';
import { Loader2, Pencil } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Salvar Alterações
    </Button>
  );
}

export function EditUserDialog({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const [state, formAction] = useActionState(updateUserByAdmin.bind(null, user._id), undefined);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Sucesso!",
        description: state.success,
      });
      setIsOpen(false);
    }
  }, [state, toast]);
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere os dados do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" defaultValue={user.phone ?? ''} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select name="role" defaultValue={user.role}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="customer">Cliente</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter className="md:col-span-2 mt-4">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancelar</Button>
                </DialogClose>
                <SubmitButton />
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

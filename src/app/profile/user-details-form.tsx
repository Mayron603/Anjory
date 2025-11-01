
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserDetailsFormProps {
  user: {
    userId: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    zip?: string | null;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Salvando...
        </>
      ) : (
        "Salvar Alterações"
      )}
    </Button>
  );
}

export function UserDetailsForm({ user }: UserDetailsFormProps) {
  const [state, formAction] = useActionState(updateUser, undefined);
  const { toast } = useToast();

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
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" name="name" defaultValue={user.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={user.email} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input id="phone" name="phone" defaultValue={user.phone || ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Endereço (Rua, Número, Bairro)</Label>
        <Input id="address" name="address" defaultValue={user.address || ""} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" name="city" defaultValue={user.city || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">CEP</Label>
          <Input id="zip" name="zip" defaultValue={user.zip || ""} />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

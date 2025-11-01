
"use client";

import { useActionState, useEffect, useState } from "react";
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
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
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

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [zip, setZip] = useState(user.zip || "");
  const [street, setStreet] = useState(user.street || "");
  const [number, setNumber] = useState(user.number || "");
  const [neighborhood, setNeighborhood] = useState(user.neighborhood || "");
  const [city, setCity] = useState(user.city || "");
  const [stateUf, setStateUf] = useState(user.state || "");

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

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setZip(cep);

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setStreet(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setStateUf(data.uf);
        } else {
            toast({
                variant: 'destructive',
                title: 'CEP não encontrado',
                description: 'Verifique o CEP e tente novamente.',
            })
        }
      } catch (error) {
        console.error("Failed to fetch CEP", error);
        toast({
            variant: 'destructive',
            title: 'Erro ao buscar CEP',
            description: 'Não foi possível consultar o CEP. Tente novamente.',
        })
      }
    }
  };


  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input id="phone" name="phone" value={phone ?? ''} onChange={(e) => setPhone(e.target.value)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="space-y-2 md:col-span-2">
            <Label htmlFor="zip">CEP</Label>
            <Input id="zip" name="zip" value={zip ?? ''} onChange={handleCepChange} maxLength={9}/>
        </div>
        <div className="space-y-2 md:col-span-4">
            <Label htmlFor="street">Rua</Label>
            <Input id="street" name="street" value={street ?? ''} onChange={(e) => setStreet(e.target.value)} />
        </div>
         <div className="space-y-2 md:col-span-2">
            <Label htmlFor="number">Número</Label>
            <Input id="number" name="number" value={number ?? ''} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-4">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input id="neighborhood" name="neighborhood" value={neighborhood ?? ''} onChange={(e) => setNeighborhood(e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-4">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" name="city" value={city ?? ''} onChange={(e) => setCity(e.target.value)} />
        </div>
         <div className="space-y-2 md:col-span-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" name="state" value={stateUf ?? ''} onChange={(e) => setStateUf(e.target.value)} />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}


"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons/logo';
import { signUp } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/use-session';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
       {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Criar Conta
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(signUp, undefined);
  const { toast } = useToast();
  const router = useRouter();
  const { mutate } = useSession();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado em breve.",
      });
      // Mutate the session to get the new user data
      // and then redirect to the home page.
      mutate().then(() => {
        router.push('/');
      });
    }
  }, [state, toast, router, mutate]);


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription>É rápido e fácil. Comece a comprar agora mesmo!</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Seu nome completo" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton />
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link href="/login" className="underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

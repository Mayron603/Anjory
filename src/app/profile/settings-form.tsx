
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserCredentials, updateUserProfilePicture } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsFormProps {
  user: {
    userId: string;
    name: string;
    email: string;
    picture?: string | null;
  };
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Salvando...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [credentialsState, credentialsAction] = useActionState(updateUserCredentials, undefined);
  const [profilePictureState, profilePictureAction] = useActionState(updateUserProfilePicture, undefined);
  const { toast } = useToast();

  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  useEffect(() => {
    const currentState = credentialsState || profilePictureState;
    if (currentState?.error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: currentState.error,
      });
    }
    if (currentState?.success) {
      toast({
        title: "Sucesso!",
        description: currentState.success,
      });

      // Dispatch event to update session-dependent components like the user nav
      window.dispatchEvent(new Event('session-update'));

      if (credentialsState?.success) {
        setPassword("");
        setNewPassword("");
      }
      if (profilePictureState?.success) {
        // Reset file input by clearing the form's state
        setPicture(null);
        // Additionally, you might want to reset the input field itself
        const fileInput = document.getElementById('picture') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    }
  }, [credentialsState, profilePictureState, toast]);

  return (
    <div className="space-y-8">
      <form action={profilePictureAction} className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">Foto de Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Atualize sua foto de perfil.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
          <AvatarImage src={user.picture ?? undefined} alt={user.name} />
            <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Input id="picture" name="picture" type="file" onChange={(e) => setPicture(e.target.files?.[0] ?? null)} />
        </div>
        <SubmitButton>Salvar Foto</SubmitButton>
      </form>

      <form action={credentialsAction} className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">Credenciais de Acesso</h3>
          <p className="text-sm text-muted-foreground">
            Altere seu e-mail e senha. Para alterar a senha, você precisa fornecer a senha atual.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Senha Atual</Label>
            <Input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input id="newPassword" name="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
        </div>
        <SubmitButton>Atualizar Credenciais</SubmitButton>
      </form>
    </div>
  );
}

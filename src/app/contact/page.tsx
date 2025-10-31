
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Entre em Contato</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tem alguma dúvida ou sugestão? Adoraríamos ouvir você. Preencha o formulário abaixo ou nos contate através de nossos canais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
            <CardDescription>Responderemos o mais breve possível.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Sobre o que você gostaria de falar?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Escreva sua mensagem aqui..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Enviar Mensagem</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
            <h3 className="text-2xl font-headline font-semibold">Nossas Informações</h3>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">contato@anjory.com</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">Telefone</h4>
                    <p className="text-muted-foreground">(11) 98765-4321</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">Endereço</h4>
                    <p className="text-muted-foreground">Rua das Velas, 123, São Paulo, SP</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

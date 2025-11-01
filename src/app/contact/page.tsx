
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";

const faqs = [
  {
    question: "Como faço para comprar?",
    answer: "É muito simples! Navegue pelo nosso site, escolha os produtos que mais gosta e adicione-os ao carrinho. Ao clicar em 'Finalizar Compra', você será redirecionado para o nosso WhatsApp para concluir o pedido diretamente conosco. É rápido, seguro e personalizado!"
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "No momento, aceitamos pagamentos via Pix e transferência bancária. Os detalhes para o pagamento serão fornecidos durante a conversa no WhatsApp ao finalizar seu pedido."
  },
  {
    question: "Como funciona o envio?",
    answer: "Após a confirmação do pagamento, seu pedido é preparado com muito carinho e enviado em até 3 dias úteis. O código de rastreio será enviado para você assim que o pacote for postado. Utilizamos os Correios para a maioria das entregas."
  },
  {
    question: "Posso devolver um produto?",
    answer: "Como nossos produtos são artesanais e o processo de compra é finalizado com atendimento pessoal via WhatsApp, não trabalhamos com devoluções. No entanto, se o seu produto chegar com algum defeito de fabricação, entre em contato conosco imediatamente pelo WhatsApp com fotos do item que faremos o possível para resolver."
  },
  {
    question: "As velas são seguras?",
    answer: "Sim! Nossas velas são feitas com cera de coco 100% vegetal e pavio de algodão, que proporcionam uma queima limpa e segura. Recomendamos sempre seguir as instruções de uso que acompanham o produto, como não deixar a vela acesa sem supervisão e aparar o pavio antes de cada uso."
  },
  {
    question: "Posso personalizar um pedido?",
    answer: "Adoramos criar produtos únicos! Se você tem uma ideia para um caderno, vela ou qualquer outro item, entre em contato conosco pelo WhatsApp. Vamos conversar sobre as possibilidades e criar algo especial para você."
  }
]

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

      <Separator className="my-16" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Perguntas Frequentes (FAQ)</h2>
            <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre nossos produtos e processos.
            </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {faq.answer}
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}

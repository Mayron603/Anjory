
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Perguntas Frequentes (FAQ)</h1>
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
  )
}

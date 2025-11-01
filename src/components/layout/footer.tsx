import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram } from 'lucide-react';
import { TikTok } from '../icons/tiktok';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Sua loja de decoração e itens para casa com um toque de elegância e modernidade.
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Instagram className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><TikTok className="h-5 w-5" /></Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Loja</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="text-muted-foreground hover:text-foreground">Novidades</Link></li>
            <li><Link href="/products?category=Velas" className="text-muted-foreground hover:text-foreground">Velas</Link></li>
            <li><Link href="/products?category=Papelaria" className="text-muted-foreground hover:text-foreground">Papelaria</Link></li>
            <li><Link href="/products?category=Jogos" className="text-muted-foreground hover:text-foreground">Jogos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Atendimento</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
            <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
          </ul>
        </div>

        <div>
           <h3 className="font-semibold mb-4">Newsletter</h3>
           <p className="text-sm text-muted-foreground mb-2">Assine para receber novidades e ofertas especiais!</p>
           <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Seu e-mail" />
              <Button type="submit">Inscrever</Button>
            </div>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Anjory. Todos os direitos reservados.</p>
            <p>Feito com ♥ por Mayron <Link href="https://firebase.google.com/studio" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-foreground">Firebase Studio</Link></p>
        </div>
      </div>
    </footer>
  );
}

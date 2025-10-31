import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Anjory. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-foreground">Sobre Nós</Link>
          <Link href="/contact" className="hover:text-foreground">Contato</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}

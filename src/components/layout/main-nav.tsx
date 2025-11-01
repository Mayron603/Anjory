import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const navClass = cn(
    'flex items-center gap-6 text-sm font-body tracking-wider',
    isMobile && 'flex-col items-start gap-4',
    !isMobile && 'h-14'
  );

  const linkClass = cn(
    'font-medium text-muted-foreground transition-colors hover:text-foreground uppercase',
    isMobile && 'text-lg'
  );

  return (
    <nav className={navClass}>
      <Link href="/" className={linkClass}>
        Início
      </Link>
      <Link href="/products" className={linkClass}>
        Novidades
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(linkClass, "flex items-center gap-1 outline-none")}>
          Atendimento <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
           <DropdownMenuItem asChild>
            <Link href="/faq">FAQ</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
       <Link href="/blog" className={linkClass}>
        Blog
      </Link>
      <Link href="/contact" className={linkClass}>
        Contato
      </Link>
    </nav>
  );
}

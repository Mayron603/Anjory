import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const navClass = cn(
    'flex items-center gap-6 text-sm',
    isMobile && 'flex-col items-start gap-4'
  );

  const linkClass = cn(
    'font-medium text-muted-foreground transition-colors hover:text-foreground',
    isMobile && 'text-lg'
  );

  return (
    <nav className={navClass}>
      <Link href="/" className={linkClass}>
        Home
      </Link>
      <Link href="/products" className={linkClass}>
        Produtos
      </Link>
    </nav>
  );
}

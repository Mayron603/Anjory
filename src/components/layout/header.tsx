import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { MainNav } from '@/components/layout/main-nav';
import { UserNav } from '@/components/layout/user-nav';
import { CartButton } from '@/components/layout/cart-button';
import { Menu, Search, Instagram, Facebook } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full bg-secondary text-secondary-foreground text-center py-2 text-xs font-medium tracking-wider">
        Feito à mão com amor
      </div>
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
        </div>
        
        <div className="hidden md:flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon"><Facebook className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Instagram className="h-4 w-4" /></Button>
          <CartButton />
          <UserNav />
        </div>

        <div className="flex md:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center mb-6">
                <Logo />
              </Link>
              <div className="flex flex-col space-y-3">
                <MainNav isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
       <div className="hidden md:flex justify-center border-t">
          <MainNav />
        </div>
    </header>
  );
}

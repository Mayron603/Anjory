
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { MainNav } from '@/components/layout/main-nav';
import { UserNav } from '@/components/layout/user-nav';
import { CartButton } from '@/components/layout/cart-button';
import { Menu, Instagram, Truck, CreditCard, Ticket, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { TikTok } from '../icons/tiktok';
import { SearchBar } from './search-bar';

const announcementMessages = [
  { icon: Truck, text: 'Enviamos para todo o Brasil' },
  { icon: CreditCard, text: 'Aceitamos todos os tipos de cartões' },
  { icon: Ticket, text: 'Cupom de 10% na primeira compra: ANJORY10' },
  { icon: Share2, text: 'NOS SIGA NAS REDES SOCIAIS' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full bg-secondary text-secondary-foreground py-2 text-xs font-medium tracking-wider overflow-hidden">
        <div className="flex animate-marquee-infinite">
          {Array(2)
            .fill(announcementMessages)
            .flat()
            .map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mx-6 flex-shrink-0">
                <item.icon className="h-4 w-4" />
                <span>{item.text}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="flex-1 flex items-center justify-start">
          <div className="hidden md:flex items-center">
             <SearchBar />
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
                 <div className="mt-6">
                    <SearchBar />
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
        </div>
        
        <div className="flex-1 hidden md:flex items-center justify-end space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="https://www.instagram.com/anjory.loja/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <TikTok className="h-5 w-5" />
            </Link>
          </Button>
          <CartButton />
          <UserNav />
        </div>
        
         <div className="flex-1 flex justify-end md:hidden">
          <CartButton />
        </div>


      </div>
       <div className="hidden md:flex justify-center border-t">
          <MainNav />
        </div>
    </header>
  );
}

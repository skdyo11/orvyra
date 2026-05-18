'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Users, BookOpen, MessageSquare } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Feed', icon: Users },
    { href: '/vault', label: 'Vault', icon: BookOpen },
    { href: '/messages', label: 'Bridge', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">O</span>
          </div>
          <span className="text-lg font-bold tracking-tighter uppercase">Orvyra</span>
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-colors ${
                pathname === link.href ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <link.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
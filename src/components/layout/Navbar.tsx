'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, MessageSquare, UserCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Initial theme setup
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const links = [
    { href: '/messages', label: 'Bridge', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-lg font-bold tracking-[0.3em] uppercase">Orvyra</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform" />
            )}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

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
          
          <Link 
            href="/profile"
            className={`flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-colors ${
              pathname === '/profile' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <UserCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, MessageSquare, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const userProfile = useStore((state) => state.userProfile);

  // Hide the bar entirely if not logged in (including guest mode)
  if (!userProfile) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border h-20 flex items-center justify-around px-6">
      <Link 
        href="/profiles" 
        className={`flex flex-col items-center gap-1 transition-colors ${
          pathname === '/profiles' ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-tighter">Community</span>
      </Link>
      
      <Link 
        href="/vault" 
        className="flex flex-col items-center relative -top-6"
      >
        <div className="w-14 h-14 bg-accent text-white flex items-center justify-center rounded-2xl shadow-lg shadow-accent/40 ring-4 ring-background">
          <Zap className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-tighter mt-2 text-accent">Learn</span>
      </Link>

      <Link 
        href="/messages" 
        className={`flex flex-col items-center gap-1 transition-colors ${
          pathname === '/messages' ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-tighter">Chats</span>
      </Link>
    </div>
  );
}

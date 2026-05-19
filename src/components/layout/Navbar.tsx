'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, MessageSquare, Users, Settings, User } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const userProfile = useStore((state) => state.userProfile);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
        {/* Left: ORVYRA Brand */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl font-black tracking-[0.4em] uppercase text-foreground">Orvyra</span>
          </Link>
        </div>

        {/* Center: Learn (Anchor) and Navigation */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <Link 
            href="/profiles"
            className={`text-[10px] uppercase font-black tracking-widest transition-colors ${
              pathname === '/profiles' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Profiles</span>
            </span>
          </Link>

          <Link href="/vault">
            <Button className="bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.3em] text-[10px] h-10 px-8 rounded-lg shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
              Learn
            </Button>
          </Link>

          <Link 
            href="/messages"
            className={`text-[10px] uppercase font-black tracking-widest transition-colors ${
              pathname === '/messages' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Chats</span>
            </span>
          </Link>
        </div>

        {/* Right: Profile/Settings Slide-out */}
        <div className="flex items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group">
                <span className="hidden sm:inline">Settings</span>
                <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r border-border w-80 p-0">
              <div className="p-8 border-b border-border bg-muted/5">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl font-black tracking-tighter uppercase">Account</SheetTitle>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Manage your profile & vibe</p>
                </SheetHeader>
              </div>
              
              <div className="p-8 space-y-10">
                {userProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 glass rounded-2xl border-border">
                      <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-tight">{userProfile.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Active Member</div>
                      </div>
                    </div>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg border-border hover:border-accent">
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 border border-dashed border-border rounded-2xl text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4">You haven't joined the network yet</p>
                      <Link href="/#intake">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg">
                          Join Orvyra
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-6 pt-6 border-t border-border">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">System</h3>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full p-4 glass rounded-xl border-border hover:border-accent transition-all group"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-accent group-hover:rotate-45 transition-transform" />
                    ) : (
                      <Moon className="w-4 h-4 text-accent group-hover:-rotate-12 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, MessageSquare, Users, Settings, User, Menu, Chrome, LogOut } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const userProfile = useStore((state) => state.userProfile);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const { toast } = useToast();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !userProfile) {
        // If logged in via Firebase but no profile in store, create a basic one
        setUserProfile({
          name: user.displayName || 'Member',
          role: 'visionary',
          tagline: 'Aspiring Founder',
          experienceSummary: 'Member of the Orvyra network.',
          skills: [],
          seekingCoFounder: false,
          seekingMentorship: false,
          ideaValidation: false,
          linkedInProfileUrl: ''
        } as any);
      }
    });
    return () => unsubscribe();
  }, [userProfile, setUserProfile]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Welcome back", description: "You are now logged in." });
    } catch (error) {
      toast({ variant: "destructive", title: "Login failed", description: "Could not connect to Google." });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast({ title: "Logged out", description: "See you soon!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to logout properly." });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <span className="text-lg md:text-xl font-black tracking-[0.4em] uppercase text-foreground">Orvyra</span>
          </Link>
        </div>

        <div className="flex justify-center">
          {userProfile && (
            <Link href="/vault" className="hidden md:block">
              <Button className="bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.3em] text-[10px] h-10 px-8 rounded-lg shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                Learn
              </Button>
            </Link>
          )}
        </div>

        <div className="flex justify-end items-center gap-4 sm:gap-8">
          {userProfile && (
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/profiles"
                className={`text-[10px] uppercase font-black tracking-widest transition-colors ${
                  pathname === '/profiles' ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Profiles</span>
                </span>
              </Link>

              <Link 
                href="/messages"
                className={`text-[10px] uppercase font-black tracking-widest transition-colors ${
                  pathname === '/messages' ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chats</span>
                </span>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 p-2 text-muted-foreground hover:text-accent transition-colors group">
                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                <span className="hidden md:inline text-[10px] uppercase font-black tracking-[0.2em]">Settings</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-border w-80 p-0">
               <div className="p-8 border-b border-border bg-card/20">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl font-black tracking-tighter uppercase">Account</SheetTitle>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Manage your profile</p>
                </SheetHeader>
              </div>
              
              <div className="p-8 space-y-10">
                {userProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 glass border-border">
                      <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-bold uppercase tracking-tight truncate">{userProfile.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Active Member</div>
                      </div>
                    </div>
                    <Link href="/profile" className="block w-full">
                      <Button variant="outline" className="w-full justify-start text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg border-border hover:border-accent">
                        View Full Profile
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleLogout}
                      variant="ghost" 
                      className="w-full justify-start text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg text-destructive hover:bg-destructive/5"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 border border-dashed border-border rounded-2xl text-center space-y-4">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Member Portal</p>
                      
                      <Button 
                        onClick={handleGoogleLogin}
                        className="w-full bg-accent hover:bg-accent/90 text-white text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                      >
                        <Chrome className="w-4 h-4" />
                        Login with Google
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                        <div className="relative flex justify-center text-[8px] uppercase font-black tracking-widest"><span className="bg-background px-2 text-muted-foreground">OR</span></div>
                      </div>

                      <Link href="/#intake" className="block">
                        <Button variant="outline" className="w-full text-[10px] uppercase font-bold tracking-widest h-11 rounded-lg border-border hover:border-accent">
                          Apply to Join
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-6 pt-6 border-t border-border">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">System</h3>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full p-4 glass border-border hover:border-accent transition-all group"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest">
                      Theme
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

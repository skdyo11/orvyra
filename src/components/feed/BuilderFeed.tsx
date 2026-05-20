
'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, ExternalLink, Filter, Search, X, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type StartupRole } from '@/ai/schemas';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

type FilterType = 'all' | StartupRole | 'seeking-cofounder';

export function BuilderFeed() {
  const firestore = useFirestore();
  const userProfile = useStore((state) => state.userProfile);
  const sendMessage = useStore((state) => state.sendMessage);
  const { toast } = useToast();
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const buildersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'profiles'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: builders, loading } = useCollection(buildersQuery);

  const filteredBuilders = (builders || []).filter(b => {
    // Hide private profiles
    if (b.isPrivate) return false;

    const matchesRole = activeFilter === 'all' 
      ? true 
      : activeFilter === 'seeking-cofounder' 
        ? b.seekingCoFounder 
        : b.role === activeFilter;

    const matchesSearch = searchQuery === '' 
      ? true 
      : b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.skills && b.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesRole && matchesSearch;
  });

  const handleConnect = (builder: any) => {
    if (!userProfile) {
      toast({ variant: "destructive", title: "Hold on!", description: "Join the network first to send messages." });
      return;
    }
    
    sendMessage({
      from: userProfile.name,
      to: builder.name,
      content: `Hey, I'm ${userProfile.name}. I'm building ${userProfile.tagline} and wanted to connect!`
    });
    
    toast({ title: "Message sent!", description: `We've started a chat with ${builder.name}.` });
  };

  const getRoleColor = (role: StartupRole) => {
    switch (role) {
      case 'tech-founder': return 'bg-accent/10 text-accent border-accent/20';
      case 'sales-founder': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'investor': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'visionary': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'advisor': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20">
      <div className="flex flex-col gap-8 mb-12 border-b border-border pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Network Filters</h2>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="SEARCH BY NAME, ROLE OR SKILL..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-[10px] uppercase font-black tracking-widest border-border bg-card/40 focus:bg-card transition-colors rounded-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(['all', 'seeking-cofounder', 'tech-founder', 'sales-founder', 'investor', 'visionary', 'advisor'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[9px] uppercase font-black tracking-widest px-4 py-2 border rounded-lg transition-all duration-200 ${
                activeFilter === f 
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' 
                  : 'bg-card border-border text-muted-foreground hover:border-accent hover:text-accent'
              }`}
            >
              {f === 'seeking-cofounder' ? 'Seeking Co-founder' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Loading Network...</p>
          </div>
        )}
        {!loading && filteredBuilders.map((builder, i) => (
          <div key={i} className="glass p-8 group transition-all duration-300 hover:border-accent/40 hover:translate-y-[-2px] rounded-2xl relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>

            <div className="flex flex-col sm:flex-row justify-between gap-6 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Link 
                    href={`/profiles/${getSlug(builder.name)}`}
                    className="group/name flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover/name:bg-accent group-hover/name:border-accent transition-colors">
                      <User className="w-4 h-4 text-accent group-hover/name:text-white" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tighter text-foreground group-hover/name:text-accent transition-colors">
                      {builder.name}
                    </h3>
                  </Link>
                  <Badge className={`${getRoleColor(builder.role as StartupRole)} rounded-md text-[9px] uppercase font-black tracking-widest px-2 py-0.5 border`}>
                    {builder.role?.replace('-', ' ')}
                  </Badge>
                  {builder.seekingCoFounder && (
                    <Badge variant="outline" className="border-accent text-accent rounded-md text-[9px] uppercase font-black tracking-widest px-2 py-0.5">
                      Co-founder Needed
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-base text-foreground/90 font-bold leading-tight uppercase tracking-tight">
                    {builder.tagline}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono leading-relaxed max-w-2xl">
                    {builder.experienceSummary}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {builder.skills && builder.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="text-[9px] px-2 py-1 border border-border bg-muted/20 text-muted-foreground uppercase tracking-widest font-bold rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 shrink-0">
                <Button 
                  onClick={() => handleConnect(builder)}
                  className="bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest text-[10px] gap-2 px-6 h-11 rounded-xl transition-all shadow-lg shadow-accent/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </Button>
                <Link href={`/profiles/${getSlug(builder.name)}`}>
                  <Button variant="outline" size="icon" className="h-11 w-11 border-border hover:border-accent rounded-xl group/link">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-accent" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {!loading && filteredBuilders.length === 0 && (
          <div className="py-24 text-center glass border-dashed rounded-2xl flex flex-col items-center gap-4">
            <Filter className="w-8 h-8 text-muted-foreground/30" />
            <div className="space-y-1">
              <p className="text-xs uppercase font-black tracking-[0.2em] text-muted-foreground">No matches found</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">Try adjusting your filters or search query.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-4 text-[9px] uppercase font-black tracking-widest h-9 rounded-lg"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

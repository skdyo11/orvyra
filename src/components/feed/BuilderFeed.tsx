'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, ExternalLink, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BuilderFeed() {
  const builders = useStore((state) => state.builders);
  const userProfile = useStore((state) => state.userProfile);
  const sendMessage = useStore((state) => state.sendMessage);
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'co-founder' | 'mentorship' | 'validation'>('all');

  const filteredBuilders = builders.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'co-founder') return b.seekingCoFounder;
    if (filter === 'mentorship') return b.seekingMentorship;
    if (filter === 'validation') return b.ideaValidation;
    return true;
  });

  const handleConnect = (builder: any) => {
    if (!userProfile) {
      toast({ variant: "destructive", title: "Access denied.", description: "Initialize your profile via Lightning Intake first." });
      return;
    }
    
    sendMessage({
      from: userProfile.name,
      to: builder.name,
      content: `Bridge request: ${userProfile.name} is building ${userProfile.tagline}. Let's discuss collaboration.`
    });
    
    toast({ title: "Bridge established.", description: `Connection thread initiated with ${builder.name}.` });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-border pb-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Builder Directory</h2>
        
        <div className="flex flex-wrap gap-2">
          {(['all', 'co-founder', 'mentorship', 'validation'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] uppercase tracking-tighter px-2 py-1 border transition-colors ${
                filter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-px bg-border">
        {filteredBuilders.map((builder, i) => (
          <div key={i} className="bg-background p-6 group transition-all duration-150 border-x border-border hover:bg-muted/10">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">{builder.name}</h3>
                  {builder.seekingCoFounder && <Badge className="bg-accent/10 text-accent border-accent/20 rounded-none text-[10px] uppercase font-bold px-1.5 py-0">Co-founder</Badge>}
                  {builder.seekingMentorship && <Badge className="bg-primary/10 text-primary border-primary/20 rounded-none text-[10px] uppercase font-bold px-1.5 py-0">Mentorship</Badge>}
                </div>
                <p className="text-sm text-foreground/90 font-medium leading-relaxed">{builder.tagline}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 max-w-2xl">{builder.experienceSummary}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {builder.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 border border-border bg-muted/5 text-muted-foreground uppercase tracking-tight">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleConnect(builder)}
                  className="border-border hover:border-accent hover:bg-accent/5 gap-2 px-4 h-9 group-hover:border-accent"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span className="text-xs uppercase tracking-wider font-bold">Connect</span>
                </Button>
                {builder.linkedInProfileUrl && (
                  <a href={builder.linkedInProfileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-9 w-9 border border-transparent hover:border-border">
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
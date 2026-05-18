'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Loader2 } from 'lucide-react';
import { generateFounderProfile } from '@/ai/flows/founder-profile-generation';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export function LightningIntake() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const addBuilder = useStore((state) => state.addBuilder);
  const { toast } = useToast();

  const handleApply = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const isUrl = input.startsWith('http');
      const profile = await generateFounderProfile({
        sourceText: input,
        sourceType: isUrl ? 'linkedin' : 'pitch',
        originalLinkedInUrl: isUrl ? input : undefined
      });
      
      setUserProfile(profile);
      addBuilder(profile);
      toast({ title: "Profile generated.", description: `Identity verified as ${profile.name}.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Intake failed.", description: "Check your connection or source text." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="space-y-6 border border-border p-8 glass shadow-2xl">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Lightning Intake
          </h2>
          <p className="text-sm text-muted-foreground">
            Paste a LinkedIn URL or a brief pitch to initialize your builder profile.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="linkedin.com/in/founder or 'I am building...'"
            className="flex-1 bg-transparent border-border focus:ring-0 focus:border-accent"
            disabled={loading}
          />
          <Button 
            onClick={handleApply} 
            disabled={loading || !input}
            className="bg-primary hover:bg-white text-primary-foreground font-semibold px-8 h-10 transition-all duration-150"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Identity"}
          </Button>
        </div>
      </div>
    </div>
  );
}
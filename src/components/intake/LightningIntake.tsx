
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Loader2, Send } from 'lucide-react';
import { generateFounderProfile } from '@/ai/flows/founder-profile-generation';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
      
      // Save to local store
      setUserProfile(profile);
      addBuilder(profile);

      // Securely store the application in Firestore for the admin
      addDoc(collection(db, 'applications'), {
        name: profile.name,
        role: profile.role,
        tagline: profile.tagline,
        content: input,
        timestamp: serverTimestamp(),
        status: 'pending'
      });
      
      toast({ 
        title: "Protocol Initialized", 
        description: `Identity verified as ${profile.name}. Your application has been logged to the Vault.`,
      });
      setInput('');
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Intake Interrupted", 
        description: "The ecosystem signal was lost. Please verify your source text and try again." 
      });
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
            Ecosystem Intake
          </h2>
          <p className="text-sm text-muted-foreground">
            Submit your LinkedIn URL or a brief pitch to initialize your profile and send your signal to the hub.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="linkedin.com/in/profile or 'I'm building...'"
            className="flex-1 bg-transparent border-border focus:ring-0 focus:border-accent h-12 text-sm"
            disabled={loading}
          />
          <Button 
            onClick={handleApply} 
            disabled={loading || !input}
            className="w-full sm:w-auto self-end bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest px-8 h-12 transition-all duration-150"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <span className="flex items-center gap-2">
                Send Signal
                <Send className="w-3.5 h-3.5" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Zap, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export function ForcePush() {
  const db = useFirestore();
  const { toast } = useToast();
  const [testInput, setTestInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForcePush = () => {
    if (!testInput) {
      toast({ variant: "destructive", title: "Input Required", description: "Enter some text to push." });
      return;
    }

    setLoading(true);
    const testRef = collection(db, "test_collection");
    const data = {
      status: "Prototyper successfully bypassed the error!",
      manualMessage: testInput,
      timestamp: serverTimestamp() // Using serverTimestamp for consistency
    };

    addDoc(testRef, data)
      .then(() => {
        setSuccess(true);
        setTestInput('');
        toast({ title: "Success!", description: "Bypassed and pushed to Firestore." });
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: testRef.path,
          operation: 'create',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto py-12 px-6">
      <div className="space-y-6 border border-border p-8 glass shadow-2xl rounded-2xl">
        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tighter uppercase">Debug Portal</h2>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Force write to test_collection</p>
        </div>

        <Input 
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          placeholder="TYPE SOMETHING..."
          className="bg-card/40 border-border focus:border-accent h-12 text-[10px] font-black uppercase tracking-widest rounded-lg"
          disabled={loading}
        />

        <Button 
          onClick={handleForcePush}
          disabled={loading || !testInput}
          className="w-full bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.2em] px-8 h-14 rounded-lg shadow-lg shadow-accent/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <span className="flex items-center gap-2">
              {success ? 'PUSHED' : 'Force Push to Test Collection'}
              {success ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

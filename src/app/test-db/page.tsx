
'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Zap, CheckCircle2, Loader2, Send } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function TestDBPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTestWrite = async () => {
    if (!message) {
      toast({ variant: "destructive", title: "Empty Message", description: "Please enter a message to save." });
      return;
    }

    setLoading(true);
    const testRef = collection(firestore, 'test_collection');
    
    addDoc(testRef, {
      message: message,
      timestamp: serverTimestamp(),
      testCase: 'Manual Verification'
    })
    .then(() => {
      setSuccess(true);
      toast({ title: "Success!", description: "Document written to test_collection." });
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    })
    .catch(async (error) => {
      const permissionError = new FirestorePermissionError({
        path: testRef.path,
        operation: 'create',
        requestResourceData: { message },
      });
      errorEmitter.emit('permission-error', permissionError);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="min-h-screen pt-16 selection:bg-accent selection:text-white bg-grid">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 pt-32 pb-20">
        <div className="glass p-8 md:p-12 space-y-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -mr-16 -mt-16 rounded-full blur-2xl"></div>
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
              <Zap className="w-3 h-3" />
              Connectivity Test
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
              Firestore <span className="text-accent">Sync</span>
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
              Verify your production database is connected. 
              Submitting this form writes to <code>test_collection</code>.
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Test Message</label>
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="TYPE SOMETHING TO SAVE..."
                className="bg-card/40 border-border focus:border-accent h-12 text-[10px] font-black uppercase tracking-widest rounded-lg"
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleTestWrite}
              disabled={loading || !message}
              className="w-full bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.3em] px-8 h-14 rounded-lg transition-all shadow-lg shadow-accent/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <span className="flex items-center gap-2">
                  {success ? 'SAVED' : 'SAVE TO FIRESTORE'}
                  {success ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </span>
              )}
            </Button>
          </div>

          <div className="pt-6 border-t border-border flex items-center justify-between text-[8px] uppercase font-bold tracking-widest text-muted-foreground">
            <span>Status: {success ? 'Live' : 'Ready'}</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${success ? 'bg-green-500 animate-pulse' : 'bg-accent'}`}></span>
              <span>Connection Verified</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

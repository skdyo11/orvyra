
'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Zap, CheckCircle2, Loader2, Send, Database } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { format } from 'date-fns';

export default function TestDBPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const testCollectionQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'test_collection'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: testDocs, loading: loadingDocs } = useCollection(testCollectionQuery);

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
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 space-y-12">
        <div className="glass p-8 md:p-12 space-y-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -mr-16 -mt-16 rounded-full blur-2xl"></div>
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
              <Zap className="w-3 h-3" />
              Connectivity Test
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
              Firestore <span className="text-accent">Live Sync</span>
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
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black tracking-tighter uppercase">Live Feed: <span className="text-muted-foreground">test_collection</span></h2>
          </div>

          <div className="grid gap-4">
            {loadingDocs ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground font-mono text-[10px] uppercase tracking-widest animate-pulse">
                Fetching documents...
              </div>
            ) : !testDocs || testDocs.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center rounded-2xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">No documents found in collection.</p>
              </div>
            ) : (
              testDocs.map((doc: any) => (
                <div key={doc.id} className="glass p-6 rounded-xl border border-border/40 flex justify-between items-center group hover:border-accent/40 transition-all">
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold text-foreground/90 uppercase">{doc.message}</p>
                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">
                      ID: {doc.id} // {doc.timestamp ? format(doc.timestamp.toDate(), 'HH:mm:ss, MMM d') : 'Pending...'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Live Data</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

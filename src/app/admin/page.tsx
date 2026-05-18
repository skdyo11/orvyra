
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, FileText, Clock, User, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const ADMIN_PASSWORD = 'orvyra-admin'; // In a real app, use Firebase Auth roles

  useEffect(() => {
    if (!isAuthorized) return;

    const q = query(collection(db, 'applications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
    } else {
      alert('Access Denied: Invalid Decryption Key');
    }
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-10 space-y-8 text-center border-accent/20">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto rounded-full">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tighter uppercase">Command Center</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Encrypted Access Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password"
              placeholder="Enter Access Key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-center bg-muted/5 border-border focus:border-accent font-mono"
            />
            <Button type="submit" className="w-full h-12 uppercase tracking-widest font-bold bg-accent hover:bg-accent/90">
              Unlock Terminal
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-32">
        <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
              Application Vault
              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-mono tracking-normal normal-case">
                {applications.length} Nodes
              </span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">Authorized Session: System Administrator</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-mono uppercase text-xs">
            Fetching secure signals...
          </div>
        ) : applications.length === 0 ? (
          <div className="border border-border p-20 text-center glass">
            <ShieldAlert className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">No Incoming Signals</h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">The intake queue is currently empty.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div key={app.id} className="glass p-8 space-y-6 hover:border-accent/40 transition-colors group">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-full shrink-0">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors">{app.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        <span className="text-accent">{app.role?.replace('-', ' ')}</span>
                        <span>//</span>
                        <Clock className="w-3 h-3" />
                        {app.timestamp?.toDate ? format(app.timestamp.toDate(), 'MMM d, HH:mm') : 'Recently'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/5 border border-border p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Source Transcript</span>
                    </div>
                    <p className="text-xs font-mono leading-relaxed text-foreground/80 italic">
                      "{app.content}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

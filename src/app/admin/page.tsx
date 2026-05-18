'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, FileText, Clock, User, ShieldAlert, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const ADMIN_PASSWORD = 'orvyra-admin';

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
        <div className="max-w-md w-full glass p-10 space-y-8 text-center border-accent/20 rounded-2xl">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto rounded-2xl">
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
              className="h-12 text-center bg-muted/5 border-border focus:border-accent font-mono rounded-lg"
            />
            <Button type="submit" className="w-full h-12 uppercase tracking-widest font-bold bg-accent hover:bg-accent/90 rounded-lg">
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
              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-lg font-mono tracking-normal normal-case">
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
          <div className="border border-border p-20 text-center glass rounded-2xl">
            <ShieldAlert className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">No Incoming Signals</h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">The intake queue is currently empty.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {applications.map((app) => (
              <div key={app.id} className="glass p-8 space-y-6 hover:border-accent/40 transition-colors group rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-border pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-xl shrink-0">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">{app.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        <span className="text-accent">{app.role?.replace('-', ' ')}</span>
                        <span>//</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {app.timestamp?.toDate ? format(app.timestamp.toDate(), 'MMM d, HH:mm') : 'Recently'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-accent" />
                      {app.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-accent" />
                      {app.phone || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-accent" />
                      {app.country || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-accent" />
                      AGE: {app.age || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/5 border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">The Idea Transcript</span>
                    </div>
                    <p className="text-xs font-mono leading-relaxed text-foreground/80 italic">
                      "{app.idea || app.content}"
                    </p>
                  </div>
                  
                  {app.tagline && (
                    <div className="px-1 text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
                      Generated Signal: <span className="text-foreground">{app.tagline}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

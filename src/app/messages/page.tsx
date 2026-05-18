'use client';

import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { MessageSquare, ShieldAlert } from 'lucide-react';

export default function MessagesPage() {
  const messages = useStore((state) => state.messages);
  const userProfile = useStore((state) => state.userProfile);

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">The Bridge</h1>
        
        {!userProfile ? (
          <div className="border border-border p-12 text-center glass">
            <ShieldAlert className="w-8 h-8 text-destructive mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Access Denied</h2>
            <p className="text-xs text-muted-foreground">Identity verification required to establish bridges.</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="border border-border p-12 text-center glass">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Zero Signal</h2>
            <p className="text-xs text-muted-foreground">Establish bridges via the Builder Feed to initiate threads.</p>
          </div>
        ) : (
          <div className="space-y-1 bg-border border border-border">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-background p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    <span className="text-[10px] uppercase font-black text-accent tracking-tighter">Connection established</span>
                    <span className="text-[10px] uppercase font-mono text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">From:</span>
                    <span className="text-xs font-medium">{msg.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">To:</span>
                    <span className="text-xs font-medium">{msg.to}</span>
                  </div>
                  <div className="mt-4 p-4 bg-muted/5 border border-border font-mono text-xs leading-relaxed text-foreground/90">
                    {msg.content}
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
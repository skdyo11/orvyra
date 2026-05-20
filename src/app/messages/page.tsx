'use client';

import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { MessageSquare, ShieldAlert } from 'lucide-react';

export default function MessagesPage() {
  const messages = useStore((state) => state.messages);
  const userProfile = useStore((state) => state.userProfile);

  const filteredMessages = messages.filter(msg => {
    if (!userProfile) return false;
    
    // Hide messages that were specifically marked as one-way/hidden from the sender
    if (msg.hiddenFromSender && msg.from === userProfile.name) {
      return false;
    }
    
    // Show messages sent to me or sent by me (unless hidden above)
    return msg.to === userProfile.name || msg.from === userProfile.name || msg.to === 'You';
  });

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Chats</h1>
        
        {!userProfile ? (
          <div className="border border-border p-12 text-center glass rounded-2xl">
            <ShieldAlert className="w-8 h-8 text-destructive mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Login Required</h2>
            <p className="text-xs text-muted-foreground">Join the network first to start chatting.</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="border border-border p-12 text-center glass rounded-2xl">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">No messages yet</h2>
            <p className="text-xs text-muted-foreground">Browse the Founders Feed to start a conversation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="glass p-6 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    <span className="text-[10px] uppercase font-black text-accent tracking-tighter">Connection Active</span>
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
                  <div className="mt-4 p-4 bg-muted/5 border border-border font-mono text-xs leading-relaxed text-foreground/90 rounded-lg">
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

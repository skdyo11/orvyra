'use client';

import { Navbar } from '@/components/layout/Navbar';
import { BuilderFeed } from '@/components/feed/BuilderFeed';

export default function ProfilesPage() {
  return (
    <main className="min-h-screen pt-16 bg-grid">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
            Community
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
            The Founders <br />
            <span className="text-accent">Network</span>
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold max-w-md leading-relaxed">
            Browse builders, founders, and investors building the next generation of startups.
          </p>
        </div>
      </div>
      <BuilderFeed />
    </main>
  );
}

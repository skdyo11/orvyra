'use client';

import { Navbar } from '@/components/layout/Navbar';
import { LightningIntake } from '@/components/intake/LightningIntake';
import { BuilderFeed } from '@/components/feed/BuilderFeed';
import { useStore } from '@/lib/store';

export default function Home() {
  const userProfile = useStore((state) => state.userProfile);

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      
      {!userProfile ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center mb-12 px-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4 text-white">
              Accelerate Building.
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium max-w-lg mx-auto leading-relaxed">
              No bios. No resumes. Only execution signals and direct connections for technical founders.
            </p>
          </div>
          <LightningIntake />
        </div>
      ) : (
        <div className="space-y-12">
          <div className="bg-muted/10 border-b border-border py-12">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-2 text-[10px] text-accent uppercase font-black tracking-widest mb-2">
                <span className="w-2 h-2 bg-accent animate-pulse"></span>
                Builder Active
              </div>
              <h1 className="text-3xl font-bold tracking-tighter mb-2">{userProfile.name}</h1>
              <p className="text-muted-foreground text-sm font-medium">{userProfile.tagline}</p>
            </div>
          </div>
          <BuilderFeed />
        </div>
      )}
      
      <footer className="py-12 border-t border-border mt-20">
        <div className="max-w-4xl mx-auto px-6 text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex justify-between items-center">
          <span>Orvyra // V0.1.0-alpha</span>
          <span>Latency: 142ms</span>
        </div>
      </footer>
    </main>
  );
}
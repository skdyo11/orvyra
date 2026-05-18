'use client';

import { Navbar } from '@/components/layout/Navbar';
import { LightningIntake } from '@/components/intake/LightningIntake';
import { BuilderFeed } from '@/components/feed/BuilderFeed';
import { useStore } from '@/lib/store';
import { Zap, Target, Layers, ShieldCheck, ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const userProfile = useStore((state) => state.userProfile);

  if (userProfile) {
    return (
      <main className="min-h-screen pt-16">
        <Navbar />
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
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent mb-8">
            <Zap className="w-3 h-3" />
            Protocol v0.1.0-alpha
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            The Execution <br />
            <span className="text-accent">Protocol.</span>
          </h1>
          
          <p className="text-muted-foreground text-sm sm:text-base uppercase tracking-widest font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Resumes are noise. Bios are fiction. Orvyra is the signal-only matchmaking engine for technical founders building the next decade of infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#intake">
              <Button className="h-12 px-8 rounded-none font-bold uppercase tracking-widest group">
                Initialize Intake
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button variant="outline" className="h-12 px-8 rounded-none font-bold uppercase tracking-widest border-border">
              Read Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section className="py-24 border-y border-border bg-muted/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Zero-Friction Networking</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Our AI-driven Intake system extracts raw execution capability from your LinkedIn or pitch text. No manual profile building. No self-promotion. Just your work history and current build.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">The Resource Vault</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Access systematic modules for engineering-led company building. From ICP metrics to CI/CD pipelines, Orvyra provides the blueprints for technical scaling.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Verified Signals</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                We prioritize builders over talkers. Every connection on Orvyra is based on technical alignment and execution signals rather than networking prowess.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">The Bridge</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Direct peer-to-peer communication. Establish "Bridges" with other founders to discuss technical collaboration, mentorship, or co-founder opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intake Section */}
      <section id="intake" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Start the Protocol.</h2>
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Paste your signal to begin.</p>
          </div>
          <LightningIntake />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-muted/5">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">O</span>
            </div>
            <span className="text-sm font-black tracking-tighter uppercase">Orvyra</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            High-frictionless matchmaking for technical founders.
          </p>
        </div>
        
        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex items-center gap-8">
          <span>V0.1.0-alpha // 2024</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            System Online
          </span>
        </div>
      </div>
    </footer>
  );
}

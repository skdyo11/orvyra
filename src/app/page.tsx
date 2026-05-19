'use client';

import { Navbar } from '@/components/layout/Navbar';
import { LightningIntake } from '@/components/intake/LightningIntake';
import { useStore } from '@/lib/store';
import { Zap, Layers, ShieldCheck, ArrowRight, MessageSquare, Network, Users, Calendar, Rocket, Banknote, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const handleBrowseClick = () => {
    document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinClick = () => {
    document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { label: 'Seats per cohort', value: '300', icon: Users },
    { label: 'Months program', value: '3', icon: Calendar },
    { label: 'Startups funded', value: '10', icon: Rocket },
    { label: 'Per startup funded', value: 'Rs 5L', icon: Banknote },
    { label: 'To apply', value: 'Free', icon: CheckCircle },
  ];

  return (
    <main className="min-h-screen pt-16 selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-grid">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent mb-8 rounded-lg">
            <Zap className="w-3 h-3" />
            Join the beta
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            The Startup <br />
            <span className="text-accent">Network.</span>
          </h1>
          
          <p className="text-muted-foreground text-sm sm:text-base uppercase tracking-widest font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Find your next co-founder, investor, or mentor. Orvyra helps you connect with the people building the future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="h-12 px-8 font-bold uppercase tracking-widest group rounded-lg"
              onClick={handleJoinClick}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-8 font-bold uppercase tracking-widest border-border rounded-lg"
              onClick={handleBrowseClick}
            >
              Browse Founders
            </Button>
          </div>
        </div>
      </section>

      {/* Cohort Stats Section */}
      <section className="py-12 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-6 text-center space-y-2 border-border/40 hover:border-accent/40 transition-colors rounded-2xl">
                <div className="w-8 h-8 bg-accent/10 flex items-center justify-center mx-auto rounded-lg mb-2">
                  <stat.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-black tracking-tighter uppercase">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orvyra Fund Section */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass p-8 md:p-12 border-accent/20 rounded-[2rem] space-y-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
            
            <div className="space-y-6 relative z-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
                The Fund
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                The Orvyra <span className="text-accent">Fund</span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">Rs 50 Lac</span>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">deployed every cohort into 10 startups</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10 border-y border-border py-10">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-3xl font-black tracking-tighter uppercase">10 Startups</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Selected</div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-3xl font-black tracking-tighter uppercase">Rs 5L</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Per Startup</div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-3xl font-black tracking-tighter uppercase">5–10%</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Equity Taken</div>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xl font-bold uppercase tracking-tight">Day 90: Demo Day</span>
              </div>
              
              <div className="bg-muted/5 border border-border p-8 rounded-2xl relative">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium uppercase tracking-wide text-center sm:text-left">
                  Selection is based on merit alone — your idea, your execution, your growth during the 3 months. 
                  <span className="block mt-2 text-accent font-black">No connections. No references. No background checks. Just what you build.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y border-border bg-muted/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg">
                <Network className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Quick Profile</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Just paste your idea or pitch. Our AI builds your founder profile instantly so you can get on the radar of the community.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-lg">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Startup Blueprints</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Get access to essential guides for scaling your business—from legal templates to engineering roadmaps.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Trusted Matches</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                We focus on quality. We connect you based on what you’re building, your skills, and what you need right now.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tighter">Direct Chat</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-wider">
                Chat directly with other members. Start conversations about co-founding, seed rounds, or getting advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intake Section */}
      <section id="intake" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Join the Community.</h2>
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Tell us about your startup to begin.</p>
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
            <span className="text-sm font-black tracking-[0.3em] uppercase">Orvyra</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            Connecting founders and building startups together.
          </p>
        </div>
        
        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex items-center gap-8">
          <span>2024</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            System Online
          </span>
        </div>
      </div>
    </footer>
  );
}

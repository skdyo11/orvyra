'use client';

import { Navbar } from '@/components/layout/Navbar';
import { LightningIntake } from '@/components/intake/LightningIntake';
import { Zap, ArrowRight, Users, Calendar, Rocket, Banknote, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const handleApplyClick = () => {
    document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCurriculumClick = () => {
    // This could navigate to the vault or a specific curriculum section
    const vaultElement = document.getElementById('vault-section');
    if (vaultElement) {
      vaultElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/vault';
    }
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
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-grid">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/10 dark:bg-accent/20 rounded-full blur-[80px] sm:blur-[120px] opacity-60 sm:opacity-40"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border bg-background/50 text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-12 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            COHORT 01 - APPLICATIONS OPEN
          </div>
          
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter uppercase mb-8 leading-[0.85] text-foreground">
            Pakistan's First <br />
            <span className="text-accent italic font-serif normal-case">Funded</span> Startup <br />
            School
          </h1>
          
          <p className="text-muted-foreground text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            3 months. Real curriculum. Real mentors. Rs 5 lac in funding for the best 10 startups. Built for unemployed youth who want to build, not just learn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="w-full sm:w-auto h-14 px-10 font-bold uppercase tracking-widest group rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform"
              onClick={handleApplyClick}
            >
              Apply for Cohort 01
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-14 px-10 font-bold uppercase tracking-widest border-border bg-background/50 hover:bg-background rounded-full transition-all"
              onClick={handleCurriculumClick}
            >
              See curriculum
            </Button>
          </div>
        </div>
      </section>

      {/* Cohort Stats Section */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`glass p-5 md:p-6 text-center space-y-2 border-border/40 hover:border-accent/40 transition-colors rounded-2xl ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className="w-8 h-8 bg-accent/10 flex items-center justify-center mx-auto rounded-lg mb-2">
                  <stat.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="text-xl md:text-2xl font-black tracking-tighter uppercase">{stat.value}</div>
                <div className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orvyra Fund Section */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glass p-6 md:p-12 border-accent/20 rounded-[1.5rem] md:rounded-[2rem] space-y-8 md:space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
            
            <div className="space-y-4 md:space-y-6 relative z-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
                The Fund
              </div>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                The ORVYRA <span className="text-accent">Fund</span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Rs 50 Lac</span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest">deployed every cohort into 10 startups</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 relative z-10 border-y border-border py-8 md:py-10">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xl md:text-3xl font-black tracking-tighter uppercase">10 Startups</div>
                <div className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Selected</div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xl md:text-3xl font-black tracking-tighter uppercase">Rs 5L</div>
                <div className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Per Startup</div>
              </div>
              <div className="space-y-1 text-center sm:text-left col-span-2 sm:col-span-1">
                <div className="text-xl md:text-3xl font-black tracking-tighter uppercase">5-10%</div>
                <div className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Equity Taken</div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <span className="text-lg md:text-xl font-bold uppercase tracking-tight">Day 90: Demo Day</span>
              </div>
              
              <div className="bg-muted/5 border border-border p-5 md:p-8 rounded-2xl relative">
                <p className="text-xs md:text-base text-foreground/90 leading-relaxed font-medium uppercase tracking-wide text-center sm:text-left">
                  Selection is based on merit alone: your idea, your execution, your growth during the 3 months. 
                  <span className="block mt-2 text-accent font-black">No connections. No references. No background checks. Just what you build.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application Section */}
      <section id="intake" className="py-24 md:py-32 bg-background border-t border-border/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Pitch the <span className="text-accent">Network</span></h2>
            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-widest font-bold max-w-md mx-auto leading-relaxed">
              This is a direct line to our review team. Your submission will appear in the Admin Portal.
            </p>
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
    <footer className="py-12 bg-background border-t border-border/10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-[0.3em] uppercase">ORVYRA</span>
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

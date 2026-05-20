'use client';

import { Navbar } from '@/components/layout/Navbar';
import { LightningIntake } from '@/components/intake/LightningIntake';
import { ArrowRight, TrendingUp, Target, Users, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const handleApplyClick = () => {
    document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCurriculumClick = () => {
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { label: 'Seats per cohort', value: '300' },
    { label: 'Months program', value: '3' },
    { label: 'Startups funded', value: '10' },
    { label: 'Per startup funded', value: 'Rs 5L' },
    { label: 'To apply', value: 'Free' },
  ];

  const tickerItems = [
    "AI TOOLS", "GLOBAL SALES", "FUNDRAISING", "PITCH DECK", "DEMO DAY", 
    "RS 5 LAC FUND", "LIVE ZOOM SESSIONS", "YC FRAMEWORK", "PERSONAL BRAND", "IDEA VALIDATION"
  ];

  const curriculumModules = [
    {
      id: '01',
      title: 'Mindset & Idea Validation',
      description: 'How to find a real problem worth solving. Talk to 100 potential customers before writing a single line of code.',
      weeks: 'WEEK 1 - 2'
    },
    {
      id: '02',
      title: 'Build with AI & No-Code',
      description: 'Use Cursor, Bubble, Make.com, and Glide to ship a working product without a developer. In 2025, anyone can build.',
      weeks: 'WEEK 3 - 4'
    },
    {
      id: '03',
      title: 'Global Sales from Pakistan',
      description: 'Finding USD clients on LinkedIn. Pricing in dollars. Getting your first paying international customer from anywhere in the world.',
      weeks: 'WEEK 5 - 6'
    },
    {
      id: '04',
      title: 'Fundraising & Investor Language',
      description: 'What a term sheet is. How equity works. How to write a pitch deck that gets meetings. Applying to YC, Antler, Iterative.',
      weeks: 'WEEK 7 - 8'
    },
    {
      id: '05',
      title: 'Personal Brand & Building in Public',
      description: 'LinkedIn, X, and Instagram strategy for founders. How to attract investors and customers through content alone.',
      weeks: 'WEEK 9 - 10'
    },
    {
      id: '06',
      title: 'Demo Day Preparation',
      description: 'Pitch your startup live. A panel of investors selects 10 startups. Winners receive Rs 5 lac in funding each.',
      weeks: 'WEEK 11 - 12'
    }
  ];

  const workflowSteps = [
    {
      number: '01',
      badge: 'APPLY - FREE',
      title: 'Submit your application',
      description: 'Fill in the application form for free. No degree. No CV. No experience required. Just answer honestly. Applications are reviewed by our team within 7 days.'
    },
    {
      number: '02',
      badge: 'SELECTION',
      title: 'We select 300 per cohort',
      description: 'We may receive thousands of applications but only 300 are selected per cohort. If you are selected, you will receive a confirmation email from us with next steps.'
    },
    {
      number: '03',
      badge: 'PAY TO CONFIRM',
      title: 'Confirm your seat - Rs 5,000',
      description: 'Only selected applicants pay. Once you receive your selection email, complete your Rs 5,000 payment online. We accept all major cards and online payments from anywhere in the world - Pakistan, UAE, UK, USA, everywhere.'
    }
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
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="text-center space-y-1"
              >
                <div className="text-4xl md:text-5xl font-serif tracking-tight leading-none">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Ticker Section */}
      <section className="py-4 border-y border-foreground/5 bg-foreground/[0.02] overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {tickerItems.map((item, j) => (
                <div key={j} className="flex items-center gap-12">
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-accent transition-colors cursor-default">
                    {item}
                  </span>
                  <span className="w-1 h-1 bg-foreground/10 rounded-full"></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground">WHAT IS ORVYRA</div>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                Job dhondna chhodo. <br />
                Job do.
              </h2>
              <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg font-medium">
                <p>
                  Orvyra is not a course platform. It is a 90-day transformation program where unemployed Pakistani youth - boys and girls - go from zero to building a real startup, with a real team, pitching for real funding.
                </p>
                <p>
                  Every 3 days, a live Zoom session with a founder, investor, or industry leader who has actually built something. No recorded lectures. No certificates. Just execution.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-8 space-y-3 rounded-3xl border-border/60">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Not another course</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-1">
                  Google, NVIDIA, IBM teach tools. We teach you how to build a company around them. That gap is where Orvyra lives.
                </p>
              </div>

              <div className="glass p-8 space-y-3 rounded-3xl border-border/60">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Girls equally funded</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-1">
                  We believe Pakistan's next wave of founders is female. Orvyra actively recruits and equally considers girls for all 10 funded spots.
                </p>
              </div>

              <div className="glass p-8 space-y-3 rounded-3xl border-border/60">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Build globally, sit locally</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-1">
                  Learn to earn in dollars, sell to US & UK clients, open international accounts - all from Lahore, Karachi, or Peshawar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-background border-t border-border/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground">WHO THIS IS FOR</div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              This is built for you if -
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-10 space-y-6 rounded-[2rem] border-border/60">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">You're unemployed or underemployed</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  You have a degree or skills but the system hasn't given you a fair shot. Orvyra does not require a CV, a degree, or prior work experience.
                </p>
              </div>
            </div>

            <div className="glass p-10 space-y-6 rounded-[2rem] border-border/60">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">You have an idea (or want one)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  You don't need to walk in with a perfect idea. Module 1 will help you find one. You just need to be willing to work on it seriously for 90 days.
                </p>
              </div>
            </div>

            <div className="glass p-10 space-y-6 rounded-[2rem] border-border/60">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">You're a girl who's been told "not yet"</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Orvyra actively recruits female founders. We believe Pakistan's next unicorn will be built by a girl who was told the world wasn't ready for her.
                </p>
              </div>
            </div>

            <div className="glass p-10 space-y-6 rounded-[2rem] border-border/60">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">You want to build globally, not just locally</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  You're tired of the Rs ceiling. You want to sell to New York, London, and Dubai - from Lahore. We will show you exactly how that is done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-24 bg-background border-t border-border/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground">12-WEEK CURRICULUM</div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight max-w-3xl mx-auto">
              What no school in Pakistan teaches
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              6 modules designed around YC's framework, adapted for the Pakistani founder context.
            </p>
          </div>

          <div className="glass rounded-[2rem] overflow-hidden border-border/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {curriculumModules.map((module, index) => (
              <div 
                key={index} 
                className={`p-8 md:p-12 space-y-6 flex flex-col justify-between border-border/40 ${
                  index % 3 !== 2 ? 'lg:border-r' : ''
                } ${
                  index < 3 ? 'lg:border-b' : ''
                } ${
                  index % 2 === 0 ? 'md:border-r lg:border-r-inherit' : 'md:border-r-0 lg:border-r'
                } ${
                  index < 4 ? 'md:border-b' : ''
                } border-b lg:border-b-inherit`}
              >
                <div className="space-y-4">
                  <div className="text-[10px] font-mono text-muted-foreground/60">{module.id}</div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                    {module.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                    {module.description}
                  </p>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 pt-4">
                  {module.weeks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground">HOW IT WORKS</div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              From application to funded
            </h2>
          </div>

          <div className="space-y-0">
            {workflowSteps.map((step, index) => (
              <div key={index} className="group py-12 border-t border-border/40 first:border-t-0 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                <div className="text-4xl md:text-5xl font-serif text-muted-foreground/30 font-black shrink-0 tabular-nums">
                  {step.number}
                </div>
                <div className="space-y-6 flex-1">
                  <div className="inline-flex items-center px-4 py-1.5 border border-border text-[9px] font-bold uppercase tracking-widest text-muted-foreground rounded-full">
                    {step.badge}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orvyra Fund Section */}
      <section className="py-24 bg-background">
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
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest ml-2">deployed every cohort into 10 startups</span>
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

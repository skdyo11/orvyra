'use client';

import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { User, ShieldCheck, Tag, Briefcase, Mail, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type StartupRole } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ProfilePage() {
  const userProfile = useStore((state) => state.userProfile);
  const updateUserProfile = useStore((state) => state.updateUserProfile);
  const { toast } = useToast();

  if (!userProfile) {
    return (
      <main className="min-h-screen pt-16">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-20 text-center">
          <div className="border border-border p-12 glass rounded-2xl">
            <User className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">No Profile Found</h2>
            <p className="text-xs text-muted-foreground mb-8">You need to join the network on the home page first.</p>
            <Link href="/">
              <Button variant="outline" className="border-border uppercase tracking-widest text-[10px] font-bold h-10 px-6 rounded-lg">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleRoleChange = (role: StartupRole) => {
    updateUserProfile({ role });
    toast({ title: "Role Updated", description: `You're now listed as a ${role.replace('-', ' ')}.` });
  };

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg">
              <User className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase">{userProfile.name}</h1>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Member Active
              </div>
            </div>
          </div>
          
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent group rounded-lg">
              <Shield className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
              Admin Portal
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Your Main Role
              </h2>
              <Select value={userProfile.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full h-12 bg-transparent border-border focus:ring-0 rounded-lg">
                  <SelectValue placeholder="What's your role?" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border rounded-lg">
                  <SelectItem value="tech-founder">Tech Founder (Building the product)</SelectItem>
                  <SelectItem value="sales-founder">Sales Founder (Finding customers)</SelectItem>
                  <SelectItem value="product-founder">Product Founder (Design & UX)</SelectItem>
                  <SelectItem value="investor">Investor (Looking for startups)</SelectItem>
                  <SelectItem value="visionary">Visionary (Have an idea)</SelectItem>
                  <SelectItem value="advisor">Advisor (Expert help)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground font-mono uppercase">Changing this updates how you appear in the feed.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Your Story
              </h2>
              <div className="border border-border p-6 glass font-mono text-xs leading-relaxed rounded-xl">
                {userProfile.experienceSummary}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Top Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] px-3 py-1.5 border border-border bg-muted/5 text-muted-foreground uppercase tracking-widest font-bold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="border border-border p-6 glass space-y-4 rounded-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">Settings</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Matching</span>
                  <span className="text-accent">On</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Visibility</span>
                  <span className="text-accent">Public</span>
                </div>
              </div>
            </section>

            <section className="border border-border p-6 glass space-y-4 rounded-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">Links</h2>
              {userProfile.linkedInProfileUrl ? (
                <a href={userProfile.linkedInProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors font-mono">
                  <Mail className="w-3 h-3" />
                  LINKEDIN
                </a>
              ) : (
                <p className="text-[10px] text-muted-foreground italic font-mono uppercase tracking-tight">No links added.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

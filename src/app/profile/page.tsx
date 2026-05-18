'use client';

import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { User, ShieldCheck, Tag, Briefcase, Mail, ArrowLeft } from 'lucide-react';
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
          <div className="border border-border p-12 glass">
            <User className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Protocol Uninitialized</h2>
            <p className="text-xs text-muted-foreground mb-8">Establish your builder identity via the Lightning Intake on the home page.</p>
            <Link href="/">
              <Button variant="outline" className="rounded-none border-border uppercase tracking-widest text-[10px] font-bold">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Return to Intake
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleRoleChange = (role: StartupRole) => {
    updateUserProfile({ role });
    toast({ title: "Profile Updated", description: `Primary role re-categorized as ${role.replace('-', ' ')}.` });
  };

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center">
            <User className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">{userProfile.name}</h1>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Identity Verified // Protocol Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Primary Role
              </h2>
              <Select value={userProfile.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full h-12 bg-transparent border-border rounded-none focus:ring-0">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border rounded-none">
                  <SelectItem value="tech-founder">Tech Founder (Engineering Focus)</SelectItem>
                  <SelectItem value="sales-founder">Sales Founder (GTM & Growth)</SelectItem>
                  <SelectItem value="product-founder">Product Founder (Design & UX)</SelectItem>
                  <SelectItem value="investor">Investor (VC or Angel)</SelectItem>
                  <SelectItem value="visionary">Visionary (Idea Stage)</SelectItem>
                  <SelectItem value="advisor">Advisor (Expertise & Network)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground font-mono uppercase">Changing your role updates how you appear in the signal feed.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Experience Signal
              </h2>
              <div className="border border-border p-6 glass font-mono text-xs leading-relaxed">
                {userProfile.experienceSummary}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Skills Vault
              </h2>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 border border-border bg-muted/5 text-muted-foreground uppercase tracking-widest font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="border border-border p-6 glass space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Matchmaking</span>
                  <span className="text-accent">Enabled</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Visibility</span>
                  <span className="text-accent">Public</span>
                </div>
              </div>
            </section>

            <section className="border border-border p-6 glass space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">External Links</h2>
              {userProfile.linkedInProfileUrl ? (
                <a href={userProfile.linkedInProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors font-mono">
                  <Mail className="w-3 h-3" />
                  LINKEDIN PROFILE
                </a>
              ) : (
                <p className="text-[10px] text-muted-foreground italic font-mono">No external signals linked.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

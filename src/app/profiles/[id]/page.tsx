'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { User, ShieldCheck, Tag, Briefcase, Mail, ArrowLeft, MessageSquare, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { type StartupRole } from '@/ai/schemas';

export default function PublicProfilePage() {
  const { id } = useParams();
  const builders = useStore((state) => state.builders);
  const userProfile = useStore((state) => state.userProfile);
  const sendMessage = useStore((state) => state.sendMessage);
  const { toast } = useToast();

  const builder = useMemo(() => {
    return builders.find(b => b.name.toLowerCase().replace(/\s+/g, '-') === id);
  }, [builders, id]);

  if (!builder) {
    return (
      <main className="min-h-screen pt-16">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-20 text-center">
          <div className="border border-border p-12 glass rounded-2xl">
            <User className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Profile Not Found</h2>
            <p className="text-xs text-muted-foreground mb-8">We couldn't find the builder you're looking for.</p>
            <Link href="/profiles">
              <Button variant="outline" className="border-border uppercase tracking-widest text-[10px] font-bold h-10 px-6 rounded-lg">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Back to Feed
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleConnect = () => {
    if (!userProfile) {
      toast({ variant: "destructive", title: "Hold on!", description: "Join the network first to send messages." });
      return;
    }
    
    sendMessage({
      from: userProfile.name,
      to: builder.name,
      content: `Hey, I'm ${userProfile.name}. I'm building ${userProfile.tagline} and wanted to connect!`
    });
    
    toast({ title: "Message sent!", description: `We've started a chat with ${builder.name}.` });
  };

  const isOwnProfile = userProfile?.name === builder.name;

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
        
        {/* Profile Header */}
        <div className="relative isolate mb-16">
          <div className="w-full h-48 md:h-64 lg:h-80 rounded-3xl overflow-hidden relative shadow-2xl group">
            <img
              src={`https://picsum.photos/seed/${builder.name}/1600/400`}
              alt="Profile Cover"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="px-8 -mt-20 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-start gap-6 pb-4">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl border-[6px] border-background bg-card overflow-hidden shadow-2xl ring-4 ring-accent/20">
              <img
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${id}`}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                  <h1 className="text-3xl font-black tracking-tighter uppercase">{builder.name}</h1>
                  <div className="mt-1">
                    <span className="text-[9px] px-2 py-0.5 border border-muted-foreground/20 bg-muted/20 text-muted-foreground uppercase font-black tracking-widest rounded-md">
                      {builder.role?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {!isOwnProfile && (
                    <Button 
                      onClick={handleConnect}
                      className="bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest text-[10px] gap-2 px-8 h-11 rounded-xl shadow-lg shadow-accent/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </Button>
                  )}
                  {isOwnProfile && (
                    <Link href="/profile">
                      <Button variant="outline" className="text-[10px] uppercase tracking-widest border-border font-bold h-11 px-8 rounded-xl">
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-12">
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Ecosystem Role
              </h2>
              <div className="flex items-center gap-3 p-4 glass border-border rounded-xl">
                <Badge variant="outline" className="bg-accent/5 border-accent/20 text-accent rounded-lg text-[10px] uppercase font-black tracking-widest px-3 py-1">
                  {builder.role?.replace('-', ' ')}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  Currently focused on {builder.companyName || 'stealth project'}
                </span>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                The Pitch
              </h2>
              <div className="space-y-4">
                <div className="text-xl font-bold tracking-tight uppercase leading-tight">
                  {builder.tagline}
                </div>
                <div className="border border-border p-6 glass font-mono text-xs leading-relaxed rounded-xl italic text-foreground/80">
                  "{builder.experienceSummary}"
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Skill Matrix
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {builder.skills.length} Expertise Areas
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {builder.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] px-4 py-2 border border-accent/20 bg-accent/5 text-accent uppercase tracking-widest font-black rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="border border-border p-6 glass space-y-4 rounded-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Seeking Co-founder</span>
                  <span className={builder.seekingCoFounder ? "text-accent" : "text-muted-foreground/30"}>
                    {builder.seekingCoFounder ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter">
                  <span className="text-muted-foreground">Mentorship</span>
                  <span className={builder.seekingMentorship ? "text-accent" : "text-muted-foreground/30"}>
                    {builder.seekingMentorship ? "Available" : "No"}
                  </span>
                </div>
              </div>
            </section>

            <section className="border border-border p-6 glass space-y-4 rounded-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-2">Links</h2>
              <div className="space-y-2">
                {builder.linkedInProfileUrl ? (
                  <a href={builder.linkedInProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors font-mono group">
                    <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    LINKEDIN PROFILE
                  </a>
                ) : (
                  <p className="text-[10px] text-muted-foreground italic font-mono uppercase tracking-tight">No external links.</p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Mail className="w-3 h-3" />
                  VERIFIED MEMBER
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

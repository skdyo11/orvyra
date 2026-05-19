'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useStore } from '@/lib/store';
import { User, ShieldCheck, Tag, Briefcase, Mail, ArrowLeft, Shield, Camera, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type StartupRole } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SUGGESTED_SKILLS = [
  'Software Dev',
  'Sales & Growth',
  'Content & Media',
  'UI/UX Design',
  'Product Strategy',
  'Fundraising',
  'Operations',
  'Hardware Eng',
  'Marketing',
  'Legal & IP'
];

export default function ProfilePage() {
  const userProfile = useStore((state) => state.userProfile);
  const updateUserProfile = useStore((state) => state.updateUserProfile);
  const { toast } = useToast();

  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [bannerOptions, setBannerOptions] = useState<string[]>([]);
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);

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

  const toggleSkill = (skill: string) => {
    const currentSkills = userProfile.skills || [];
    const isSelected = currentSkills.includes(skill);
    
    const newSkills = isSelected
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    updateUserProfile({ skills: newSkills });
    
    toast({ 
      title: isSelected ? "Skill Removed" : "Skill Added", 
      description: `${skill} has been ${isSelected ? 'removed from' : 'added to'} your profile.` 
    });
  };

  const generateBanners = () => {
    toast({ title: "Banner Generation", description: "Generating new cover options for your profile..." });
    setBannerOptions(['1', '2', '3']);
  };

  const generateAvatars = () => {
    toast({ title: "Avatar Generation", description: "Generating new avatar options for your profile..." });
    setAvatarOptions(['1', '2', '3']);
  };

  const isOwnProfile = true;
  const userId = userProfile.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
        
        <div className="relative isolate mb-16">
          <div className="w-full h-48 md:h-64 lg:h-80 rounded-3xl overflow-hidden relative shadow-2xl group">
            <img
              src={`https://picsum.photos/seed/${userProfile.name}/1600/400`}
              alt="Profile Cover"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {isOwnProfile && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  if (bannerOptions.length === 0) generateBanners();
                  setIsCoverModalOpen(true);
                }}
                className="absolute bottom-6 right-6 gap-2 bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 text-white shadow-xl z-50 rounded-xl"
              >
                <Camera className="h-4 w-4" />
                Update Cover
              </Button>
            )}
          </div>

          <div className="px-8 -mt-20 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-start gap-6 pb-4">
            <div className="relative group">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl border-[6px] border-background bg-card overflow-hidden shadow-2xl ring-4 ring-accent/20">
                <img
                  src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userId}`}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              {isOwnProfile && (
                <button 
                  onClick={() => {
                    if (avatarOptions.length === 0) generateAvatars();
                    setIsAvatarModalOpen(true);
                  }} 
                  className="absolute bottom-2 right-2 p-2 rounded-xl bg-accent text-white shadow-xl transition-transform hover:scale-110 active:scale-95 z-50"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                  <h1 className="text-3xl font-black tracking-tighter uppercase">{userProfile.name}</h1>
                  <div className="mt-1">
                    <span className="text-[10px] px-3 py-1 border border-muted-foreground/20 bg-muted/20 text-muted-foreground uppercase font-black tracking-widest rounded-md">
                      {userProfile.role?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent group rounded-lg">
                    <Shield className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-12">
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
              <div className="border border-border p-6 glass font-mono text-xs leading-relaxed rounded-xl italic text-foreground/80">
                "{userProfile.experienceSummary}"
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Skill Matrix
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {userProfile.skills.length} Selected
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Select your core strengths:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SKILLS.map((skill) => {
                    const isSelected = userProfile.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          "group relative flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-black tracking-widest border transition-all duration-200 rounded-lg",
                          isSelected 
                            ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" 
                            : "bg-card border-border text-muted-foreground hover:border-accent hover:text-accent"
                        )}
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-muted-foreground group-hover:text-accent" />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {userProfile.skills.length > 0 && (
                <div className="pt-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-3">Currently Showcasing:</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-3 py-1.5 border border-border bg-muted/5 text-muted-foreground uppercase tracking-widest font-bold rounded-lg animate-in fade-in zoom-in duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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

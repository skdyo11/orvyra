'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { generateFounderProfile } from '@/ai/flows/founder-profile-generation';
import { useToast } from '@/hooks/use-toast';

const COUNTRIES = [
  { name: 'Pakistan', code: '+92' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Canada', code: '+1' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Australia', code: '+61' },
  { name: 'Other', code: '' },
];

export function LightningIntake() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    age: '',
    idea: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    const countryData = COUNTRIES.find(c => c.name === value);
    setFormData(prev => ({
      ...prev,
      country: value,
      phone: countryData && countryData.code ? countryData.code + ' ' : prev.phone
    }));
  };

  const handleApply = async () => {
    if (!formData.name || !formData.email || !formData.idea) {
      toast({ variant: "destructive", title: "Missing Information", description: "Name, Email, and Idea are required to send your pitch." });
      return;
    }
    
    setLoading(true);
    try {
      // Use AI to extract role and tagline for the admin review
      const profile = await generateFounderProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        age: formData.age,
        idea: formData.idea
      });
      
      // Save to API for the admin page ONLY
      // This is a "chat starter" that goes to the admin, not a login.
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: profile.role,
          tagline: profile.tagline,
          status: 'pending'
        })
      });

      setSubmitted(true);
      toast({ 
        title: "Application Sent", 
        description: `Thanks ${formData.name}, your application has been received by our team.`,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        age: '',
        idea: ''
      });
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Submission Error", 
        description: "We couldn't deliver your application. Please check your connection and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 px-6">
        <div className="border border-border p-12 glass shadow-2xl rounded-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-2xl mx-auto">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tighter uppercase">Application Received</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
              Your pitch has been safely delivered to our review team.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSubmitted(false)}
            className="text-[10px] font-black uppercase tracking-widest h-10 px-8 rounded-lg border-border"
          >
            Send Another Pitch
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="space-y-8 border border-border p-8 glass shadow-2xl rounded-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-accent/20 bg-accent/5 text-[9px] uppercase font-black tracking-[0.2em] text-accent rounded-md">
            Direct Line
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
            Pitch the <span className="text-accent">Network</span>
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Send your application directly to our partners for review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="YOUR NAME"
              className="bg-card/40 border-border focus:border-accent h-11 text-[10px] font-black uppercase tracking-widest rounded-lg"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="EMAIL@EXAMPLE.COM"
              className="bg-card/40 border-border focus:border-accent h-11 text-[10px] font-black uppercase tracking-widest rounded-lg"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Location</label>
            <Select onValueChange={handleCountryChange} value={formData.country} disabled={loading}>
              <SelectTrigger className="bg-card/40 border-border focus:border-accent h-11 text-[10px] font-black uppercase tracking-widest rounded-lg">
                <SelectValue placeholder="SELECT COUNTRY" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.name} value={c.name} className="text-[10px] font-bold uppercase">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone</label>
            <Input 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+0 000 0000"
              className="bg-card/40 border-border focus:border-accent h-11 text-[10px] font-black uppercase tracking-widest rounded-lg"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Age</label>
            <Input 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="25"
              className="bg-card/40 border-border focus:border-accent h-11 text-[10px] font-black uppercase tracking-widest rounded-lg"
              disabled={loading}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">The Pitch</label>
            <p className="text-[8px] text-muted-foreground uppercase font-medium tracking-widest mb-2 px-1">What are you building? Be concise.</p>
            <Textarea 
              name="idea"
              value={formData.idea}
              onChange={handleInputChange}
              placeholder="Describe your vision..."
              className="min-h-[140px] bg-card/40 border-border focus:border-accent text-[10px] font-mono leading-relaxed rounded-lg resize-none"
              disabled={loading}
            />
          </div>
        </div>

        <Button 
          onClick={handleApply} 
          disabled={loading || !formData.name || !formData.email || !formData.idea}
          className="w-full bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.3em] px-8 h-12 rounded-lg transition-all duration-150 shadow-lg shadow-accent/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <span className="flex items-center gap-2">
              Send Application
              <Send className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

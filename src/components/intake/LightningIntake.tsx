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
import { Zap, Loader2, Send } from 'lucide-react';
import { generateFounderProfile } from '@/ai/flows/founder-profile-generation';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const COUNTRIES = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'India', code: '+91' },
  { name: 'Japan', code: '+81' },
  { name: 'Brazil', code: '+55' },
  { name: 'Singapore', code: '+65' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Israel', code: '+972' },
  { name: 'Netherlands', code: '+31' },
  { name: 'Sweden', code: '+46' },
  { name: 'South Korea', code: '+82' },
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
  const setUserProfile = useStore((state) => state.setUserProfile);
  const addBuilder = useStore((state) => state.addBuilder);
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
      phone: countryData ? countryData.code + ' ' : prev.phone
    }));
  };

  const handleApply = async () => {
    if (!formData.name || !formData.email || !formData.idea) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Name, Email, and Idea are required to initialize signal." });
      return;
    }
    
    setLoading(true);
    try {
      const profile = await generateFounderProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        age: formData.age,
        idea: formData.idea
      });
      
      setUserProfile(profile);
      addBuilder(profile);

      addDoc(collection(db, 'applications'), {
        ...formData,
        role: profile.role,
        tagline: profile.tagline,
        timestamp: serverTimestamp(),
        status: 'pending'
      });
      
      toast({ 
        title: "Protocol Initialized", 
        description: `Identity verified as ${profile.name}. Your application has been logged to the Vault.`,
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
        title: "Intake Interrupted", 
        description: "The ecosystem signal was lost. Please verify your connection and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="space-y-8 border border-border p-8 glass shadow-2xl">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Ecosystem Intake
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete the protocol to initialize your identity and enter the community signals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@protocol.xyz"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Country</label>
            <Select onValueChange={handleCountryChange} value={formData.country} disabled={loading}>
              <SelectTrigger className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
            <Input 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Age</label>
            <Input 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="24"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">The Idea / Pitch</label>
            <Textarea 
              name="idea"
              value={formData.idea}
              onChange={handleInputChange}
              placeholder="What are you building? What is the vision?"
              className="min-h-[120px] bg-transparent border-border focus:border-accent text-sm rounded-lg resize-none"
              disabled={loading}
            />
          </div>
        </div>

        <Button 
          onClick={handleApply} 
          disabled={loading || !formData.name || !formData.email || !formData.idea}
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest px-8 h-12 rounded-lg transition-all duration-150 shadow-lg shadow-accent/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <span className="flex items-center gap-2">
              Send Signal
              <Send className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
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
      phone: countryData && countryData.code ? countryData.code + ' ' : prev.phone
    }));
  };

  const handleApply = async () => {
    if (!formData.name || !formData.email || !formData.idea) {
      toast({ variant: "destructive", title: "Wait!", description: "We need your Name, Email, and Idea to get started." });
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
        title: "You're in!", 
        description: `Welcome, ${profile.name}! Your pitch has been sent to our team.`,
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
        title: "Something went wrong", 
        description: "We couldn't process your application. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="space-y-8 border border-border p-8 glass shadow-2xl rounded-2xl">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Join the Network
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill this out to build your profile and start connecting with others.
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
              placeholder="john@example.com"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Country</label>
            <Select onValueChange={handleCountryChange} value={formData.country} disabled={loading}>
              <SelectTrigger className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg">
                <SelectValue placeholder="Where are you based?" />
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
              placeholder="e.g. 25"
              className="bg-transparent border-border focus:border-accent h-11 text-sm rounded-lg"
              disabled={loading}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Startup Idea</label>
            <Textarea 
              name="idea"
              value={formData.idea}
              onChange={handleInputChange}
              placeholder="What are you building? Give us your elevator pitch."
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
              Join Now
              <Send className="w-3.5 h-3.5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

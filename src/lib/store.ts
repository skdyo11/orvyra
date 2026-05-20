'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type FounderProfileGenerationOutput } from '@/ai/schemas';

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  hiddenFromSender?: boolean;
}

interface AppState {
  userProfile: FounderProfileGenerationOutput | null;
  builders: FounderProfileGenerationOutput[];
  messages: Message[];
  setUserProfile: (profile: FounderProfileGenerationOutput | null) => void;
  updateUserProfile: (updates: Partial<FounderProfileGenerationOutput>) => void;
  addBuilder: (builder: FounderProfileGenerationOutput) => void;
  setBuilders: (builders: FounderProfileGenerationOutput[]) => void;
  setMessages: (messages: Message[]) => void;
  sendMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  loginAsGuest: () => void;
}

const MOCK_BUILDERS: FounderProfileGenerationOutput[] = [
  {
    name: "Alex Rivera",
    role: "tech-founder",
    tagline: "Building a distributed GPU network for LLM inference",
    companyName: "NexusCompute",
    seekingCoFounder: true,
    seekingMentorship: false,
    ideaValidation: false,
    skills: ["Rust", "CUDA", "Distributed Systems"],
    experienceSummary: "Former infrastructure engineer at Cloudflare. 10+ years in systems programming.",
    linkedInProfileUrl: "https://linkedin.com/in/alex-rivera-mock"
  },
  {
    name: "Sarah Chen",
    role: "sales-founder",
    tagline: "Automating legal compliance for fintech startups",
    companyName: "SafeClause",
    seekingCoFounder: false,
    seekingMentorship: true,
    ideaValidation: true,
    skills: ["LLMs", "Python", "Regulatory Law"],
    experienceSummary: "Legal counsel turned engineer. Built compliance tools for Stripe's APAC expansion.",
    linkedInProfileUrl: "https://linkedin.com/in/sarah-chen-mock"
  },
  {
    name: "Marcus Thorne",
    role: "investor",
    tagline: "Seed stage investor in deep tech and infrastructure",
    companyName: "Vanguard Capital",
    seekingCoFounder: false,
    seekingMentorship: false,
    ideaValidation: false,
    skills: ["Venture Capital", "Fintech", "Cybersecurity"],
    experienceSummary: "Managing Partner at Vanguard Capital. Former VP of Product at Palantir.",
    linkedInProfileUrl: "https://linkedin.com/in/marcus-thorne-mock"
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    from: "Alex Rivera",
    to: "You",
    content: "Hey! Saw your pitch about the AI design tool. We're looking for someone with exactly that vision for our GPU network. Want to chat?",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "m2",
    from: "Sarah Chen",
    to: "You",
    content: "Hi there! I'm Sarah from SafeClause. Your idea for a cross-border payments app is interesting. Have you considered the compliance requirements for the UAE market?",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
  },
  {
    id: "m3",
    from: "Marcus Thorne",
    to: "You",
    content: "Impressive progress on your Day 30 goals. Let's schedule a quick call next week to discuss your seed round strategy.",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
  }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: null,
      builders: MOCK_BUILDERS,
      messages: MOCK_MESSAGES,
      setUserProfile: (profile) => set({ userProfile: profile }),
      updateUserProfile: (updates) => set((state) => ({
        userProfile: state.userProfile ? { ...state.userProfile, ...updates } : null
      })),
      addBuilder: (builder) => set((state) => ({ builders: [builder, ...state.builders] })),
      setBuilders: (builders) => set({ builders }),
      setMessages: (messages) => set({ messages }),
      sendMessage: (msg) => set((state) => ({
        messages: [{ ...msg, id: Math.random().toString(36), timestamp: Date.now() }, ...state.messages]
      })),
      loginAsGuest: () => set({
        userProfile: {
          name: "Guest Founder",
          role: "visionary",
          tagline: "Building the future (Guest)",
          experienceSummary: "Exploring the network as a guest member.",
          skills: ["Ideation", "Strategy"],
          seekingCoFounder: true,
          seekingMentorship: true,
          ideaValidation: true,
          linkedInProfileUrl: ""
        }
      })
    }),
    { name: 'orvyra-storage' }
  )
);

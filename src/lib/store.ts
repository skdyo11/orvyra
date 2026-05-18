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
}

interface AppState {
  userProfile: FounderProfileGenerationOutput | null;
  builders: FounderProfileGenerationOutput[];
  messages: Message[];
  setUserProfile: (profile: FounderProfileGenerationOutput) => void;
  updateUserProfile: (updates: Partial<FounderProfileGenerationOutput>) => void;
  addBuilder: (builder: FounderProfileGenerationOutput) => void;
  sendMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
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

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: null,
      builders: MOCK_BUILDERS,
      messages: [],
      setUserProfile: (profile) => set({ userProfile: profile }),
      updateUserProfile: (updates) => set((state) => ({
        userProfile: state.userProfile ? { ...state.userProfile, ...updates } : null
      })),
      addBuilder: (builder) => set((state) => ({ builders: [builder, ...state.builders] })),
      sendMessage: (msg) => set((state) => ({
        messages: [...state.messages, { ...msg, id: Math.random().toString(36), timestamp: Date.now() }]
      })),
    }),
    { name: 'orvyra-storage' }
  )
);

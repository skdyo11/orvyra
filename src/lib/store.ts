'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FounderProfileGenerationOutput } from '@/ai/flows/founder-profile-generation';

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
  addBuilder: (builder: FounderProfileGenerationOutput) => void;
  sendMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
}

// Mock initial data
const MOCK_BUILDERS: FounderProfileGenerationOutput[] = [
  {
    name: "Alex Rivera",
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
    tagline: "Automating legal compliance for fintech startups",
    companyName: "SafeClause",
    seekingCoFounder: false,
    seekingMentorship: true,
    ideaValidation: true,
    skills: ["LLMs", "Python", "Regulatory Law"],
    experienceSummary: "Legal counsel turned engineer. Built compliance tools for Stripe's APAC expansion.",
    linkedInProfileUrl: "https://linkedin.com/in/sarah-chen-mock"
  }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: null,
      builders: MOCK_BUILDERS,
      messages: [],
      setUserProfile: (profile) => set({ userProfile: profile }),
      addBuilder: (builder) => set((state) => ({ builders: [builder, ...state.builders] })),
      sendMessage: (msg) => set((state) => ({
        messages: [...state.messages, { ...msg, id: Math.random().toString(36), timestamp: Date.now() }]
      })),
    }),
    { name: 'orvyra-storage' }
  )
);
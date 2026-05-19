'use client';

import { Navbar } from '@/components/layout/Navbar';
import { ResourceVault } from '@/components/vault/ResourceVault';

export default function VaultPage() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-3xl font-bold tracking-tighter mb-2">Startup Blueprint</h1>
        <p className="text-muted-foreground text-sm font-medium mb-12">
          Step-by-step guides to help you build and scale your company. Finish tasks to unlock new sections.
        </p>
      </div>
      <ResourceVault />
    </main>
  );
}

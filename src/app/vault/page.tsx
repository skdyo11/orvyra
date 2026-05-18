'use client';

import { Navbar } from '@/components/layout/Navbar';
import { ResourceVault } from '@/components/vault/ResourceVault';

export default function VaultPage() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-3xl font-bold tracking-tighter mb-2">Resource Vault</h1>
        <p className="text-muted-foreground text-sm font-medium mb-12">
          Systematic modules for engineering-led company building. Complete tasks to unlock advanced signals.
        </p>
      </div>
      <ResourceVault />
    </main>
  );
}
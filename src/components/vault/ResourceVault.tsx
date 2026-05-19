'use client';

import { useState } from 'react';
import { CheckSquare, Square, Terminal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Module {
  id: string;
  title: string;
  tasks: { id: string; label: string; completed: boolean }[];
}

const VAULT_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Setup & Basics',
    tasks: [
      { id: 't1', label: 'Define your target audience', completed: true },
      { id: 't2', label: 'Set up your code repo with linting', completed: true },
      { id: 't3', label: 'Create basic tests for your core features', completed: false },
    ]
  },
  {
    id: 'm2',
    title: 'Talking to Users',
    tasks: [
      { id: 't4', label: 'Interview 10 potential customers', completed: false },
      { id: 't5', label: 'Look for patterns in your interview notes', completed: false },
      { id: 't6', label: 'Check if users would actually pay for this', completed: false },
    ]
  },
  {
    id: 'm3',
    title: 'Building MVP',
    tasks: [
      { id: 't7', label: 'Decide on the MUST-HAVE features for v1', completed: false },
      { id: 't8', label: 'Run a 2-day sprint to ship a feature', completed: false },
      { id: 't9', label: 'Add basic analytics to see how users use it', completed: false },
    ]
  }
];

export function ResourceVault() {
  const [modules, setModules] = useState(VAULT_MODULES);

  const toggleTask = (mId: string, tId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id !== mId) return m;
      return {
        ...m,
        tasks: m.tasks.map(t => t.id === tId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const totalTasks = modules.reduce((acc, m) => acc + m.tasks.length, 0);
  const completedTasks = modules.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0);
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tighter flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent" />
            Action Plans
          </h2>
          <span className="text-[10px] font-mono text-muted-foreground">{completedTasks}/{totalTasks} DONE</span>
        </div>
        <Progress value={progress} className="h-1 bg-border rounded-none" />
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <div key={m.id} className="border border-border p-6 glass space-y-6 rounded-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-4">{m.title}</h3>
            <ul className="space-y-4">
              {m.tasks.map((t) => (
                <li 
                  key={t.id} 
                  className="flex items-start gap-3 group cursor-pointer"
                  onClick={() => toggleTask(m.id, t.id)}
                >
                  {t.completed ? (
                    <CheckSquare className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-accent" />
                  )}
                  <span className={`text-xs leading-relaxed ${t.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

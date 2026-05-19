
'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FileText, Clock, User, ShieldAlert, Mail, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Just now';
    try {
      return format(new Date(ts), 'MMM d, HH:mm');
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <main className="min-h-screen pt-16 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-32">
        <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
              Admin Portal
              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-lg font-mono tracking-normal normal-case">
                {applications.length} Entries
              </span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">Reviewing Startup Applications</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse font-mono uppercase text-xs">
            Fetching Applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="border border-border p-20 text-center glass rounded-2xl">
            <ShieldAlert className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">No applications found</h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">Real-time database is empty.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {applications.map((app) => (
              <div key={app.id} className="glass p-8 space-y-6 hover:border-accent/40 transition-all group rounded-2xl border-border/40">
                <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-border pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center rounded-lg shrink-0">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">{app.name}</h3>
                        {app.status === 'accepted' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        <span className="text-accent">{app.role?.replace('-', ' ') || 'Founder'}</span>
                        <span>//</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(app.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-accent" />
                      {app.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-accent" />
                      {app.phone || 'NO PHONE'}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-accent" />
                      {app.country || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-accent" />
                      AGE: {app.age || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/5 border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">The Pitch Content</span>
                    </div>
                    <p className="text-xs font-mono leading-relaxed text-foreground/80 italic">
                      "{app.idea || app.content || 'No description provided.'}"
                    </p>
                  </div>
                  
                  {app.tagline && (
                    <div className="px-1 text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
                      AI GENERATED TAGLINE: <span className="text-foreground">{app.tagline}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

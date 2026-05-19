'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LectureTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to tomorrow at 6 PM (example next lecture time)
    const target = new Date();
    target.setDate(target.getDate() + 1);
    target.setHours(18, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const h = Math.floor((difference / (1000 * 60 * 60)));
      const m = Math.floor((difference / (1000 * 60)) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mb-12">
      <div className="glass p-6 md:p-10 border-accent/20 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
        
        <div className="space-y-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase font-black tracking-[0.2em] text-accent rounded-lg">
                <Zap className="w-3 h-3" />
                Live Session
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
                Next Lecture: <br />
                <span className="text-accent">Scale or Fail</span>
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  Tomorrow
                </span>
                <span>//</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  6:00 PM
                </span>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-center">
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <span className="text-2xl font-black text-accent/50 mb-6">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <span className="text-2xl font-black text-accent/50 mb-6">:</span>
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button 
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.2em] text-xs h-14 px-10 rounded-xl shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 group/btn"
            >
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 group-hover/btn:animate-pulse" />
                <span>Join Live Lecture</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-background/50 border border-border flex items-center justify-center rounded-xl">
        <span className="text-2xl md:text-3xl font-black tracking-tighter font-mono">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

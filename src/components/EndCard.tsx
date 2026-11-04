/**
 * End-of-sequence overlay for Monster Energy Ultra White.
 * Retains frame 158, provides replay action, and invites visitor into the full story below.
 */

import React from 'react';
import { RotateCcw, Sparkles, ChevronDown } from 'lucide-react';

interface EndCardProps {
  progress: number;
  onReplay: () => void;
  onExploreStory: () => void;
}

export const EndCard: React.FC<EndCardProps> = ({ progress, onReplay, onExploreStory }) => {
  // Fade in at the final scroll stretch (0.88 to 1.0)
  const threshold = 0.88;
  if (progress < threshold) {
    return null;
  }

  const normalized = (progress - threshold) / (1 - threshold);
  const opacity = Math.min(1, Math.max(0, normalized * 1.2));

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-14 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top spacer */}
      <div className="h-16" />

      {/* Climactic Product Callout */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pointer-events-auto">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
            <Sparkles size={12} />
            <span>UNLEASH THE ULTRA BEAST</span>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-8xl tracking-tight text-gradient-silver uppercase">
            ULTRA WHITE
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-xs sm:text-sm font-medium text-[#BFC7CD]/80 tracking-widest uppercase">
            <span>ZERO SUGAR</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>LIGHT CITRUS</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>FULL LOAD OF MONSTER ENERGY</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onReplay}
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 bg-[#111820]/80 hover:bg-[#111820] hover:border-[#BDEEFF]/50 text-xs font-bold tracking-[0.2em] text-[#F5F7F8] uppercase backdrop-blur-md transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer active:scale-95"
          >
            <RotateCcw size={14} className="text-[#BDEEFF]" />
            <span>REPLAY ANIMATION</span>
          </button>

          <button
            onClick={onExploreStory}
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#F5F7F8] hover:bg-[#BDEEFF] text-[#050608] text-xs font-black tracking-[0.2em] uppercase transition-all shadow-[0_10px_30px_rgba(189,238,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>EXPLORE THE STORY</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Bottom prompt to scroll down */}
      <div className="w-full text-center pb-4 text-[11px] text-[#BFC7CD]/60 uppercase tracking-widest pointer-events-auto flex flex-col items-center gap-1">
        <span>SCROLL DOWN TO DIVE INTO THE ORIGIN & PERFORMANCE SCIENCE</span>
        <ChevronDown size={14} className="text-[#BDEEFF] animate-bounce" />
      </div>
    </div>
  );
};

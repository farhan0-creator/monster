/**
 * Initial Hero Typography for Monster Energy Ultra White.
 * Smoothly transitions out as scroll begins (0.00 to ~0.18 progress).
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroTypographyProps {
  progress: number;
  onScrollClick: () => void;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ progress, onScrollClick }) => {
  // Compute smooth opacity and translation based on scroll progress [0, 0.20]
  const fadeStart = 0.02;
  const fadeEnd = 0.16;

  let opacity = 1;
  let translateY = 0;

  if (progress > fadeStart) {
    const rawProgress = (progress - fadeStart) / (fadeEnd - fadeStart);
    const clamped = Math.max(0, Math.min(1, rawProgress));
    opacity = 1 - clamped;
    translateY = -clamped * 32;
  }

  const isHidden = opacity <= 0.01;

  return (
    <div
      aria-hidden={isHidden}
      className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-14 transition-opacity duration-75"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        willChange: 'opacity, transform',
      }}
    >
      {/* Top Spacer to clear Navbar */}
      <div className="h-16 md:h-20" />

      {/* Main Hero Header Block */}
      <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Kicker */}
        <p className="font-display text-sm md:text-base font-bold tracking-[0.3em] uppercase text-[#BFC7CD]/80 mb-3 select-none">
          MONSTER ENERGY PRESENTS
        </p>

        {/* Huge Condensed Title */}
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-9xl lg:text-[10.5rem] leading-[0.88] tracking-tight uppercase select-none">
          <span className="sr-only">Monster Energy Ultra White: </span>
          <span className="block text-gradient-silver drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            THE
          </span>
          <span className="block text-gradient-ice drop-shadow-[0_4px_30px_rgba(189,238,255,0.25)]">
            WHITEOUT.
          </span>
        </h1>

        {/* Supporting Tagline & GEO Niche Phrase */}
        <p className="mt-5 md:mt-7 font-body text-sm sm:text-base md:text-lg font-medium tracking-[0.2em] uppercase text-[#F5F7F8]/90 max-w-xl text-center select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          ULTRA WHITE. UNLEASH THE ATMOSPHERE.
        </p>
        <p className="mt-2 font-body text-xs sm:text-sm text-[#BFC7CD]/85 max-w-lg text-center select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Zero-sugar light citrus performance energy drink with a full 160mg Monster Energy Blend and 10 calories per 16 fl oz can.
        </p>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex flex-col items-center justify-end pb-4 select-none">
        <button
          onClick={onScrollClick}
          type="button"
          tabIndex={isHidden ? -1 : 0}
          className={`${
            isHidden ? 'pointer-events-none' : 'pointer-events-auto'
          } flex flex-col items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BFC7CD]/75 hover:text-[#BDEEFF] transition-colors cursor-pointer group`}
          aria-label="Scroll to experience"
        >
          <span>SCROLL TO EXPERIENCE</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-[#111820]/40 backdrop-blur-sm group-hover:border-[#BDEEFF]/50 group-hover:bg-[#111820]/80 transition-all animate-bounce">
            <ChevronDown size={16} className="text-[#BDEEFF]" />
          </div>
        </button>
      </div>
    </div>
  );
};

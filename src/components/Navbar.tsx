/**
 * Minimalist transparent navbar following domain constitution:
 * Left: MONSTER ENERGY
 * Middle: 5 single-line nav links
 * Right: Audio toggle + Find Ultra White CTA
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  onToggleAudio: () => void;
  progress: number;
  onOpenStoreFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleAudio,
  progress,
  onOpenStoreFinder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-6 md:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-[#050608]/90 via-[#050608]/60 to-transparent backdrop-blur-[2px] transition-all duration-300">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#whiteout"
          className="font-display text-2xl md:text-3xl font-black tracking-widest text-[#F5F7F8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] select-none hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0"
        >
          MONSTER ENERGY
        </a>
      </div>

      {/* Zone 2: 5 Clean Single-Line Nav Links */}
      <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-widest text-[#BFC7CD]/80 uppercase">
        <a href="#whiteout" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          The Whiteout
        </a>
        <a href="#origin" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          The Origin
        </a>
        <a href="#anatomy" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          Anatomy
        </a>
        <a href="#blend" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          Energy Blend
        </a>
        <a href="#sensory" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          Flavor Notes
        </a>
        <a href="#specs" className="hover:text-[#BDEEFF] transition-colors whitespace-nowrap shrink-0">
          Nutrition Facts
        </a>
      </nav>

      {/* Zone 3: Actions (Audio Toggle + Primary CTA) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Subtle Ambient Audio Toggle */}
        <button
          onClick={onToggleAudio}
          type="button"
          aria-label={isMuted ? 'Enable atmosphere audio' : 'Mute atmosphere audio'}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-[#111820]/70 backdrop-blur-md text-[#BFC7CD] hover:text-[#F5F7F8] hover:border-white/25 transition-colors cursor-pointer"
          title={isMuted ? 'Atmosphere Sound Off' : 'Atmosphere Sound On'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#BDEEFF]" />}
        </button>

        {/* Primary CTA: Find Ultra White */}
        <button
          onClick={onOpenStoreFinder}
          type="button"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5F7F8] hover:bg-[#BDEEFF] text-[#050608] font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_4px_15px_rgba(189,238,255,0.2)] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ShoppingBag size={13} />
          <span>FIND ULTRA WHITE</span>
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="xl:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-[#111820]/70 text-[#BFC7CD] hover:text-white cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#111820]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 text-sm font-semibold tracking-widest uppercase text-[#BFC7CD] shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <a
            href="#whiteout"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            The Whiteout Animation
          </a>
          <a
            href="#origin"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            01. The Origin Story
          </a>
          <a
            href="#anatomy"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            02. Can Anatomy
          </a>
          <a
            href="#blend"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            03. Energy Blend Matrix
          </a>
          <a
            href="#sensory"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            04. Flavor & Sensory
          </a>
          <a
            href="#specs"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#BDEEFF] transition-colors py-1"
          >
            05. Nutrition Facts
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenStoreFinder();
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#F5F7F8] text-[#050608] font-display font-black text-sm tracking-wider uppercase"
          >
            <ShoppingBag size={14} />
            <span>LOCATE NEAR YOU</span>
          </button>
        </div>
      )}
    </header>
  );
};

/**
 * Global brand footer for Monster Energy Ultra White single-page site.
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 px-6 md:px-16 py-16 text-[#BFC7CD]/60 font-body text-xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Row: Wordmark, Nav Links, Top Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <span className="font-display font-black text-3xl tracking-widest text-[#F5F7F8] uppercase">
              MONSTER ENERGY
            </span>
            <p className="text-[11px] font-medium tracking-widest text-[#BDEEFF] uppercase mt-1">
              ULTRA WHITE · UNLEASH THE ULTRA BEAST
            </p>
          </div>

          {/* Quick jump navigation */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-wider uppercase text-[#BFC7CD] hover:text-[#F5F7F8]">
            <a href="#whiteout" className="hover:text-[#BDEEFF] transition-colors">
              The Whiteout
            </a>
            <a href="#origin" className="hover:text-[#BDEEFF] transition-colors">
              The Origin
            </a>
            <a href="#anatomy" className="hover:text-[#BDEEFF] transition-colors">
              Anatomy
            </a>
            <a href="#blend" className="hover:text-[#BDEEFF] transition-colors">
              Energy Blend
            </a>
            <a href="#sensory" className="hover:text-[#BDEEFF] transition-colors">
              Flavor Notes
            </a>
            <a href="#specs" className="hover:text-[#BDEEFF] transition-colors">
              Nutrition Facts
            </a>
          </nav>

          {/* Return to top */}
          <button
            onClick={onScrollToTop}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase text-[#F5F7F8] border border-white/10 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="text-[#BDEEFF]" />
          </button>
        </div>

        {/* Middle Row: Advisory Notice */}
        <div className="p-4 rounded-xl bg-[#0c1219] border border-white/10 text-[11px] leading-relaxed text-[#BFC7CD]/75">
          <p>
            <strong>CAFFEINE NOTICE:</strong> Contains 160mg of caffeine per 16 fl oz can. Not recommended for children, individuals sensitive to caffeine, pregnant women, or women who are nursing. Intended for healthy adults. Always consume responsibly.
          </p>
        </div>

        {/* Bottom Row: Trademarks & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#BFC7CD]/50">
          <p>
            © {new Date().getFullYear()} Monster Energy Company. All rights reserved. Monster Energy, Ultra White, Unleash the Ultra Beast, and the M-Claw logo are trademarks of Monster Energy Company.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.monsterenergy.com/en-us/privacy-policy/" target="_blank" rel="noreferrer" className="hover:text-[#F5F7F8] transition-colors">
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="https://www.monsterenergy.com/en-us/terms-of-use/" target="_blank" rel="noreferrer" className="hover:text-[#F5F7F8] transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

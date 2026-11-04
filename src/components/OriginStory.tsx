/**
 * Chapter 01: The Origin Story & Genesis of Monster Energy Ultra White
 */

import React, { useState } from 'react';
import { getFrameUrl } from '../services/frameLoader';
import { Quote, Sparkles, Flame, ShieldCheck } from 'lucide-react';

const ANGLE_PRESETS = [
  { label: 'Initial Impact', frame: 20, desc: 'Sub-zero frost emergence' },
  { label: 'Tactile Silhouette', frame: 55, desc: 'Embossed matte profile' },
  { label: 'Atmospheric Climax', frame: 110, desc: 'Full kinetic velocity' },
  { label: 'Cold Perfection', frame: 158, desc: 'Final locked state' },
];

export const OriginStory: React.FC = () => {
  const [selectedAngle, setSelectedAngle] = useState(0);

  return (
    <section id="origin" className="relative w-full py-28 px-6 md:px-16 bg-[#050608] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#BDEEFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <Sparkles size={13} />
              <span>01. THE GENESIS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              IMPOSSIBLE TO PLEASE.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#BFC7CD]/75 font-body leading-relaxed">
            Born from the relentless demand of extreme athletes for a lighter, crisper drink with zero sugar—yet completely unwilling to sacrifice the full Monster energy surge.
          </p>
        </div>

        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Famous Monster Ultra Back-of-Can Manifesto */}
            <div className="relative p-8 rounded-2xl bg-[#111820]/60 border border-white/10 backdrop-blur-md">
              <Quote className="absolute top-6 right-6 text-white/10" size={48} />
              <p className="font-body text-base md:text-lg leading-relaxed text-[#F5F7F8] italic font-light">
                &ldquo;Some people are impossible to please. As soon as they get what they thought they wanted, they always want more. Our team riders and Monster Girls are no different... they&rsquo;ve been dropping some hints lately.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-[#F5F7F8] italic font-light mt-4">
                They&rsquo;ve been asking us for a new Monster drink. A little less sweet, lighter-tasting, zero calories, but with a full load of our Monster energy blend.
              </p>
              <p className="font-display font-black text-xl md:text-2xl tracking-wider text-[#BDEEFF] uppercase mt-6 not-italic">
                White is the new black. We went all out: Monster Energy Ultra.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#BFC7CD]/60 uppercase tracking-widest">
                <span>The Monster Energy Creed</span>
                <span>Unleash The Ultra Beast</span>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10">
                <div className="font-mono tabular-nums text-3xl font-black text-[#F5F7F8]">
                  0<span className="text-sm font-sans text-[#BDEEFF] ml-1">GRAMS</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#BFC7CD] mt-1">
                  Zero Sugar
                </div>
                <p className="text-[12px] text-[#BFC7CD]/60 mt-1 leading-normal">
                  Crisp sparkling hydration without syrupy heaviness or sugar crashes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10">
                <div className="font-mono tabular-nums text-3xl font-black text-[#F5F7F8]">
                  10<span className="text-sm font-sans text-[#BDEEFF] ml-1">CAL</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#BFC7CD] mt-1">
                  Ultra Lean
                </div>
                <p className="text-[12px] text-[#BFC7CD]/60 mt-1 leading-normal">
                  Engineered for peak performance athletes maintaining dialed conditioning.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10">
                <div className="font-mono tabular-nums text-3xl font-black text-[#F5F7F8]">
                  160<span className="text-sm font-sans text-[#BDEEFF] ml-1">MG</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#BFC7CD] mt-1">
                  Full Energy Load
                </div>
                <p className="text-[12px] text-[#BFC7CD]/60 mt-1 leading-normal">
                  The legendary Monster Energy Blend of Taurine, Ginseng & B-Vitamins.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Frame Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#111820] to-[#050608] border border-white/15 p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Radial frost glow */}
              <div className="absolute inset-0 bg-radial from-[#BDEEFF]/10 via-transparent to-transparent pointer-events-none" />

              {/* Angle Label */}
              <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-[#BFC7CD]/70 z-10">
                <span>CINEMATIC ARCHIVE</span>
                <span className="font-mono tabular-nums text-[#BDEEFF]">
                  FRAME_{String(ANGLE_PRESETS[selectedAngle].frame).padStart(3, '0')}
                </span>
              </div>

              {/* Can Image Frame */}
              <div className="relative w-full flex-1 flex items-center justify-center my-2 z-10">
                <img
                  src={getFrameUrl(ANGLE_PRESETS[selectedAngle].frame)}
                  alt="Monster Ultra White 1080p Angle"
                  className="max-h-[380px] w-auto object-contain transition-all duration-300 drop-shadow-[0_15px_35px_rgba(189,238,255,0.2)]"
                  loading="lazy"
                />
              </div>

              {/* Angle Description */}
              <div className="w-full text-center z-10 mb-4">
                <p className="text-xs text-[#F5F7F8] font-medium tracking-wider uppercase">
                  {ANGLE_PRESETS[selectedAngle].desc}
                </p>
              </div>

              {/* Angle Selector Tabs */}
              <div className="w-full grid grid-cols-4 gap-1 p-1 bg-black/50 border border-white/10 rounded-lg z-10">
                {ANGLE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngle(idx)}
                    type="button"
                    className={`py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider rounded transition-all cursor-pointer ${
                      selectedAngle === idx
                        ? 'bg-white/20 text-[#F5F7F8] shadow-sm'
                        : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

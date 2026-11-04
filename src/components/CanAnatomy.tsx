/**
 * Chapter 02: Anatomy of the Iconic Monster Energy Ultra White Can
 * Interactive anatomical inspection with interactive hotspots and engineering specs.
 */

import React, { useState } from 'react';
import { getFrameUrl } from '../services/frameLoader';
import { Layers, Shield, Droplets, Zap, CheckCircle2 } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  sub: string;
  description: string;
  icon: React.ReactNode;
  specs: string[];
  yPercent: number; // For position indicator
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'tab',
    title: 'Custom Hydro-Chill Pull Tab',
    sub: 'Laser-Engraved Monster Claw',
    description:
      'Engineered from heavy-gauge silver aluminum featuring the debossed Monster M-claw emblem. Calibrated for instant pressure equalization and clean rapid pouring.',
    icon: <Zap size={16} className="text-[#BDEEFF]" />,
    specs: ['Debossed M-Claw Stamp', 'Rapid Pressure Release', '100% Recyclable Spec'],
    yPercent: 12,
  },
  {
    id: 'claw',
    title: 'Embossed Silver M-Claw',
    sub: 'Prismatic Metallic Relief',
    description:
      'The legendary three-slash Monster claw mark rendered in silver foil relief. Catches ambient light with metallic intensity against the stark white matte background.',
    icon: <Shield size={16} className="text-[#BDEEFF]" />,
    specs: ['Micro-Foil Stamping', 'Tactile Ridge Definition', 'Ultra White Signature'],
    yPercent: 38,
  },
  {
    id: 'matte',
    title: 'Textured Sub-Zero Matte Finish',
    sub: 'Frost-Etched Tactile Grip',
    description:
      'A proprietary micro-embossed textured exterior designed to prevent slipping during intense athletic performance, even when handling with winter gloves or damp palms.',
    icon: <Layers size={16} className="text-[#BDEEFF]" />,
    specs: ['Micro-Textured Coating', 'Anti-Slip Handling', 'Zero-Gloss Matte Aesthetic'],
    yPercent: 62,
  },
  {
    id: 'base',
    title: 'Aerospace-Grade Aluminum Base',
    sub: 'Rapid Cold Conduction Wall',
    description:
      'Optimized lightweight alloy sidewall engineered for lightning-fast thermal conduction, dropping to near-freezing within minutes inside ice water or sub-zero coolers.',
    icon: <Droplets size={16} className="text-[#BDEEFF]" />,
    specs: ['0.097mm Wall Gauge', 'Immediate Chill Retention', 'Infinite Recycling Loop'],
    yPercent: 88,
  },
];

export const CanAnatomy: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('matte');

  const current = HOTSPOTS.find((h) => h.id === activeHotspot) || HOTSPOTS[0];

  return (
    <section id="anatomy" className="relative w-full py-28 px-6 md:px-16 bg-[#0c1219] border-t border-white/10 overflow-hidden">
      {/* Background frost glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#BDEEFF]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <Layers size={13} />
              <span>02. PHYSICAL ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              THE TEXTURED CAN.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#BFC7CD]/75 font-body leading-relaxed">
            Every millimeter of the Ultra White can is calibrated for tactile sensation, sub-zero thermal transfer, and uncompromising durability.
          </p>
        </div>

        {/* Interactive Anatomy Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hotspot Selector Tabs */}
          <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
            {HOTSPOTS.map((hotspot) => {
              const isActive = hotspot.id === activeHotspot;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot.id)}
                  type="button"
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111820] border-[#BDEEFF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] translate-x-1'
                      : 'bg-[#050608]/60 border-white/10 hover:border-white/20 hover:bg-[#111820]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {hotspot.icon}
                      <span className="font-display font-bold text-base md:text-lg tracking-wide text-[#F5F7F8] uppercase">
                        {hotspot.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#BFC7CD]/40">
                      0{HOTSPOTS.indexOf(hotspot) + 1}
                    </span>
                  </div>
                  <p className="text-xs text-[#BFC7CD]/70 mt-1 pl-6">
                    {hotspot.sub}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Center Column: Interactive Visual Frame & Hotspot Overlay */}
          <div className="lg:col-span-4 relative flex items-center justify-center p-6 bg-[#050608] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] aspect-[9/16] flex items-center justify-center">
              {/* Can Frame */}
              <img
                src={getFrameUrl(75)}
                alt="Monster Ultra White Anatomy Can Frame"
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(189,238,255,0.25)] select-none"
              />

              {/* Interactive Target Indicator Pin */}
              <div
                className="absolute right-0 w-8 h-8 -mr-4 flex items-center justify-center transition-all duration-300"
                style={{ top: `${current.yPercent}%` }}
              >
                <div className="w-4 h-4 rounded-full bg-[#BDEEFF] animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-[#BDEEFF] border-2 border-white shadow-lg relative z-10" />
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#BDEEFF] to-transparent absolute left-3" />
              </div>
            </div>
          </div>

          {/* Right Column: Deep Technical Detail Card */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#111820] border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.6)] order-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase mb-1">
              <span>COMPONENT ARCHIVE</span>
              <span className="text-white/20">·</span>
              <span>PATENTED FORM</span>
            </div>

            <h3 className="font-display font-black text-2xl md:text-3xl text-[#F5F7F8] tracking-tight uppercase mt-1">
              {current.title}
            </h3>
            <p className="text-xs font-semibold tracking-widest text-[#BFC7CD]/75 uppercase mt-1">
              {current.sub}
            </p>

            <div className="h-[1px] bg-white/10 my-5" />

            <p className="text-sm text-[#F5F7F8]/85 leading-relaxed font-body">
              {current.description}
            </p>

            {/* Spec breakdown */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
              <span className="text-xs font-semibold tracking-widest text-[#BFC7CD]/60 uppercase block">
                TECHNICAL ATTRIBUTES
              </span>
              {current.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#F5F7F8]">
                  <CheckCircle2 size={13} className="text-[#BDEEFF] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

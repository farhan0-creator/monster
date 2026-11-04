/**
 * Chapter 04: Flavor Architecture & Sensory Profile of Monster Ultra White
 */

import React from 'react';
import { Sparkles, ThermometerSnowflake, Droplets, Wind, Gauge } from 'lucide-react';

interface SensoryMetric {
  label: string;
  score: number; // out of 10
  desc: string;
}

const SENSORY_METRICS: SensoryMetric[] = [
  { label: 'Citrus Crispness', score: 9.6, desc: 'Zesty white grapefruit and tart lime sparkle' },
  { label: 'Effervescence & Bite', score: 8.9, desc: 'Tight micro-bubbles and sparkling mouthfeel' },
  { label: 'Clean Dry Finish', score: 9.8, desc: 'Zero lingering sugar coat or sticky heaviness' },
  { label: 'Energy Surge', score: 10.0, desc: 'Full 160mg Taurine & Caffeine release' },
  { label: 'Sweetness Level', score: 2.4, desc: 'Subtle and balanced, never syrupy or cloying' },
];

export const FlavorSensory: React.FC = () => {
  return (
    <section id="sensory" className="relative w-full py-28 px-6 md:px-16 bg-[#0c1219] border-t border-white/10 overflow-hidden">
      {/* Background radial frost glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#BDEEFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <Sparkles size={13} />
              <span>04. TASTE ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              SUB-ZERO CITRUS.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#BFC7CD]/75 font-body leading-relaxed">
            Engineered to break away from dark, heavy energy syrups. A crisp, sparkling white citrus flavor profile designed to refresh instantly.
          </p>
        </div>

        {/* 3-Stage Flavor Note Continuum */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Top Notes */}
          <div className="p-8 rounded-2xl bg-[#050608] border border-white/10 relative overflow-hidden group hover:border-[#BDEEFF]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
                PHASE 01 · INITIAL SIP
              </span>
              <Droplets size={16} className="text-[#BDEEFF]" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase">
              THE CITRUS SPARK
            </h3>
            <p className="text-xs text-[#BFC7CD]/70 mt-1 uppercase tracking-wider">
              White Grapefruit · Lime Zest · Frost
            </p>
            <p className="text-sm text-[#F5F7F8]/85 leading-relaxed font-body mt-4">
              The first impression is an immediate shock of carbonated cold. Crisp white grapefruit zest and light citrus botanicals awaken the senses with bright effervescence.
            </p>
          </div>

          {/* Heart Notes */}
          <div className="p-8 rounded-2xl bg-[#050608] border border-white/10 relative overflow-hidden group hover:border-[#BDEEFF]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
                PHASE 02 · MID PALATE
              </span>
              <Wind size={16} className="text-[#BDEEFF]" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase">
              THE SUB-ZERO CHILL
            </h3>
            <p className="text-xs text-[#BFC7CD]/70 mt-1 uppercase tracking-wider">
              Velvety Effervescence · Clean Body
            </p>
            <p className="text-sm text-[#F5F7F8]/85 leading-relaxed font-body mt-4">
              Smooth, fine bubbles wash across the palate without sticky syrup residue. A lighter body that feels refreshing and thirst-quenching even during max heart-rate exertion.
            </p>
          </div>

          {/* Base Notes */}
          <div className="p-8 rounded-2xl bg-[#050608] border border-white/10 relative overflow-hidden group hover:border-[#BDEEFF]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
                PHASE 03 · THE FINISH
              </span>
              <Sparkles size={16} className="text-[#BDEEFF]" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase">
              THE CLEAN EXHALE
            </h3>
            <p className="text-xs text-[#BFC7CD]/70 mt-1 uppercase tracking-wider">
              Zero Sugar · Pure Hydration Feel
            </p>
            <p className="text-sm text-[#F5F7F8]/85 leading-relaxed font-body mt-4">
              Fades with a bone-dry, ultra-clean finish. None of the chemical aftertaste associated with conventional diet drinks. Just pure, dialed energy.
            </p>
          </div>
        </div>

        {/* Sensory Intensity Breakdown & Serving Temperature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#050608] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {/* Sensory Gauges */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase mb-2">
              <Gauge size={14} />
              <span>SENSORY INTENSITY CALIBRATION</span>
            </div>

            {SENSORY_METRICS.map((metric, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-bold text-sm text-[#F5F7F8] tracking-wider uppercase">
                    {metric.label}
                  </span>
                  <span className="font-mono tabular-nums text-xs font-bold text-[#BDEEFF]">
                    {metric.score.toFixed(1)} / 10
                  </span>
                </div>
                {/* Meter Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-white via-[#BFC7CD] to-[#BDEEFF] rounded-full transition-all duration-500"
                    style={{ width: `${metric.score * 10}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#BFC7CD]/60 font-body">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Serving Ritual / Sub-zero specs */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-xl bg-[#111820] border border-white/15 space-y-5">
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
              <ThermometerSnowflake size={16} />
              <span>THE SUB-ZERO SERVING RITUAL</span>
            </div>

            <div className="font-mono tabular-nums text-4xl sm:text-5xl font-black text-[#F5F7F8]">
              34°F – 38°F
              <span className="text-xs font-sans text-[#BDEEFF] font-semibold block mt-1">
                (1°C – 3°C OPTIMAL CHILL POINT)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#BFC7CD]/80 leading-relaxed font-body">
              Ultra White reaches its apex when chilled on crushed ice or inside a deep cold-vault. At near-freezing temperatures, the carbonic acid and citrus botanicals lock together for supreme refreshment.
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#BFC7CD]/60 uppercase tracking-widest font-mono">
              <span>Cracked at Peak Cold</span>
              <span>16 FL OZ (473 mL)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

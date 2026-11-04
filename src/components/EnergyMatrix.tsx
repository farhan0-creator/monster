/**
 * Chapter 03: The Monster Energy Blend Matrix
 * Interactive biochemical breakdown of the fuel compounds inside Ultra White.
 */

import React, { useState } from 'react';
import { Zap, Activity, Brain, BatteryCharging, Heart, ShieldAlert } from 'lucide-react';

interface MatrixItem {
  id: string;
  name: string;
  dosage: string;
  category: string;
  summary: string;
  mechanism: string;
  icon: React.ReactNode;
  benefits: string[];
}

const MATRIX_ITEMS: MatrixItem[] = [
  {
    id: 'caffeine',
    name: 'Precision Caffeine Anhydrous',
    dosage: '160 mg / can',
    category: 'CNS Stimulant & Alertness',
    summary:
      'Purified anhydrous caffeine calibrated to block adenosine receptors in the brain, driving rapid synaptic transmission and razor-sharp reaction times.',
    mechanism: 'Antagonizes A1 and A2A adenosine receptors, stimulating dopamine and norepinephrine release.',
    icon: <Zap className="text-[#BDEEFF]" size={20} />,
    benefits: ['Heightened reaction velocity', 'Elimination of perceptual fatigue', 'Sustained focus across high-speed sports'],
  },
  {
    id: 'taurine',
    name: 'Pure Taurine',
    dosage: '1,000 mg / can',
    category: 'Cellular Osmolyte & Neuromodulator',
    summary:
      'An essential amino sulfonic acid that supports cardiovascular function, membrane stabilization, and cellular electrolyte regulation during extreme output.',
    mechanism: 'Facilitates calcium ion transport across cardiac and skeletal muscle fibers during maximal contractions.',
    icon: <Heart className="text-[#BDEEFF]" size={20} />,
    benefits: ['Enhanced muscle contractility', 'Cellular hydration buffer', 'Blunts oxidative muscular stress'],
  },
  {
    id: 'ginseng',
    name: 'Panax Ginseng Root Extract',
    dosage: 'Standardized Extract',
    category: 'Botanical Adaptogen',
    summary:
      'Revered for millennia in Eastern wellness, Panax Ginseng contains ginsenosides that modulate cortisol response and support endurance under physical stress.',
    mechanism: 'Supports hypothalamic-pituitary-adrenal (HPA) axis balance and cellular glucose uptake.',
    icon: <Brain className="text-[#BDEEFF]" size={20} />,
    benefits: ['Physical stress resistance', 'Cognitive resilience', 'Combats mental fatigue in sub-zero conditions'],
  },
  {
    id: 'carnitine',
    name: 'L-Carnitine L-Tartrate',
    dosage: 'Bio-Available Ester',
    category: 'Mitochondrial Energy Shuttle',
    summary:
      'A naturally occurring amino acid derivative that transports long-chain fatty acids directly into cellular mitochondria to be oxidized for cellular ATP energy.',
    mechanism: 'Facilitates acyl group transfer through the inner mitochondrial membrane via carnitine palmitoyltransferase.',
    icon: <BatteryCharging className="text-[#BDEEFF]" size={20} />,
    benefits: ['Accelerates fatty acid oxidation', 'Spares glycogen reserves', 'Aids post-session muscular recovery'],
  },
  {
    id: 'b-complex',
    name: 'Synergistic B-Vitamin Complex',
    dosage: '250% Daily Value (B3, B6, B12)',
    category: 'Metabolic Co-Enzymes',
    summary:
      'A high-potency infusion of Niacinamide (B3), Pyridoxine (B6), Riboflavin (B2), and Cyanocobalamin (B12) powering the Krebs energy cycle.',
    mechanism: 'Essential cofactors for enzymatic synthesis of ATP and red blood cell oxygenation.',
    icon: <Activity className="text-[#BDEEFF]" size={20} />,
    benefits: ['100% to 250% Daily Value per can', 'Zero-sugar metabolic efficiency', 'Sustained cellular vigor without spikes'],
  },
];

export const EnergyMatrix: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('caffeine');

  const selected = MATRIX_ITEMS.find((item) => item.id === activeItem) || MATRIX_ITEMS[0];

  return (
    <section id="blend" className="relative w-full py-28 px-6 md:px-16 bg-[#050608] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-[#BDEEFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <Zap size={13} />
              <span>03. PERFORMANCE SCIENCE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              THE ENERGY BLEND.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#BFC7CD]/75 font-body leading-relaxed">
            Zero sugar does not mean zero power. Uncompromising dosages of clinical ergogenic compounds engineered for intense focus and stamina.
          </p>
        </div>

        {/* Matrix Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Compound Selection List */}
          <div className="lg:col-span-5 space-y-2.5">
            {MATRIX_ITEMS.map((item) => {
              const isActive = item.id === activeItem;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  type="button"
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#111820] border-[#BDEEFF]/50 shadow-[0_4px_20px_rgba(189,238,255,0.1)]'
                      : 'bg-[#0c1219]/80 border-white/10 hover:border-white/20 hover:bg-[#111820]/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base md:text-lg text-[#F5F7F8] tracking-wide uppercase">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#BFC7CD]/60 font-body">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-semibold text-[#BDEEFF] bg-white/5 px-2.5 py-1 rounded border border-white/10 shrink-0">
                    {item.dosage}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Deep Compound Showcase Panel */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#111820] to-[#0c1219] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#BDEEFF]/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
                  BIOACTIVE AGENT
                </span>
                <h3 className="font-display font-black text-3xl md:text-4xl text-[#F5F7F8] tracking-tight uppercase mt-0.5">
                  {selected.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#BFC7CD]/60 uppercase tracking-widest block">
                  CAN CONCENTRATION
                </span>
                <span className="font-mono tabular-nums text-lg font-bold text-[#BDEEFF]">
                  {selected.dosage}
                </span>
              </div>
            </div>

            <p className="text-base text-[#F5F7F8]/90 leading-relaxed font-body mb-6">
              {selected.summary}
            </p>

            {/* Biological mechanism */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
              <span className="text-xs font-semibold tracking-widest text-[#BFC7CD]/75 uppercase block mb-1">
                PHYSIOLOGICAL PATHWAY
              </span>
              <p className="text-xs sm:text-sm text-[#BFC7CD] font-mono leading-relaxed">
                {selected.mechanism}
              </p>
            </div>

            {/* Key benefits list */}
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase block mb-3">
                PERFORMANCE ADVANTAGES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selected.benefits.map((benefit, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#F5F7F8] leading-normal font-medium">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

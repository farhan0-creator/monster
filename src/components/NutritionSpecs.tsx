/**
 * Chapter 05: Official Nutrition Facts & Regulatory Specifications
 * Compliant tabular format with US (16 fl oz) and International (500 ml) toggles.
 */

import React, { useState } from 'react';
import { FileText, Check, AlertCircle } from 'lucide-react';

export const NutritionSpecs: React.FC = () => {
  const [unit, setUnit] = useState<'us' | 'metric'>('us');

  const isUS = unit === 'us';

  return (
    <section id="specs" className="relative w-full py-28 px-6 md:px-16 bg-[#050608] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#BDEEFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <FileText size={13} />
              <span>05. REGULATORY SPECIFICATIONS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              NUTRITION FACTS.
            </h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#111820] border border-white/15">
            <button
              onClick={() => setUnit('us')}
              type="button"
              className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-md transition-all cursor-pointer ${
                isUS
                  ? 'bg-white/20 text-[#F5F7F8] shadow-sm'
                  : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
              }`}
            >
              US Standard (16 fl oz)
            </button>
            <button
              onClick={() => setUnit('metric')}
              type="button"
              className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-md transition-all cursor-pointer ${
                !isUS
                  ? 'bg-white/20 text-[#F5F7F8] shadow-sm'
                  : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
              }`}
            >
              International (500 mL)
            </button>
          </div>
        </div>

        {/* Nutrition Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Nutrition Facts Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0c1219] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] font-body">
            {/* Header */}
            <div className="border-b-8 border-white pb-2 mb-2">
              <h3 className="font-black text-3xl sm:text-4xl tracking-tighter text-[#F5F7F8] uppercase">
                Nutrition Facts
              </h3>
              <p className="text-xs text-[#BFC7CD]/80 font-medium">
                1 serving per container
              </p>
              <div className="flex justify-between items-baseline text-sm font-bold text-[#F5F7F8] pt-1">
                <span>Serving size</span>
                <span className="font-mono tabular-nums">
                  {isUS ? '1 Can (16 fl oz / 473 mL)' : '1 Can (500 mL)'}
                </span>
              </div>
            </div>

            {/* Calories Row */}
            <div className="border-b-4 border-white py-2 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5F7F8] uppercase block">
                  Amount per serving
                </span>
                <span className="text-3xl font-black text-[#F5F7F8] tracking-tight">
                  Calories
                </span>
              </div>
              <span className="font-mono tabular-nums text-4xl sm:text-5xl font-black text-[#F5F7F8]">
                {isUS ? '10' : '11'}
              </span>
            </div>

            {/* % Daily Value Leader */}
            <div className="text-right text-[11px] font-bold text-[#BFC7CD]/80 py-1.5 border-b border-white/20">
              % Daily Value*
            </div>

            {/* Nutrients List */}
            <div className="divide-y divide-white/10 text-xs text-[#F5F7F8]">
              <div className="py-1.5 flex justify-between">
                <span>
                  <strong className="font-bold">Total Fat</strong> 0g
                </span>
                <span className="font-mono tabular-nums font-bold">0%</span>
              </div>

              <div className="py-1.5 flex justify-between">
                <span>
                  <strong className="font-bold">Sodium</strong> {isUS ? '370mg' : '390mg'}
                </span>
                <span className="font-mono tabular-nums font-bold">
                  {isUS ? '16%' : '17%'}
                </span>
              </div>

              <div className="py-1.5 flex justify-between">
                <span>
                  <strong className="font-bold">Total Carbohydrate</strong> {isUS ? '6g' : '6.5g'}
                </span>
                <span className="font-mono tabular-nums font-bold">2%</span>
              </div>

              <div className="py-1.5 pl-4 flex justify-between text-[#BFC7CD]">
                <span>Total Sugars 0g</span>
                <span className="font-mono tabular-nums font-bold">0%</span>
              </div>

              <div className="py-1.5 pl-8 flex justify-between text-[#BFC7CD]/75">
                <span>Includes 0g Added Sugars</span>
                <span className="font-mono tabular-nums font-bold">0%</span>
              </div>

              <div className="py-1.5 pl-4 flex justify-between text-[#BFC7CD]">
                <span>Erythritol {isUS ? '2g' : '2.1g'}</span>
                <span className="font-mono tabular-nums font-bold">—</span>
              </div>

              <div className="py-1.5 flex justify-between">
                <span>
                  <strong className="font-bold">Protein</strong> 0g
                </span>
                <span className="font-mono tabular-nums font-bold">0%</span>
              </div>
            </div>

            {/* Vitamins Divider */}
            <div className="border-t-8 border-white pt-2.5 mt-2 divide-y divide-white/10 text-xs text-[#F5F7F8]">
              <div className="py-1.5 flex justify-between">
                <span>Niacin (Vit. B3)</span>
                <span className="font-mono tabular-nums font-bold text-[#BDEEFF]">
                  {isUS ? '250%' : '260%'}
                </span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Vitamin B6 (Pyridoxine)</span>
                <span className="font-mono tabular-nums font-bold text-[#BDEEFF]">
                  {isUS ? '250%' : '260%'}
                </span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Vitamin B12 (Cobalamin)</span>
                <span className="font-mono tabular-nums font-bold text-[#BDEEFF]">
                  {isUS ? '250%' : '260%'}
                </span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Riboflavin (Vit. B2)</span>
                <span className="font-mono tabular-nums font-bold text-[#BDEEFF]">
                  {isUS ? '200%' : '210%'}
                </span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Pantothenic Acid (Vit. B5)</span>
                <span className="font-mono tabular-nums font-bold text-[#BDEEFF]">
                  {isUS ? '200%' : '210%'}
                </span>
              </div>
            </div>

            {/* Energy Blend Footer */}
            <div className="border-t-4 border-white pt-2 mt-2 text-[11px] text-[#BFC7CD]/80 space-y-1">
              <div className="flex justify-between font-bold text-[#F5F7F8]">
                <span>Monster Energy Blend</span>
                <span className="font-mono tabular-nums">{isUS ? '2000mg' : '2100mg'}</span>
              </div>
              <p className="text-[10px] leading-tight text-[#BFC7CD]/60 font-body">
                Taurine, Panax Ginseng Extract, L-Carnitine L-Tartrate, Caffeine, Inositol, Glucuronolactone, Guarana Extract.
              </p>
            </div>
          </div>

          {/* Right Column: Dietary Certifications & Cautionary Guidelines */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#F5F7F8] tracking-tight uppercase mb-4">
                CERTIFIED FORMULATION ATTRIBUTES
              </h3>
              <p className="text-sm text-[#BFC7CD]/80 font-body leading-relaxed mb-6">
                Engineered with pharmaceutical-grade consistency and verified through rigorous analytical testing across international sports governing protocols.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10 flex items-start gap-3">
                  <Check size={18} className="text-[#BDEEFF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#F5F7F8] uppercase">Zero Sugar & Keto Friendly</h4>
                    <p className="text-xs text-[#BFC7CD]/60 mt-1">
                      Does not trigger glycemic insulin response or kick athletes out of ketosis.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10 flex items-start gap-3">
                  <Check size={18} className="text-[#BDEEFF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#F5F7F8] uppercase">Gluten-Free & Vegan Spec</h4>
                    <p className="text-xs text-[#BFC7CD]/60 mt-1">
                      Formulated without gluten, wheat, dairy, animal derivatives, or allergens.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10 flex items-start gap-3">
                  <Check size={18} className="text-[#BDEEFF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#F5F7F8] uppercase">Kosher Certified</h4>
                    <p className="text-xs text-[#BFC7CD]/60 mt-1">
                      Certified Kosher (OU) under rabbinical oversight and production standards.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0c1219] border border-white/10 flex items-start gap-3">
                  <Check size={18} className="text-[#BDEEFF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#F5F7F8] uppercase">100% Recyclable Aluminum</h4>
                    <p className="text-xs text-[#BFC7CD]/60 mt-1">
                      Infinite recycling lifecycle that consumes 95% less energy than virgin metal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Caution Advisory Notice */}
            <div className="p-6 rounded-2xl bg-[#111820]/90 border border-white/15 flex items-start gap-4">
              <AlertCircle size={22} className="text-[#BDEEFF] shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-base text-[#F5F7F8] tracking-wide uppercase">
                  CONSUMER RESPONSIBILITY ADVISORY
                </h4>
                <p className="text-xs text-[#BFC7CD]/80 leading-relaxed font-body">
                  Contains <strong className="text-white">160mg of total caffeine per 16 fl oz can</strong> (comparable to approx. 1.5 cups of premium drip coffee). Not recommended for children, pregnant or nursing women, or individuals sensitive to caffeine. Consume responsibly. Limit intake to reasonable daily amounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

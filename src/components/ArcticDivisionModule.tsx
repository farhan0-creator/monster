/**
 * Interactive Sub-Zero Field Division Module
 * Allows visitors to switch athlete divisions and terrain conditions
 * to inspect calibrated Intensity & Endurance rings, chill targets, and hydration timing.
 */

import React, { useState } from 'react';
import { Snowflake, ThermometerSnowflake, Timer, Activity, ArrowUpRight } from 'lucide-react';

interface DivisionProfile {
  id: 'brigade' | 'sled' | 'rally';
  code: string;
  name: string;
  discipline: string;
  brief: string;
  baseIntensity: number;
  baseEndurance: number;
  preRunMinutes: number;
  rigSpec: string;
}

interface TerrainCondition {
  id: 'subzero' | 'altitude' | 'night';
  label: string;
  tempLabel: string;
  intensityDelta: number;
  enduranceDelta: number;
  hydrationNote: string;
}

const DIVISIONS: DivisionProfile[] = [
  {
    id: 'brigade',
    code: 'DIV-01',
    name: 'Winter Brigade',
    discipline: 'Superpipe & Big Air',
    brief: 'Explosive aerial rotations at peak heart rate requiring razor-sharp spatial awareness and zero glycemic crash.',
    baseIntensity: 96,
    baseEndurance: 84,
    preRunMinutes: 15,
    rigSpec: '22ft Ice Superpipe',
  },
  {
    id: 'sled',
    code: 'DIV-02',
    name: 'Arctic Sled',
    discipline: 'Backcountry Snowmobile',
    brief: 'Multi-hour deep-powder climbing demanding sustained grip strength, core stamina, and steady mitochondrial ATP output.',
    baseIntensity: 88,
    baseEndurance: 96,
    preRunMinutes: 20,
    rigSpec: '850cc Mountain Sled',
  },
  {
    id: 'rally',
    code: 'DIV-03',
    name: 'Rally Works',
    discipline: 'Nordic Ice Drift',
    brief: 'Millisecond counter-steering reflexes across studded ice tracks where mental acuity dictates every apex.',
    baseIntensity: 98,
    baseEndurance: 89,
    preRunMinutes: 12,
    rigSpec: 'AWD Studded Rally Spec',
  },
];

const CONDITIONS: TerrainCondition[] = [
  {
    id: 'subzero',
    label: 'Sub-Zero (-15°F)',
    tempLabel: '34°F Can Core',
    intensityDelta: 2,
    enduranceDelta: 0,
    hydrationNote: 'Rapid cold conduction keeps liquid crisp without ice lock.',
  },
  {
    id: 'altitude',
    label: 'High Altitude (11,000 ft)',
    tempLabel: '35°F Can Core',
    intensityDelta: -2,
    enduranceDelta: 3,
    hydrationNote: 'Zero-sugar citrus formula avoids thin-air stomach heaviness.',
  },
  {
    id: 'night',
    label: 'Night Stage (Glare Ice)',
    tempLabel: '36°F Can Core',
    intensityDelta: 1,
    enduranceDelta: 2,
    hydrationNote: '160mg caffeine & B-complex lock visual focus under floodlights.',
  },
];

interface MiniRingProps {
  label: string;
  value: number;
  accentColor: string;
}

const DivisionRing: React.FC<MiniRingProps> = ({ label, value, accentColor }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="flex items-center gap-3.5">
      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4.5"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.55s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <span className="absolute font-mono tabular-nums text-xs font-bold text-[#F5F7F8]">
          {clamped}%
        </span>
      </div>
      <div>
        <div className="text-[11px] font-semibold tracking-[0.2em] text-[#BFC7CD]/65 uppercase">
          {label}
        </div>
        <div className="font-display font-bold text-base text-[#F5F7F8] tracking-wide uppercase">
          {clamped >= 95 ? 'Maximum Peak' : clamped >= 90 ? 'Elite Output' : 'Sustained Lock'}
        </div>
      </div>
    </div>
  );
};

export const ArcticDivisionModule: React.FC = () => {
  const [selectedDivId, setSelectedDivId] = useState<DivisionProfile['id']>('brigade');
  const [selectedCondId, setSelectedCondId] = useState<TerrainCondition['id']>('subzero');

  const division = DIVISIONS.find((d) => d.id === selectedDivId) || DIVISIONS[0];
  const condition = CONDITIONS.find((c) => c.id === selectedCondId) || CONDITIONS[0];

  const intensityScore = Math.min(100, division.baseIntensity + condition.intensityDelta);
  const enduranceScore = Math.min(100, division.baseEndurance + condition.enduranceDelta);

  return (
    <div className="mb-16 p-6 sm:p-8 md:p-10 rounded-2xl bg-[#050608] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Header Row + Division Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-1">
            <Snowflake size={13} />
            <span>INTERACTIVE FIELD DIVISION</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F5F7F8] tracking-tight uppercase">
            CALIBRATE YOUR ARCTIC RUN
          </h3>
        </div>

        {/* Division Switcher Segmented Control */}
        <div
          role="tablist"
          aria-label="Arctic Division Selector"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#111820] border border-white/10 rounded-xl"
        >
          {DIVISIONS.map((div) => {
            const active = div.id === selectedDivId;
            return (
              <button
                key={div.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedDivId(div.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#F5F7F8] text-[#050608] shadow-sm'
                    : 'text-[#BFC7CD]/75 hover:text-[#F5F7F8] hover:bg-white/5'
                }`}
              >
                {div.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left: Mission Brief & Condition Controls */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#BFC7CD]/70 tracking-widest uppercase">
            <span className="font-mono text-[#BDEEFF]">{division.code}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>{division.discipline}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>{division.rigSpec}</span>
          </div>

          <p className="text-sm sm:text-base text-[#F5F7F8]/90 font-body leading-relaxed">
            {division.brief}
          </p>

          {/* Condition Calibration Selector */}
          <div>
            <span className="block text-[11px] font-semibold tracking-[0.2em] text-[#BFC7CD]/60 uppercase mb-2.5">
              SELECT TERRAIN CONDITION
            </span>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((cond) => {
                const active = cond.id === selectedCondId;
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setSelectedCondId(cond.id)}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#111820] border-[#BDEEFF]/60 text-[#BDEEFF] shadow-[0_0_20px_rgba(189,238,255,0.12)]'
                        : 'bg-[#0c1219] border-white/10 text-[#BFC7CD]/70 hover:border-white/25 hover:text-[#F5F7F8]'
                    }`}
                  >
                    {cond.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Condition Hydration Note */}
          <p className="text-xs text-[#BFC7CD]/75 font-body pt-1">
            {condition.hydrationNote}
          </p>
        </div>

        {/* Right: Dual Live Progress Rings & Telemetry */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#0c1219] border border-white/10 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DivisionRing label="Intensity" value={intensityScore} accentColor="#BDEEFF" />
            <DivisionRing label="Endurance" value={enduranceScore} accentColor="#F5F7F8" />
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#BFC7CD]/80">
            <div className="flex items-center gap-1.5">
              <ThermometerSnowflake size={14} className="text-[#BDEEFF]" />
              <span className="font-mono tabular-nums">{condition.tempLabel}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Timer size={14} className="text-[#BDEEFF]" />
              <span className="font-mono tabular-nums">-{division.preRunMinutes} min pre-run</span>
            </div>

            <a
              href="#blend"
              className="flex items-center gap-1 text-[#BDEEFF] hover:text-[#F5F7F8] font-semibold tracking-wider uppercase transition-colors"
            >
              <Activity size={13} />
              <span>Formula</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

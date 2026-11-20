/**
 * Chapter 06: The Arctic Domain & Action Sports Heritage
 * Exploring the extreme athletes and sub-zero culture fueling Ultra White.
 * Enhanced with Intersection Observer staggered entry and vertical scroll parallax.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Snowflake, Compass, Trophy, ArrowRight, Zap } from 'lucide-react';
import { ArcticDivisionModule } from './ArcticDivisionModule';

interface AthleteStory {
  sport: string;
  athlete: string;
  achievement: string;
  quote: string;
  environment: string;
  energyTip: string;
  metricLabel: 'Intensity' | 'Endurance';
  metricValue: number;
  metricSub: string;
  parallaxRate: number; // Multiplier for vertical parallax depth
}

interface FrostParticle {
  top: string;
  left: string;
  size: number;
  kind: 'star' | 'speck';
  duration: string;
  delay: string;
}

const CARD_FROST_PARTICLES: FrostParticle[][] = [
  [
    { top: '9%', left: '14%', size: 8, kind: 'star', duration: '3.4s', delay: '-0.4s' },
    { top: '18%', left: '78%', size: 4, kind: 'speck', duration: '4.6s', delay: '-1.8s' },
    { top: '29%', left: '42%', size: 6, kind: 'star', duration: '4.1s', delay: '-2.5s' },
    { top: '44%', left: '89%', size: 7, kind: 'star', duration: '3.1s', delay: '-0.9s' },
    { top: '57%', left: '11%', size: 3, kind: 'speck', duration: '5.2s', delay: '-3.1s' },
    { top: '68%', left: '66%', size: 5, kind: 'speck', duration: '4.4s', delay: '-1.2s' },
    { top: '79%', left: '26%', size: 8, kind: 'star', duration: '3.8s', delay: '-2.1s' },
    { top: '87%', left: '84%', size: 4, kind: 'speck', duration: '4.9s', delay: '-0.6s' },
  ],
  [
    { top: '12%', left: '68%', size: 7, kind: 'star', duration: '3.2s', delay: '-1.4s' },
    { top: '21%', left: '22%', size: 4, kind: 'speck', duration: '4.8s', delay: '-0.3s' },
    { top: '34%', left: '86%', size: 8, kind: 'star', duration: '3.9s', delay: '-2.7s' },
    { top: '48%', left: '16%', size: 6, kind: 'star', duration: '3.5s', delay: '-1.1s' },
    { top: '54%', left: '54%', size: 3, kind: 'speck', duration: '5.1s', delay: '-3.6s' },
    { top: '71%', left: '81%', size: 5, kind: 'speck', duration: '4.2s', delay: '-0.8s' },
    { top: '82%', left: '37%', size: 7, kind: 'star', duration: '3.6s', delay: '-2.2s' },
    { top: '90%', left: '12%', size: 4, kind: 'speck', duration: '4.7s', delay: '-1.9s' },
  ],
  [
    { top: '10%', left: '31%', size: 8, kind: 'star', duration: '3.7s', delay: '-2.0s' },
    { top: '16%', left: '85%', size: 5, kind: 'speck', duration: '4.3s', delay: '-0.7s' },
    { top: '32%', left: '14%', size: 4, kind: 'speck', duration: '5.0s', delay: '-3.4s' },
    { top: '41%', left: '72%', size: 7, kind: 'star', duration: '3.0s', delay: '-1.5s' },
    { top: '60%', left: '90%', size: 4, kind: 'speck', duration: '4.5s', delay: '-2.8s' },
    { top: '65%', left: '21%', size: 6, kind: 'star', duration: '4.0s', delay: '-0.5s' },
    { top: '80%', left: '61%', size: 8, kind: 'star', duration: '3.3s', delay: '-1.7s' },
    { top: '89%', left: '43%', size: 3, kind: 'speck', duration: '5.3s', delay: '-2.4s' },
  ],
];

const ATHLETE_STORIES: AthleteStory[] = [
  {
    sport: 'Freestyle Snowboarding',
    athlete: 'Team Monster Winter Brigade',
    achievement: '8x Winter X Games Gold Medals',
    quote: 'When you are dropping into a 22-foot frozen superpipe in -15°F windchill, you cannot afford a sugar crash or heavy stomach. Ultra White gives you pure, crisp clarity.',
    environment: 'Aspen / Laax / Mammoth Mountain',
    energyTip: 'Crack 15 minutes before superpipe finals—zero sugar prevents altitude energy dips while 160mg caffeine sharpens aerial awareness.',
    metricLabel: 'Intensity',
    metricValue: 96,
    metricSub: 'Peak Superpipe Output',
    parallaxRate: -30,
  },
  {
    sport: 'Snowmobile Freestyle & Backcountry',
    athlete: 'Arctic Sled Division',
    achievement: '100+ Foot Mountain Gap Jump Record',
    quote: 'Pulling 600-pound machines through 5 feet of backcountry powder requires all-day endurance. Ultra White is cracked right out of the snowbank.',
    environment: 'Revelstoke & Jackson Hole Powder',
    energyTip: 'Chill directly in fresh powder to hit the 34°F sweet spot—Taurine and B-vitamins sustain grip endurance across deep-snow ascents.',
    metricLabel: 'Endurance',
    metricValue: 94,
    metricSub: 'Backcountry Stamina',
    parallaxRate: 18,
  },
  {
    sport: 'Sub-Zero Rallycross & Ice Racing',
    athlete: 'Monster Rally Works',
    achievement: 'World Ice Drift & Nordic Championship',
    quote: 'Reaction times need to be measured in milliseconds on studded tires over frozen lakes. Cold, carbonated, zero-sugar energy is non-negotiable.',
    environment: 'Swedish Lapland & Frozen Arctic Lakes',
    energyTip: 'Sip between heat stages for crisp citrus refreshment without syrupy heaviness—calibrated for split-second corrections on glare ice.',
    metricLabel: 'Intensity',
    metricValue: 98,
    metricSub: 'Glare Ice Reflexes',
    parallaxRate: -42,
  },
];

export const ArcticDomain: React.FC<{ onFindRetailers: () => void }> = ({ onFindRetailers }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State to track whether each athlete card has triggered its entrance animation
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  // 1. Intersection Observer for staggered entry fade-in and slide-up
  useEffect(() => {
    // If reduced motion is requested, reveal cards immediately without transition
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setRevealed([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute('data-card-index');
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              setRevealed((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              // Stop observing once triggered
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    containerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Scroll-based vertical parallax effect
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let ticking = false;

    const updateParallax = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Only calculate when section is near or inside viewport
      if (rect.bottom >= -100 && rect.top <= windowH + 100) {
        // Normalized scroll progress across the section [-1 to 1 around center]
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const factor = Math.max(-1, Math.min(1, (progress - 0.5) * 2));

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const story = ATHLETE_STORIES[idx];
          const rate = story ? story.parallaxRate : -25;
          const translateY = Math.round(factor * rate);
          cardEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-16 bg-[#0c1219] border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#BDEEFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase mb-2">
              <Snowflake size={13} />
              <span>06. CULTURE & TERRAIN</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-gradient-silver uppercase">
              THE ARCTIC ARENA.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#BFC7CD]/75 font-body leading-relaxed">
            From the high peaks of the Winter X Games to remote snowmobile backcountry lines, Ultra White is the cold weapon of elite winter riders.
          </p>
        </div>

        {/* 3 Athlete Story Cards with Staggered Intersection Observer Fade-In & Scroll Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-8 mb-24 pt-4 pb-6">
          {ATHLETE_STORIES.map((story, i) => (
            <div
              key={i}
              ref={(el) => {
                containerRefs.current[i] = el;
              }}
              data-card-index={i}
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealed[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Inner Card: Scroll Parallax, Frost Sparkles, Grayscale-to-Color & Smooth Height Expansion on Hover */}
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                tabIndex={0}
                style={{
                  willChange: 'transform',
                  transition: 'filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                }}
                className="relative overflow-hidden min-h-[340px] p-8 rounded-2xl bg-[#050608] hover:bg-[#0c1219] focus-within:bg-[#0c1219] border border-white/10 hover:border-[#BDEEFF]/50 focus-within:border-[#BDEEFF]/50 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_rgba(189,238,255,0.18)] grayscale-[75%] hover:grayscale-0 focus-within:grayscale-0 flex flex-col justify-between group cursor-default focus:outline-none"
              >
                {/* Frosted Twinkling Particle Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 opacity-50 group-hover:opacity-95 group-focus-within:opacity-95 transition-opacity duration-300"
                >
                  {(CARD_FROST_PARTICLES[i] || CARD_FROST_PARTICLES[0]).map((particle, pIdx) => (
                    <span
                      key={pIdx}
                      className={`absolute block ${
                        particle.kind === 'star' ? 'frost-sparkle-star' : 'frost-sparkle-speck'
                      }`}
                      style={
                        {
                          top: particle.top,
                          left: particle.left,
                          width: `${particle.size}px`,
                          height: `${particle.size}px`,
                          '--sparkle-duration': particle.duration,
                          '--sparkle-delay': particle.delay,
                        } as React.CSSProperties
                      }
                    >
                      {particle.kind === 'star' ? (
                        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-[0_0_6px_rgba(189,238,255,0.9)]">
                          <path
                            d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z"
                            fill="#F5F7F8"
                          />
                        </svg>
                      ) : (
                        <span className="block w-full h-full rounded-full bg-[#BDEEFF] shadow-[0_0_8px_rgba(189,238,255,0.85)]" />
                      )}
                    </span>
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs text-[#BFC7CD]/70 group-hover:text-[#BDEEFF] group-focus-within:text-[#BDEEFF] uppercase font-semibold tracking-widest mb-4 transition-colors duration-300">
                    <span>{story.sport}</span>
                    <Trophy size={14} className="text-[#BFC7CD]/60 group-hover:text-[#BDEEFF] group-focus-within:text-[#BDEEFF] transition-colors duration-300" />
                  </div>

                  <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase mb-1">
                    {story.athlete}
                  </h3>
                  <p className="text-xs text-[#BFC7CD]/60 group-hover:text-[#BFC7CD] group-focus-within:text-[#BFC7CD] uppercase tracking-wider mb-6 transition-colors duration-300">
                    {story.achievement}
                  </p>

                  <p className="text-sm text-[#BFC7CD]/75 group-hover:text-[#F5F7F8] group-focus-within:text-[#F5F7F8] leading-relaxed font-body italic mb-6 transition-colors duration-300">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="pt-4 border-t border-white/10 group-hover:border-[#BDEEFF]/20 group-focus-within:border-[#BDEEFF]/20 flex items-center justify-between text-xs text-[#BFC7CD]/50 group-hover:text-[#BFC7CD]/80 group-focus-within:text-[#BFC7CD]/80 uppercase tracking-widest transition-colors duration-300">
                    <span className="flex items-center gap-1.5">
                      <Compass size={12} className="text-[#BFC7CD]/50 group-hover:text-[#BDEEFF] group-focus-within:text-[#BDEEFF] transition-colors duration-300" />
                      <span>{story.environment}</span>
                    </span>
                  </div>

                  {/* Smoothly Expanding Energy Tip + Progress Ring Drawer on Hover / Focus */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-[#BDEEFF]/20 space-y-4">
                        {/* Intensity / Endurance Progress Ring */}
                        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#050608]/80 border border-white/10">
                          <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90">
                              <circle
                                cx="26"
                                cy="26"
                                r="22"
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="3.5"
                              />
                              <circle
                                cx="26"
                                cy="26"
                                r="22"
                                fill="none"
                                stroke={story.metricLabel === 'Intensity' ? '#BDEEFF' : '#F5F7F8'}
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeDasharray={138.23}
                                className="card-ring-progress"
                                style={
                                  {
                                    '--ring-circumference': '138.23',
                                    '--ring-target-offset': `${(138.23 * (1 - story.metricValue / 100)).toFixed(2)}`,
                                  } as React.CSSProperties
                                }
                              />
                            </svg>
                            <span className="absolute font-mono tabular-nums text-[11px] font-bold text-[#F5F7F8]">
                              {story.metricValue}%
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold tracking-[0.2em] text-[#BDEEFF] uppercase">
                              {story.metricLabel} LEVEL
                            </div>
                            <div className="text-xs font-medium text-[#F5F7F8]/90 truncate">
                              {story.metricSub}
                            </div>
                          </div>
                        </div>

                        {/* Energy Tip */}
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#BDEEFF] uppercase mb-1.5">
                            <Zap size={12} className="text-[#BDEEFF] shrink-0" />
                            <span>ENERGY TIP</span>
                          </div>
                          <p className="text-xs text-[#F5F7F8]/85 leading-relaxed font-body">
                            {story.energyTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Small Field Division Module */}
        <ArcticDivisionModule />

        {/* Big Banner Call to Action */}
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-r from-[#111820] via-[#050608] to-[#111820] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#BDEEFF] uppercase block">
              READY FOR THE WHITEOUT?
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F5F7F8] tracking-tight uppercase">
              EXPERIENCE MONSTER ULTRA WHITE TODAY.
            </h3>
            <p className="text-sm text-[#BFC7CD]/80 font-body max-w-xl">
              Stocked nationwide in cold vaults, gas stations, supermarkets, and doorstep express delivery.
            </p>
          </div>

          <button
            onClick={onFindRetailers}
            type="button"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#F5F7F8] hover:bg-[#BDEEFF] text-[#050608] font-display font-black text-lg tracking-wider uppercase transition-all shadow-[0_10px_30px_rgba(189,238,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <span>LOCATE ULTRA WHITE</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

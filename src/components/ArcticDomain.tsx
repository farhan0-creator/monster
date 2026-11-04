/**
 * Chapter 06: The Arctic Domain & Action Sports Heritage
 * Exploring the extreme athletes and sub-zero culture fueling Ultra White.
 * Enhanced with Intersection Observer staggered entry and vertical scroll parallax.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Snowflake, Compass, Trophy, ArrowRight } from 'lucide-react';

interface AthleteStory {
  sport: string;
  athlete: string;
  achievement: string;
  quote: string;
  environment: string;
  parallaxRate: number; // Multiplier for vertical parallax depth
}

const ATHLETE_STORIES: AthleteStory[] = [
  {
    sport: 'Freestyle Snowboarding',
    athlete: 'Team Monster Winter Brigade',
    achievement: '8x Winter X Games Gold Medals',
    quote: 'When you are dropping into a 22-foot frozen superpipe in -15°F windchill, you cannot afford a sugar crash or heavy stomach. Ultra White gives you pure, crisp clarity.',
    environment: 'Aspen / Laax / Mammoth Mountain',
    parallaxRate: -30,
  },
  {
    sport: 'Snowmobile Freestyle & Backcountry',
    athlete: 'Arctic Sled Division',
    achievement: '100+ Foot Mountain Gap Jump Record',
    quote: 'Pulling 600-pound machines through 5 feet of backcountry powder requires all-day endurance. Ultra White is cracked right out of the snowbank.',
    environment: 'Revelstoke & Jackson Hole Powder',
    parallaxRate: 18,
  },
  {
    sport: 'Sub-Zero Rallycross & Ice Racing',
    athlete: 'Monster Rally Works',
    achievement: 'World Ice Drift & Nordic Championship',
    quote: 'Reaction times need to be measured in milliseconds on studded tires over frozen lakes. Cold, carbonated, zero-sugar energy is non-negotiable.',
    environment: 'Swedish Lapland & Frozen Arctic Lakes',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 pt-4 pb-6">
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
              className={`h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealed[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Inner Card: Scroll Parallax & Grayscale-to-Color Transition on Hover */}
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  willChange: 'transform',
                  transition: 'filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                }}
                className="h-full p-8 rounded-2xl bg-[#050608] hover:bg-[#0c1219] border border-white/10 hover:border-[#BDEEFF]/50 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_rgba(189,238,255,0.18)] grayscale-[75%] hover:grayscale-0 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#BFC7CD]/70 group-hover:text-[#BDEEFF] uppercase font-semibold tracking-widest mb-4 transition-colors duration-300">
                    <span>{story.sport}</span>
                    <Trophy size={14} className="text-[#BFC7CD]/60 group-hover:text-[#BDEEFF] transition-colors duration-300" />
                  </div>

                  <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase mb-1">
                    {story.athlete}
                  </h3>
                  <p className="text-xs text-[#BFC7CD]/60 group-hover:text-[#BFC7CD] uppercase tracking-wider mb-6 transition-colors duration-300">
                    {story.achievement}
                  </p>

                  <p className="text-sm text-[#BFC7CD]/75 group-hover:text-[#F5F7F8] leading-relaxed font-body italic mb-6 transition-colors duration-300">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 group-hover:border-[#BDEEFF]/20 flex items-center justify-between text-xs text-[#BFC7CD]/50 group-hover:text-[#BFC7CD]/80 uppercase tracking-widest transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    <Compass size={12} className="text-[#BFC7CD]/50 group-hover:text-[#BDEEFF] transition-colors duration-300" />
                    <span>{story.environment}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

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

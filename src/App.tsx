/**
 * Monster Energy Ultra White — The Whiteout & The Full Story
 * Master single-page cinematic scroll experience with 159-frame synchronized animation
 * and complete editorial story chapters.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CanvasPlayer } from './components/CanvasPlayer';
import { Navbar } from './components/Navbar';
import { HeroTypography } from './components/HeroTypography';
import { EndCard } from './components/EndCard';
import { SnowParticles } from './components/SnowParticles';
import { LoadingIndicator } from './components/LoadingIndicator';
import { OriginStory } from './components/OriginStory';
import { CanAnatomy } from './components/CanAnatomy';
import { EnergyMatrix } from './components/EnergyMatrix';
import { FlavorSensory } from './components/FlavorSensory';
import { NutritionSpecs } from './components/NutritionSpecs';
import { ArcticDomain } from './components/ArcticDomain';
import { Footer } from './components/Footer';
import { StoreFinderModal } from './components/StoreFinderModal';
import { useScrollProgress } from './hooks/useScrollProgress';
import { frameLoader } from './services/frameLoader';
import { ambientAudio } from './services/ambientAudio';

export default function App() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isStoreFinderOpen, setIsStoreFinderOpen] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update frame callback from scroll tracker
  const handleFrameChange = useCallback((frameIndex: number) => {
    setCurrentFrame(frameIndex);
  }, []);

  const {
    currentProgress,
    scrollToProgress,
  } = useScrollProgress({
    trackRef,
    reducedMotion,
    onFrameChange: handleFrameChange,
  });

  // Start progressive loading in background once mounted
  useEffect(() => {
    frameLoader.preloadAllProgressively();
  }, []);

  const handleScrollClick = () => {
    scrollToProgress(0.25);
  };

  const handleReplay = () => {
    scrollToProgress(0);
  };

  const handleExploreStory = () => {
    const originElement = document.getElementById('origin');
    if (originElement) {
      originElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  return (
    <main className="relative w-full bg-[#050608] text-[#F5F7F8] selection:bg-[#BDEEFF] selection:text-[#050608]">
      {/* Minimalist Fixed Top Bar Contract */}
      <Navbar
        isMuted={!isAudioActive}
        onToggleAudio={handleToggleAudio}
        progress={currentProgress}
        onOpenStoreFinder={() => setIsStoreFinderOpen(true)}
      />

      {/* SECTION 1: THE WHITEOUT CINEMATIC ANIMATION TRACK */}
      <div
        id="whiteout"
        ref={trackRef}
        className="relative w-full h-[220vh] md:h-[280vh]"
      >
        {/* Pinned 100svh Cinematic Canvas Viewport */}
        <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-[#050608] select-none">
          {/* Background Ambient Vignette & Volumetric Lighting */}
          <div className="absolute inset-0 radial-spotlight pointer-events-none z-10" />
          <div className="absolute inset-0 frost-vignette pointer-events-none z-10" />

          {/* HTML5 Canvas 159-Frame Animation Engine */}
          <CanvasPlayer
            currentFrameIndex={currentFrame}
            onFirstFrameReady={() => setInitialFrameReady(true)}
            reducedMotion={reducedMotion}
          />

          {/* Floating Snow & Ice Particles */}
          <SnowParticles reducedMotion={reducedMotion} />

          {/* Opening Hero Typography (fades smoothly on scroll) */}
          <HeroTypography
            progress={currentProgress}
            onScrollClick={handleScrollClick}
          />

          {/* Sequence Climax Card (settles on frame 158 & invites to full story) */}
          <EndCard
            progress={currentProgress}
            onReplay={handleReplay}
            onExploreStory={handleExploreStory}
          />

          {/* Discreet Timeline Scrub bar on right side */}
          <div className="hidden md:flex flex-col items-center gap-2 absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <span className="text-[9px] font-mono tracking-widest text-[#BFC7CD]/40 uppercase [writing-mode:vertical-rl] rotate-180">
              FRAME {String(currentFrame).padStart(3, '0')} / 158
            </span>
            <div
              className="w-[3px] h-32 bg-white/10 rounded-full relative overflow-hidden cursor-pointer hover:w-[5px] transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickY = e.clientY - rect.top;
                const ratio = Math.max(0, Math.min(1, clickY / rect.height));
                scrollToProgress(ratio);
              }}
              title="Click to scrub sequence"
            >
              <div
                className="w-full bg-[#BDEEFF] absolute top-0 left-0 rounded-full transition-all duration-75"
                style={{ height: `${currentProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CHAPTER 01 — THE GENESIS & ORIGIN STORY */}
      <OriginStory />

      {/* SECTION 3: CHAPTER 02 — PHYSICAL ANATOMY OF THE CAN */}
      <CanAnatomy />

      {/* SECTION 4: CHAPTER 03 — THE MONSTER ENERGY BLEND MATRIX */}
      <EnergyMatrix />

      {/* SECTION 5: CHAPTER 04 — FLAVOR ARCHITECTURE & SENSORY PROFILE */}
      <FlavorSensory />

      {/* SECTION 6: CHAPTER 05 — OFFICIAL NUTRITION SPECIFICATIONS */}
      <NutritionSpecs />

      {/* SECTION 7: CHAPTER 06 — THE ARCTIC DOMAIN & ACTION SPORTS */}
      <ArcticDomain onFindRetailers={() => setIsStoreFinderOpen(true)} />

      {/* SECTION 8: GLOBAL BRAND FOOTER */}
      <Footer onScrollToTop={handleReplay} />

      {/* Retail Store & Pack Locator Modal */}
      <StoreFinderModal
        isOpen={isStoreFinderOpen}
        onClose={() => setIsStoreFinderOpen(false)}
      />

      {/* Loading & Buffer Progress Notification */}
      <LoadingIndicator initialReady={initialFrameReady} />
    </main>
  );
}

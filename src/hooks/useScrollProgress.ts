/**
 * High-performance scroll tracking hook.
 * Directly tracks scroll progress without forcing React re-renders on every pixel.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { TOTAL_FRAMES, frameLoader } from '../services/frameLoader';

interface UseScrollProgressOptions {
  trackRef: React.RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  onFrameChange?: (frameIndex: number, progress: number) => void;
}

export function useScrollProgress({
  trackRef,
  reducedMotion,
  onFrameChange,
}: UseScrollProgressOptions) {
  const progressRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastScrollY = useRef(0);
  const directionRef = useRef<'down' | 'up'>('down');
  const velocityRef = useRef(0);

  // Discrete state only updated when passing key narrative thresholds
  const [heroTextVisible, setHeroTextVisible] = useState(true);
  const [endCardVisible, setEndCardVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (!trackRef.current) return 0;

    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Track scroll range: from top of track reaching top of viewport
    // to bottom of track reaching bottom of viewport.
    const scrollDistance = track.offsetHeight - windowHeight;
    if (scrollDistance <= 0) return 0;

    const currentScroll = -rect.top;
    const rawProgress = currentScroll / scrollDistance;
    return Math.max(0, Math.min(1, rawProgress));
  }, [trackRef]);

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      velocityRef.current = delta;

      if (delta > 0) {
        directionRef.current = 'down';
      } else if (delta < 0) {
        directionRef.current = 'up';
      }
      lastScrollY.current = currentScrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const progress = calculateProgress();
          progressRef.current = progress;

          const frame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
          );
          targetFrameRef.current = frame;

          // Update priority queue in frame loader
          frameLoader.updateTarget(frame, directionRef.current);

          // Notify canvas renderer
          if (onFrameChange) {
            onFrameChange(frame, progress);
          }

          // Narrative threshold triggers (infrequent state changes)
          const isHero = progress < 0.22;
          const isEnd = progress > 0.88;

          setHeroTextVisible((prev) => (prev !== isHero ? isHero : prev));
          setEndCardVisible((prev) => (prev !== isEnd ? isEnd : prev));
          
          // Throttled progress for discreet HUD indicators (every ~3%)
          setCurrentProgress((prev) => {
            if (Math.abs(prev - progress) > 0.02 || progress === 0 || progress === 1) {
              return progress;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateProgress, onFrameChange, reducedMotion]);

  // Programmatic jump to frame/progress
  const scrollToProgress = useCallback(
    (targetProgress: number) => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const windowHeight = window.innerHeight;
      const scrollDistance = track.offsetHeight - windowHeight;
      const targetY = track.offsetTop + targetProgress * scrollDistance;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    [trackRef]
  );

  return {
    progressRef,
    targetFrameRef,
    directionRef,
    velocityRef,
    heroTextVisible,
    endCardVisible,
    currentProgress,
    scrollToProgress,
  };
}

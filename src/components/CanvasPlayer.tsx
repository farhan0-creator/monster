/**
 * Cinematic HTML5 Canvas Player for 159-frame Monster Energy Ultra White animation.
 * Features HiDPI scaling, proportional centering, closest-frame fallback, and zero-flicker RAF loop.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { frameLoader, getFrameUrl, TOTAL_FRAMES, VERIFIED_FALLBACK_INDEX } from '../services/frameLoader';

interface CanvasPlayerProps {
  currentFrameIndex: number;
  onFirstFrameReady?: () => void;
  reducedMotion?: boolean;
}

export const CanvasPlayer: React.FC<CanvasPlayerProps> = ({
  currentFrameIndex,
  onFirstFrameReady,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastRenderedIndexRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(currentFrameIndex);
  const rafIdRef = useRef<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [initialFrameDrawn, setInitialFrameDrawn] = useState(false);

  // Keep targetFrameRef in sync with prop
  useEffect(() => {
    targetFrameRef.current = currentFrameIndex;
  }, [currentFrameIndex]);

  /**
   * Draw the image onto the canvas, centered with 'contain' aspect ratio preservation.
   */
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const renderWidth = Math.round(displayWidth * dpr);
    const renderHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
      canvas.width = renderWidth;
      canvas.height = renderHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep black background fill to eliminate gaps
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Proportional 'contain' fit
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const imgRatio = imgWidth / imgHeight;
    const screenRatio = displayWidth / displayHeight;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    // Mobile vs Desktop adjustment:
    // On mobile screens, slightly scale up contain fit (e.g. 1.08x) so the can has heroic presence
    const isMobile = displayWidth < 768;
    const scaleFactor = isMobile ? 1.08 : 1.0;

    if (screenRatio > imgRatio) {
      // Screen is wider than image
      drawH = displayHeight * scaleFactor;
      drawW = drawH * imgRatio;
    } else {
      // Screen is taller than image (mobile/portrait)
      drawW = displayWidth * scaleFactor;
      drawH = drawW / imgRatio;
    }

    drawX = (displayWidth - drawW) / 2;
    drawY = (displayHeight - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    ctx.restore();
  }, []);

  /**
   * Main RAF Loop for fluid rendering
   */
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const { image, actualIndex } = frameLoader.getClosestLoadedImage(target);

      if (image && (lastRenderedIndexRef.current !== actualIndex || !initialFrameDrawn)) {
        try {
          drawFrame(image);
          lastRenderedIndexRef.current = actualIndex;

          if (!initialFrameDrawn) {
            setInitialFrameDrawn(true);
            if (onFirstFrameReady) {
              onFirstFrameReady();
            }
          }
        } catch {
          // If canvas context error
          setHasError(true);
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, initialFrameDrawn, onFirstFrameReady]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      lastRenderedIndexRef.current = null; // Force redraw on resize
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Static Fallback for reduced motion or canvas error
  if (reducedMotion || hasError) {
    return (
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center bg-[#050608] overflow-hidden"
      >
        <img
          src={frameLoader.getClosestLoadedImage(currentFrameIndex).image?.src || getFrameUrl(VERIFIED_FALLBACK_INDEX)}
          alt="Monster Energy Ultra White Can"
          className="max-h-[85vh] max-w-[90vw] object-contain drop-shadow-[0_20px_50px_rgba(189,238,255,0.15)]"
        />
        {reducedMotion && (
          <div className="absolute bottom-16 bg-[#111820]/90 backdrop-blur-md px-4 py-2 rounded border border-white/10 text-xs text-[#BFC7CD]">
            Reduced motion mode enabled · Static Ultra White preview
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-[#050608] select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          touchAction: 'none',
        }}
      />
    </div>
  );
};

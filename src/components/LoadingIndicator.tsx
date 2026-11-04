/**
 * Subtle, luxury loading & buffer progress indicator.
 * Displays initial readiness immediately and unobtrusively reports progressive buffer.
 */

import React, { useEffect, useState } from 'react';
import { frameLoader } from '../services/frameLoader';
import { FrameLoaderState } from '../types/monster';

interface LoadingIndicatorProps {
  initialReady: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ initialReady }) => {
  const [loaderState, setLoaderState] = useState<FrameLoaderState>(frameLoader.getState());

  useEffect(() => {
    const unsubscribe = frameLoader.subscribe((state) => {
      setLoaderState(state);
    });
    return unsubscribe;
  }, []);

  // When all frames are 100% loaded, smoothly fade out
  const isFullyLoaded = loaderState.progressPercent >= 98;

  // Initial splash state before frame 0 is ready
  if (!initialReady) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050608] transition-opacity duration-500">
        <div className="flex flex-col items-center gap-4 max-w-xs text-center px-6">
          <div className="font-display font-black text-3xl md:text-4xl tracking-widest text-[#F5F7F8] animate-pulse">
            MONSTER ULTRA WHITE
          </div>
          <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
            <div className="absolute inset-y-0 left-0 bg-[#BDEEFF] w-1/3 animate-[shimmer_1.5s_infinite_ease-in-out]" />
          </div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#BFC7CD]/60 uppercase">
            CALIBRATING 1080P ASSETS...
          </p>
        </div>
      </div>
    );
  }

  // Once initial frame is ready, show discreet buffer status bar at the bottom right
  if (isFullyLoaded) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-6 z-40 pointer-events-none flex items-center gap-3 py-1.5 px-3 rounded-full bg-[#111820]/70 backdrop-blur-md border border-white/10 text-[10px] tracking-widest text-[#BFC7CD]/75 uppercase transition-opacity duration-300">
      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#BDEEFF] transition-all duration-200"
          style={{ width: `${loaderState.progressPercent}%` }}
        />
      </div>
      <span className="tabular-nums font-mono text-[#F5F7F8]">
        BUFFER {loaderState.progressPercent}%
      </span>
    </div>
  );
};

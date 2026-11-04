/**
 * Types and interfaces for Monster Energy Ultra White scroll experience
 */

export interface FrameStatus {
  index: number;
  loaded: boolean;
  loading: boolean;
  error: boolean;
}

export interface FrameLoaderState {
  totalFrames: number;
  loadedCount: number;
  initialFrameReady: boolean;
  targetFrame: number;
  currentRenderedFrame: number;
  isBuffering: boolean;
  progressPercent: number;
}

export type FrameLoadListener = (state: FrameLoaderState) => void;

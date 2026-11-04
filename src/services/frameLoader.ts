/**
 * High-performance frame loading and memory-managed cache engine
 * for Monster Energy Ultra White 159-frame sequence.
 */

import { FrameLoaderState, FrameLoadListener } from '../types/monster';

export const TOTAL_FRAMES = 159;
export const BASE_URL =
  'https://cfdrxpkuyyalxfjhmcmi.supabase.co/storage/v1/object/public/monster/Energy_drink_commercial_production_83289507_1080p-webp-frames/';

export const VERIFIED_FALLBACK_INDEX = 3; // frame_003.webp
const MAX_CONCURRENT_REQUESTS = 5;
const MAX_CACHE_SIZE = 80; // Bounded cache size to preserve memory on mobile

export function getFrameUrl(index: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const padded = String(clamped).padStart(3, '0');
  return `${BASE_URL}frame_${padded}.webp`;
}

class FrameLoaderService {
  private cache = new Map<number, HTMLImageElement>();
  private accessTimestamps = new Map<number, number>();
  private activeRequests = 0;
  private queue: number[] = [];
  private inFlight = new Set<number>();
  private failed = new Set<number>();
  private listeners = new Set<FrameLoadListener>();

  private targetIndex = 0;
  private scrollDirection: 'down' | 'up' = 'down';
  private initialReady = false;
  private isDestroyed = false;

  constructor() {
    // Initial priority: Load frame 0 first, plus verify fallback frame 3
    this.init();
  }

  private async init() {
    try {
      // 1. Immediately request frame 0
      await this.loadSingleFrame(0, true);
      this.initialReady = true;
      this.notifyListeners();
    } catch {
      // Fallback to verified frame 3 if frame 0 fails
      try {
        await this.loadSingleFrame(VERIFIED_FALLBACK_INDEX, true);
        this.initialReady = true;
        this.notifyListeners();
      } catch {
        // Log quietly
      }
    }

    // 2. Queue milestone keyframes (every 10th frame) to allow instant rough scrubbing
    const keyframes: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 10) {
      if (i !== 0) keyframes.push(i);
    }
    if (!keyframes.includes(TOTAL_FRAMES - 1)) {
      keyframes.push(TOTAL_FRAMES - 1);
    }
    this.enqueue(keyframes);

    // 3. Queue near frames around 0
    this.updateTarget(0, 'down');
  }

  public subscribe(listener: FrameLoadListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): FrameLoaderState {
    const loadedCount = this.cache.size;
    return {
      totalFrames: TOTAL_FRAMES,
      loadedCount,
      initialFrameReady: this.initialReady,
      targetFrame: this.targetIndex,
      currentRenderedFrame: this.targetIndex,
      isBuffering: this.activeRequests > 0 || this.queue.length > 0,
      progressPercent: Math.round((loadedCount / TOTAL_FRAMES) * 100),
    };
  }

  public isInitialReady(): boolean {
    return this.initialReady;
  }

  /**
   * Called on scroll to re-prioritize frame loading around the user's current view.
   */
  public updateTarget(index: number, direction: 'down' | 'up' = 'down') {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    this.targetIndex = clamped;
    this.scrollDirection = direction;

    // Prioritize a window around current target:
    // E.g. target, target + 1, target - 1, target + 2, target - 2,
    // biased in the scroll direction.
    const priorityList: number[] = [];
    const lookahead = 24;
    const lookbehind = 10;

    if (direction === 'down') {
      for (let i = 0; i <= lookahead; i++) {
        const f = clamped + i;
        if (f < TOTAL_FRAMES) priorityList.push(f);
      }
      for (let i = 1; i <= lookbehind; i++) {
        const f = clamped - i;
        if (f >= 0) priorityList.push(f);
      }
    } else {
      for (let i = 0; i <= lookahead; i++) {
        const f = clamped - i;
        if (f >= 0) priorityList.push(f);
      }
      for (let i = 1; i <= lookbehind; i++) {
        const f = clamped + i;
        if (f < TOTAL_FRAMES) priorityList.push(f);
      }
    }

    // Add priority frames to the front of queue
    this.prioritize(priorityList);
    this.processQueue();
  }

  /**
   * Retrieves image for given frame index, or finds the closest loaded frame.
   * NEVER returns null if at least one frame is loaded.
   */
  public getClosestLoadedImage(index: number): { image: HTMLImageElement | null; actualIndex: number } {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));

    // Exact match
    const exact = this.cache.get(clamped);
    if (exact) {
      this.accessTimestamps.set(clamped, Date.now());
      return { image: exact, actualIndex: clamped };
    }

    // Search outwards for closest available frame
    for (let distance = 1; distance < TOTAL_FRAMES; distance++) {
      const forward = clamped + distance;
      if (forward < TOTAL_FRAMES && this.cache.has(forward)) {
        return { image: this.cache.get(forward)!, actualIndex: forward };
      }
      const backward = clamped - distance;
      if (backward >= 0 && this.cache.has(backward)) {
        return { image: this.cache.get(backward)!, actualIndex: backward };
      }
    }

    // If frame 0 or fallback is loaded
    if (this.cache.has(0)) {
      return { image: this.cache.get(0)!, actualIndex: 0 };
    }
    if (this.cache.has(VERIFIED_FALLBACK_INDEX)) {
      return { image: this.cache.get(VERIFIED_FALLBACK_INDEX)!, actualIndex: VERIFIED_FALLBACK_INDEX };
    }

    return { image: null, actualIndex: clamped };
  }

  private prioritize(indices: number[]) {
    // Filter out already cached or currently downloading
    const needed = indices.filter(
      (idx) => !this.cache.has(idx) && !this.inFlight.has(idx) && !this.failed.has(idx)
    );

    // Remove duplicates from current queue
    const neededSet = new Set(needed);
    this.queue = this.queue.filter((idx) => !neededSet.has(idx));

    // Prepend priority items
    this.queue.unshift(...needed);
  }

  private enqueue(indices: number[]) {
    for (const idx of indices) {
      if (
        !this.cache.has(idx) &&
        !this.inFlight.has(idx) &&
        !this.failed.has(idx) &&
        !this.queue.includes(idx)
      ) {
        this.queue.push(idx);
      }
    }
    this.processQueue();
  }

  private processQueue() {
    if (this.isDestroyed) return;

    while (this.activeRequests < MAX_CONCURRENT_REQUESTS && this.queue.length > 0) {
      const nextIndex = this.queue.shift();
      if (nextIndex === undefined) break;

      if (this.cache.has(nextIndex) || this.inFlight.has(nextIndex)) {
        continue;
      }

      this.loadSingleFrame(nextIndex, false);
    }
  }

  private async loadSingleFrame(index: number, urgent: boolean): Promise<HTMLImageElement> {
    if (this.cache.has(index)) {
      return this.cache.get(index)!;
    }

    this.inFlight.add(index);
    this.activeRequests++;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = async () => {
        try {
          if ('decode' in img) {
            await img.decode();
          }
        } catch {
          // decode() failure is non-fatal; img is still renderable
        }
        resolve(img);
      };
      img.onerror = (err) => {
        reject(err);
      };
    });

    img.src = getFrameUrl(index);

    try {
      const loadedImg = await promise;
      this.cache.set(index, loadedImg);
      this.accessTimestamps.set(index, Date.now());

      if (index === 0 || index === VERIFIED_FALLBACK_INDEX) {
        this.initialReady = true;
      }

      this.enforceBoundedCache();
      this.notifyListeners();
      return loadedImg;
    } catch (err) {
      this.failed.add(index);
      throw err;
    } finally {
      this.inFlight.delete(index);
      this.activeRequests--;
      if (!urgent) {
        this.processQueue();
      }
    }
  }

  /**
   * Keeps cache bounded to prevent memory issues on mobile/retina devices.
   * Evicts the loaded frame furthest from targetIndex that is not 0 or 158.
   */
  private enforceBoundedCache() {
    if (this.cache.size <= MAX_CACHE_SIZE) return;

    let furthestFrame = -1;
    let maxDistance = -1;

    for (const frameIdx of this.cache.keys()) {
      // Preserve keyframe anchors 0 and 158
      if (frameIdx === 0 || frameIdx === TOTAL_FRAMES - 1) continue;

      const dist = Math.abs(frameIdx - this.targetIndex);
      if (dist > maxDistance) {
        maxDistance = dist;
        furthestFrame = frameIdx;
      }
    }

    if (furthestFrame !== -1 && maxDistance > 20) {
      const img = this.cache.get(furthestFrame);
      if (img) {
        img.src = ''; // Release GPU memory
      }
      this.cache.delete(furthestFrame);
      this.accessTimestamps.delete(furthestFrame);
    }
  }

  public preloadAllProgressively() {
    // Fill remaining queue in sequential order
    const remaining: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!this.cache.has(i) && !this.inFlight.has(i) && !this.queue.includes(i)) {
        remaining.push(i);
      }
    }
    this.enqueue(remaining);
  }

  public destroy() {
    this.isDestroyed = true;
    this.listeners.clear();
    this.queue = [];
    this.cache.forEach((img) => {
      img.src = '';
    });
    this.cache.clear();
  }
}

// Global singleton so canvas & overlays share the same memory cache
export const frameLoader = new FrameLoaderService();

/**
 * Interactive Retail & Pack Locator Modal for Monster Energy Ultra White
 */

import React, { useState } from 'react';
import { X, MapPin, Search, ExternalLink, Check, ShoppingBag } from 'lucide-react';

interface StoreFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Retailer {
  name: string;
  type: string;
  distance: string;
  inStock: boolean;
  packSizes: string[];
  address: string;
}

const RETAILERS: Retailer[] = [
  {
    name: '7-Eleven',
    type: 'Convenience Store',
    distance: '0.4 miles away',
    inStock: true,
    packSizes: ['Single 16 fl oz Can', '2-for-$5 Deal'],
    address: 'Chilled in cold-vault energy section',
  },
  {
    name: 'Target',
    type: 'Superstore',
    distance: '1.2 miles away',
    inStock: true,
    packSizes: ['4-Pack 16 fl oz', '12-Pack Fridge Pack'],
    address: 'Beverage Aisle & Checkout Coolers',
  },
  {
    name: 'Walmart Supercenter',
    type: 'Grocery & Retail',
    distance: '2.1 miles away',
    inStock: true,
    packSizes: ['Single Can', '4-Pack', '12-Pack Case', '24-Pack Club Pack'],
    address: 'Energy Drink Wall & Front Coolers',
  },
  {
    name: 'Circle K',
    type: 'Convenience & Gas',
    distance: '0.8 miles away',
    inStock: true,
    packSizes: ['Single 16 fl oz', 'Single 24 fl oz Mega Can'],
    address: 'Walk-in Beer Cave & Grab-and-Go',
  },
  {
    name: 'Speedway',
    type: 'Express Fuel & Drink',
    distance: '1.5 miles away',
    inStock: true,
    packSizes: ['Single 16 fl oz Can'],
    address: 'Front Counter Display & Cold Wall',
  },
  {
    name: 'Amazon Prime',
    type: 'Online Fast Delivery',
    distance: 'Same-Day / Next-Day Delivery',
    inStock: true,
    packSizes: ['15-Pack 16 fl oz', '24-Pack Case'],
    address: 'Delivered directly to your door',
  },
];

export const StoreFinderModal: React.FC<StoreFinderModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPack, setSelectedPack] = useState<'all' | 'single' | 'multipack'>('all');

  if (!isOpen) return null;

  const filteredRetailers = RETAILERS.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedPack === 'single') {
      return r.packSizes.some((p) => p.toLowerCase().includes('single'));
    }
    if (selectedPack === 'multipack') {
      return r.packSizes.some((p) => p.includes('Pack') && !p.startsWith('Single'));
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#111820] border border-white/15 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#050608]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#BDEEFF] uppercase">
              <ShoppingBag size={14} />
              <span>RETAIL LOCATOR</span>
            </div>
            <h3 className="font-display font-black text-2xl text-[#F5F7F8] tracking-tight uppercase mt-0.5">
              FIND MONSTER ULTRA WHITE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#BFC7CD] hover:text-[#F5F7F8] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-6 border-b border-white/10 bg-[#0c1219] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BFC7CD]/60"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store name or retail chain..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#111820] border border-white/15 text-sm text-[#F5F7F8] placeholder-[#BFC7CD]/40 focus:outline-none focus:border-[#BDEEFF] transition-colors"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#111820] border border-white/10 rounded-lg">
            <button
              onClick={() => setSelectedPack('all')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all cursor-pointer ${
                selectedPack === 'all'
                  ? 'bg-white/15 text-[#F5F7F8]'
                  : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setSelectedPack('single')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all cursor-pointer ${
                selectedPack === 'single'
                  ? 'bg-white/15 text-[#F5F7F8]'
                  : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
              }`}
            >
              Singles (16oz)
            </button>
            <button
              onClick={() => setSelectedPack('multipack')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all cursor-pointer ${
                selectedPack === 'multipack'
                  ? 'bg-white/15 text-[#F5F7F8]'
                  : 'text-[#BFC7CD]/60 hover:text-[#F5F7F8]'
              }`}
            >
              Multi-Packs
            </button>
          </div>
        </div>

        {/* Retailers List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 divide-y divide-white/5">
          {filteredRetailers.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#BFC7CD]/60">
              No retail locations match your query. Ultra White is stocked in almost every major grocery, gas station, and convenience cooler nationwide.
            </div>
          ) : (
            filteredRetailers.map((r, i) => (
              <div
                key={i}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-lg text-[#F5F7F8] tracking-wide">
                      {r.name}
                    </span>
                    <span className="text-[11px] text-[#BFC7CD]/60 font-body">
                      ({r.type})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#BFC7CD]/80 mt-1">
                    <MapPin size={12} className="text-[#BDEEFF]" />
                    <span>{r.distance}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-[11px] text-[#BFC7CD]/60">{r.address}</span>
                  </div>

                  {/* Pack tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-[#BFC7CD]/70">
                    <span className="text-[#BDEEFF] font-medium">Available:</span>
                    {r.packSizes.map((p, idx) => (
                      <span key={idx}>
                        {p}
                        {idx < r.packSizes.length - 1 && <span className="ml-2 text-white/20">/</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-semibold tracking-wider text-emerald-400">
                    <Check size={12} />
                    <span>IN STOCK</span>
                  </div>
                  <a
                    href="https://www.monsterenergy.com/en-us/where-to-buy/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-[#BDEEFF] hover:text-[#050608] text-xs font-semibold tracking-wide text-[#F5F7F8] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Store Directions</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-[#050608]/80 text-center text-xs text-[#BFC7CD]/60">
          Also available via Instacart, DoorDash, UberEats, and GoPuff for 30-minute doorstep delivery.
        </div>
      </div>
    </div>
  );
};

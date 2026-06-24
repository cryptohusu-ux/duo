/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Store, Heart, Shield, Sparkles, Shirt, Crown, Check, ShoppingBag } from 'lucide-react';
import { UserProgress, StoreItem } from '../types';
import { STORE_ITEMS } from '../data/lessons';
import MascotDuo from './MascotDuo';
import { soundSynth } from '../utils/audio';

interface ShopViewProps {
  progress: UserProgress;
  onPurchaseHearts: () => void;
  onPurchaseFreeze: () => void;
  onPurchaseCostume: (costumeId: string, cost: number) => void;
  onEquipCostume: (costumeId: string) => void;
}

export default function ShopView({
  progress,
  onPurchaseHearts,
  onPurchaseFreeze,
  onPurchaseCostume,
  onEquipCostume
}: ShopViewProps) {
  
  const handleBuy = (item: StoreItem) => {
    if (progress.gems < item.cost) {
      alert("You need more gems to purchase this item! Finish lessons on your path to earn more.");
      return;
    }

    if (item.type === 'hearts') {
      if (progress.hearts >= 5) {
        alert("Your hearts are already full! Keep studying, you don't need a refill right now.");
        return;
      }
      onPurchaseHearts();
      soundSynth.playPop();
    } 
    else if (item.type === 'freeze') {
      onPurchaseFreeze();
      soundSynth.playPop();
    } 
    else if (item.type === 'costume' && item.costumeId) {
      if (progress.ownedCostumes.includes(item.costumeId)) {
        // Equip
        onEquipCostume(item.costumeId);
        soundSynth.playPop();
        return;
      }
      onPurchaseCostume(item.costumeId, item.cost);
      soundSynth.playPop();
    }
  };

  const getIcon = (iconName: string, type: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <Heart className="w-8 h-8 text-rose-500 fill-rose-100" />;
      case 'Snowflake':
        return <Shield className="w-8 h-8 text-sky-400 fill-sky-50" />;
      case 'Shirt':
        return <Shirt className="w-8 h-8 text-slate-700" />;
      case 'Crown':
        return <Crown className="w-8 h-8 text-amber-500 fill-amber-100" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-yellow-500 fill-yellow-100 animate-pulse" />;
      default:
        return <ShoppingBag className="w-8 h-8 text-emerald-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 pb-24">
      {/* Gems Header Summary */}
      <div className="bg-gradient-to-r from-natural-sage to-natural-darksage text-white rounded-3xl p-6 mb-8 flex items-center justify-between shadow-md">
        <div>
          <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Duo's Boutique
          </span>
          <h2 className="text-2xl font-black mt-2 font-comfortaa">Duo's Shop</h2>
          <p className="text-xs font-bold text-natural-lightsage mt-1 max-w-xs">
            Spend your earned gems to buy status multipliers, streak shields, or custom outfits for Duo!
          </p>
        </div>
        <div className="bg-white/10 px-6 py-4 rounded-2xl flex flex-col items-center">
          <span className="text-3xl">💎</span>
          <span className="text-xl font-black mt-1 font-comfortaa">{progress.gems}</span>
          <span className="text-[10px] font-black uppercase text-sky-100 mt-0.5">My Gems</span>
        </div>
      </div>

      {/* Mascot Previews equipped costumes */}
      <div className="border border-natural-border rounded-3xl p-6 bg-natural-cream flex flex-col sm:flex-row items-center gap-6 mb-8">
        <MascotDuo state="idle" costume={progress.currentCostume} size="md" />
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider bg-natural-border text-natural-text px-2 py-0.5 rounded-full">
            Active Mascot Outfit
          </span>
          <h3 className="text-lg font-black text-natural-text font-comfortaa mt-1.5 capitalize">
            {progress.currentCostume === 'default' ? 'Classic Emerald' : `${progress.currentCostume} duo`}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Buy new costumes from the items below and click 'Equip' to see Duo teach you in style!
          </p>
          {progress.currentCostume !== 'default' && (
            <button
              onClick={() => onEquipCostume('default')}
              className="mt-3 px-3 py-1 text-xs font-bold text-natural-text border border-natural-border rounded-lg hover:bg-white bg-transparent"
            >
              Reset to Classic Green
            </button>
          )}
        </div>
      </div>

      {/* Boutique Listings */}
      <div className="flex flex-col gap-4">
        {STORE_ITEMS.map((item) => {
          const isCostume = item.type === 'costume';
          const isOwnedCostume = isCostume && item.costumeId && progress.ownedCostumes.includes(item.costumeId);
          const isEquippedCostume = isCostume && item.costumeId && progress.currentCostume === item.costumeId;
          const cantBuyHearts = item.type === 'hearts' && progress.hearts >= 5;

          return (
            <div
              key={item.id}
              className="bg-white border-2 border-natural-border hover:border-natural-sage/40 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Visual Icon Container */}
                <div className="w-14 h-14 bg-natural-cream rounded-2xl flex items-center justify-center border border-natural-border flex-shrink-0">
                  {getIcon(item.iconName, item.type)}
                </div>

                {/* Info Text */}
                <div>
                  <h4 className="font-extrabold text-natural-text text-sm md:text-md">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-1 max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Purchase Trigger Area */}
              <div className="flex-shrink-0">
                {isEquippedCostume ? (
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-natural-lightsage text-natural-sage rounded-xl text-xs font-black uppercase tracking-wider border border-natural-sage/20">
                    <Check className="w-4 h-4 text-natural-sage stroke-[3]" /> Equipped
                  </span>
                ) : isOwnedCostume ? (
                  <button
                    onClick={() => handleBuy(item)}
                    className="px-4 py-2 bg-natural-cream hover:bg-natural-lightsage text-natural-text font-black rounded-xl text-xs uppercase tracking-wider border border-natural-border transition-all active:scale-95"
                  >
                    Equip
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={cantBuyHearts || progress.gems < item.cost}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-b-4 flex items-center gap-1.5 transition-all active:translate-y-0.5 shadow-sm ${
                      cantBuyHearts
                        ? 'bg-natural-cream border-natural-border text-gray-400 cursor-not-allowed'
                        : progress.gems >= item.cost
                        ? 'bg-natural-sage border-natural-darksage hover:bg-natural-sage/95 text-white'
                        : 'bg-natural-cream border-natural-border text-gray-400'
                    }`}
                  >
                    <span>💎</span>
                    <span>{item.cost}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Flame, Shield, Globe } from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  progress: UserProgress;
  updateLanguage: (lang: 'es' | 'fr' | 'de' | 'it') => void;
  openShop: () => void;
}

export default function Header({ progress, updateLanguage, openShop }: HeaderProps) {
  // Flag indicators
  const languageNames = {
    es: { flag: '🇪🇸', label: 'Spanish' },
    fr: { flag: '🇫🇷', label: 'French' },
    de: { flag: '🇩🇪', label: 'German' },
    it: { flag: '🇮🇹', label: 'Italian' }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-white/95 backdrop-blur border-b border-natural-border shadow-sm md:px-8">
      {/* Target & Source Language Switcher */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Teaching English for:</span>
        <div className="relative group">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-natural-cream hover:bg-natural-lightsage text-natural-text font-bold rounded-xl text-sm border border-natural-border transition-all">
            <span className="text-lg">{languageNames[progress.nativeLanguage].flag}</span>
            <span className="hidden xs:inline">{languageNames[progress.nativeLanguage].label}</span>
            <Globe className="w-3.5 h-3.5 text-gray-400" />
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-1 hidden group-hover:flex flex-col bg-white border border-natural-border rounded-2xl shadow-xl w-40 overflow-hidden py-1 animate-fadeIn">
            {(Object.keys(languageNames) as Array<'es' | 'fr' | 'de' | 'it'>).map((lang) => (
              <button
                key={lang}
                onClick={() => updateLanguage(lang)}
                className={`flex items-center gap-2 px-4 py-2 text-left text-sm font-bold transition-all ${
                  progress.nativeLanguage === lang
                    ? 'bg-natural-lightsage text-natural-sage'
                    : 'text-natural-text hover:bg-natural-cream'
                }`}
              >
                <span>{languageNames[lang].flag}</span>
                <span>{languageNames[lang].label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Stats Panel */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5" title="Daily Streak">
          <Flame className="w-6 h-6 text-[#FF9600] fill-[#FF9600] animate-pulse" />
          <span className="text-sm font-extrabold text-[#FF9600] font-comfortaa">
            {progress.streak}
          </span>
        </div>

        {/* Gems Balance */}
        <button 
          onClick={openShop}
          className="flex items-center gap-1.5 hover:scale-105 transition-all" 
          title="My Gems (Click to spend in Shop)"
        >
          <span className="text-lg">💎</span>
          <span className="text-sm font-extrabold text-[#1CB0F6] font-comfortaa">
            {progress.gems}
          </span>
        </button>

        {/* Hearts Remaining */}
        <button 
          onClick={openShop}
          className="flex items-center gap-1.5 hover:scale-105 transition-all" 
          title="Hearts (Lives - Click to Refill)"
        >
          <Heart 
            className={`w-6 h-6 transition-all ${
              progress.hearts === 0 
                ? 'text-gray-300 fill-gray-100 scale-95' 
                : 'text-[#FF4B4B] fill-[#FF4B4B]'
            }`} 
          />
          <span className={`text-sm font-extrabold font-comfortaa ${
            progress.hearts <= 1 ? 'text-[#FF4B4B] animate-bounce' : 'text-[#FF4B4B]'
          }`}>
            {progress.hearts === 0 ? 'Empty' : progress.hearts}
          </span>
        </button>

        {/* Streak Freezes */}
        {progress.streakFreezeCount > 0 && (
          <div className="hidden xs:flex items-center gap-1 text-[#1CB0F6]" title="Streak Freezes Active">
            <Shield className="w-5 h-5 fill-sky-100" />
            <span className="text-xs font-extrabold">{progress.streakFreezeCount}</span>
          </div>
        )}

        {/* Level Indicator & Cumulative XP */}
        <div className="flex flex-col items-end text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</span>
          <span className="text-xs font-black text-natural-sage bg-natural-lightsage px-2 py-0.5 rounded-full">
            {progress.xp} XP
          </span>
        </div>
      </div>
    </header>
  );
}

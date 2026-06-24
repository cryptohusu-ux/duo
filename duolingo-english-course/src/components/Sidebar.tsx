/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Trophy, Store, Languages, Mic, Award, Sparkles } from 'lucide-react';
import { t, NativeLanguage } from '../utils/translations';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streak: number;
  gems: number;
  nativeLanguage: NativeLanguage;
}

export default function Sidebar({ activeTab, setActiveTab, streak, gems, nativeLanguage }: SidebarProps) {
  const navItems = [
    { id: 'learn', label: t('nav.learn', nativeLanguage), icon: BookOpen, color: 'text-natural-sage' },
    { id: 'practice', label: t('nav.speaking', nativeLanguage), icon: Mic, color: 'text-natural-brown' },
    { id: 'adventure', label: t('nav.adventure', nativeLanguage), icon: Sparkles, color: 'text-amber-500' },
    { id: 'leaderboard', label: t('nav.leaderboard', nativeLanguage), icon: Trophy, color: 'text-[#FF9600]' },
    { id: 'shop', label: t('nav.shop', nativeLanguage), icon: Store, color: 'text-[#1CB0F6]' },
    { id: 'vocabulary', label: t('nav.vocabulary', nativeLanguage), icon: Languages, color: 'text-natural-darksage' },
  ];

  return (
    <aside className="fixed bottom-0 left-0 z-40 w-full bg-white border-t border-natural-border md:relative md:w-[220px] md:h-screen md:border-r md:border-t-0 flex md:flex-col p-4 md:p-6 justify-around md:justify-start gap-6">
      {/* Brand Logo - Desktop Only */}
      <div className="hidden md:flex items-center gap-3 mb-4 px-2 py-3">
        <div className="w-10 h-10 bg-natural-sage rounded-xl flex items-center justify-center text-white font-bold text-2xl">L</div>
        <span className="font-bold text-xl tracking-tight text-natural-darksage font-comfortaa">
          duo<span className="text-natural-brown font-medium">english</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex md:flex-col gap-2.5 w-full justify-around md:justify-start">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 w-full justify-center md:justify-start ${
                isActive
                  ? 'bg-natural-lightsage text-natural-sage border-2 border-natural-sage shadow-sm font-bold'
                  : 'text-gray-500 hover:bg-gray-50 border-2 border-transparent hover:text-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.color} ${isActive ? 'scale-110' : ''}`} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mini Stats Banner - Desktop Only */}
      <div className="hidden md:flex flex-col gap-2 mt-auto p-4 bg-natural-cream border border-natural-border rounded-2xl mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-natural-text">
          <span>{t('sidebar.streak', nativeLanguage)}</span>
          <span className="flex items-center gap-1 text-[#FF9600] text-sm font-black">
            🔥 {streak} {streak === 1 ? t('sidebar.day', nativeLanguage) : t('sidebar.days', nativeLanguage)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-natural-text">
          <span>{t('sidebar.gems', nativeLanguage)}</span>
          <span className="flex items-center gap-1 text-[#1CB0F6] text-sm font-black">
            💎 {gems}
          </span>
        </div>
        <div className="mt-2 text-[10px] text-gray-400 text-center flex items-center gap-1 justify-center">
          <Award className="w-3 h-3 text-[#FF9600]" /> {t('sidebar.league', nativeLanguage)}
        </div>
      </div>
    </aside>
  );
}

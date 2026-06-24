/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, Flame, Medal, Sparkles, TrendingUp } from 'lucide-react';
import { LeaderboardUser, UserProgress } from '../types';
import { INITIAL_LEADERBOARD } from '../data/lessons';
import { t, NativeLanguage } from '../utils/translations';

interface LeaderboardViewProps {
  progress: UserProgress;
}

export default function LeaderboardView({ progress }: LeaderboardViewProps) {
  const [leagues] = useState(['Bronze', 'Silver', 'Gold', 'Obsidian', 'Diamond']);
  const [currentLeagueIdx, setCurrentLeagueIdx] = useState(2); // Start in Gold League!
  const [boardUsers, setBoardUsers] = useState<LeaderboardUser[]>([]);

  // Localized league names helper
  const localizedLeagues: Record<string, Record<NativeLanguage, string>> = {
    Bronze: { es: 'Bronce', fr: 'Bronze', de: 'Bronze', it: 'Bronzo', tr: 'Bronz', az: 'Bronz' },
    Silver: { es: 'Plata', fr: 'Argent', de: 'Silber', it: 'Argento', tr: 'Gümüş', az: 'Gümüş' },
    Gold: { es: 'Oro', fr: 'Or', de: 'Gold', it: 'Oro', tr: 'Altın', az: 'Qızıl' },
    Obsidian: { es: 'Obsidiana', fr: 'Obsidienne', de: 'Obsidian', it: 'Ossidiana', tr: 'Obsidyen', az: 'Obsidian' },
    Diamond: { es: 'Diamante', fr: 'Diamant', de: 'Diamant', it: 'Diamante', tr: 'Elmas', az: 'Almaz' }
  };

  // Prepare and update simulated competitors dynamically to create tension!
  useEffect(() => {
    // Compile board users with user at appropriate score position
    const mockCompetitors = INITIAL_LEADERBOARD.map((u, index) => {
      // Scale base scores based on selected league
      const leagueMultiplier = (currentLeagueIdx + 1) * 1.5;
      const computedXP = Math.round(parseInt(u.baseXP) * leagueMultiplier);

      return {
        id: `comp_${index}`,
        name: u.name,
        xp: computedXP,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`,
        streak: Math.round(Math.random() * 20) + 1,
        country: u.country
      };
    });

    const userProfile: LeaderboardUser = {
      id: 'current_user',
      name: t('leader.you.desc', progress.nativeLanguage),
      xp: progress.xp,
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=duoplayer',
      isUser: true,
      streak: progress.streak
    };

    // Combine and sort by score descending
    const combined = [...mockCompetitors, userProfile].sort((a, b) => b.xp - a.xp);
    setBoardUsers(combined);
  }, [progress.xp, progress.streak, currentLeagueIdx, progress.nativeLanguage]);

  const league = leagues[currentLeagueIdx];
  const localizedLeagueName = localizedLeagues[league]?.[progress.nativeLanguage] || league;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 pb-24">
      {/* League Selection Tabs */}
      <div className="flex bg-natural-border/40 p-1.5 rounded-2xl mb-8 justify-between shadow-inner">
        {leagues.map((l, idx) => (
          <button
            key={l}
            onClick={() => setCurrentLeagueIdx(idx)}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              currentLeagueIdx === idx
                ? 'bg-white text-natural-text shadow-sm border border-natural-border'
                : 'text-gray-400 hover:text-natural-text'
            }`}
          >
            {localizedLeagues[l]?.[progress.nativeLanguage] || l}
          </button>
        ))}
      </div>

      {/* Main Board Card */}
      <div className="bg-white border-2 border-natural-border rounded-3xl overflow-hidden shadow-sm">
        {/* Board Header Banner */}
        <div className="bg-gradient-to-r from-natural-brown to-natural-darkbrown p-6 text-white text-center relative">
          <div className="absolute top-4 right-4 animate-spin text-white/20">
            <Sparkles className="w-12 h-12" />
          </div>
          <Medal className="w-12 h-12 mx-auto fill-yellow-100 text-yellow-500 bg-white p-2 rounded-full shadow-md" />
          <h2 className="text-2xl font-black mt-3 font-comfortaa">
            {localizedLeagueName} {t('leader.league', progress.nativeLanguage)}
          </h2>
          <p className="text-xs font-bold text-yellow-50/90 mt-1 uppercase tracking-wider">
            {t('leader.ends', progress.nativeLanguage)}
          </p>
        </div>

        {/* Competitor Listings */}
        <div className="divide-y divide-natural-border/45 bg-white">
          {boardUsers.map((user, idx) => {
            const isTop3 = idx < 3;
            const rank = idx + 1;

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between px-6 py-4 transition-colors ${
                  user.isUser 
                    ? 'bg-natural-lightsage/75 border-y-2 border-natural-sage/20 text-natural-darksage font-extrabold' 
                    : 'hover:bg-natural-cream/50'
                }`}
              >
                {/* Left rank and avatar */}
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <span
                    className={`w-6 text-center text-sm font-black ${
                      rank === 1
                        ? 'text-yellow-500 text-lg'
                        : rank === 2
                        ? 'text-gray-400 text-md'
                        : rank === 3
                        ? 'text-amber-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </span>

                  {/* Competitor Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className={`w-10 h-10 rounded-full bg-[#FDFBF7] border-2 ${
                      user.isUser ? 'border-natural-sage' : 'border-natural-border'
                    }`}
                  />

                  {/* Name and streak */}
                  <div>
                    <span className={`text-sm ${user.isUser ? 'text-natural-darksage' : 'text-natural-text font-bold'}`}>
                      {user.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-400 mt-0.5">
                      <span>🔥 {user.streak} {user.streak === 1 ? t('sidebar.day', progress.nativeLanguage) : t('sidebar.days', progress.nativeLanguage)}</span>
                      {isTop3 && (
                        <span className="text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded font-black flex items-center gap-0.5 uppercase tracking-wide">
                          {t('leader.promotion', progress.nativeLanguage)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right cumulative XP */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-natural-text">{user.xp} XP</span>
                  <div className={`w-2 h-2 rounded-full ${isTop3 ? 'bg-amber-400 animate-ping' : 'bg-gray-200'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Bottom Message */}
      <div className="mt-6 text-center text-xs text-gray-400 font-bold flex items-center gap-2 justify-center bg-natural-cream border border-natural-border py-3 rounded-2xl">
        <TrendingUp className="w-4 h-4 text-natural-sage" />
        <span>{t('leader.motivation', progress.nativeLanguage)}</span>
      </div>
    </div>
  );
}

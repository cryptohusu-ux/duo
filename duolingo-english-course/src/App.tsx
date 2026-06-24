/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Store, Languages, Heart, Flame, RefreshCw, Star, Info, Moon, Sun, X } from 'lucide-react';
import { UserProgress, Lesson } from './types';
import { UNITS } from './data/lessons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PathView from './components/PathView';
import LessonPlayer from './components/LessonPlayer';
import LeaderboardView from './components/LeaderboardView';
import ShopView from './components/ShopView';
import VocabularyView from './components/VocabularyView';
import SpeechPractice from './components/SpeechPractice';
import MascotDuo from './components/MascotDuo';
import AdventureView from './components/AdventureView';

const LOCAL_STORAGE_KEY = 'duo_english_progress_v2';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  gems: 300, // Warm starting balance
  hearts: 5,
  streak: 1,
  lastActiveDate: new Date().toDateString(),
  completedLessons: [],
  unlockedUnits: ['unit_1'],
  ownedCostumes: ['default'],
  currentCostume: 'default',
  streakFreezeCount: 1, // Start with one protective shield!
  nativeLanguage: 'es', // Default translation is Spanish-to-English
  dailyXpGoal: 50,
  todayXp: 0
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<string>('learn');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showStreakNotice, setShowStreakNotice] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Load user progress on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        
        // Evaluate streak logic based on dates
        const todayStr = new Date().toDateString();
        const lastActiveStr = parsed.lastActiveDate;

        if (lastActiveStr && lastActiveStr !== todayStr) {
          const lastActiveDate = new Date(lastActiveStr);
          const todayDate = new Date(todayStr);
          const diffTime = Math.abs(todayDate.getTime() - lastActiveDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            // Yesterday! Streak is safe. Streak doesn't change until they complete a lesson today
          } else if (diffDays > 1) {
            // Missed a day!
            if (parsed.streakFreezeCount > 0) {
              // Streak Freeze saved them!
              parsed.streakFreezeCount -= 1;
              setNoticeMessage("Your Streak Freeze was consumed to protect your 🔥 streak!");
              setShowStreakNotice(true);
            } else {
              // Streak resets
              parsed.streak = 1;
              setNoticeMessage("You missed your practice yesterday! Your streak was reset to 1 day.");
              setShowStreakNotice(true);
            }
          }
          
          // Reset daily XP tracker on new calendar days
          parsed.todayXp = 0;
          parsed.lastActiveDate = todayStr;
        }

        setProgress(parsed);
      } else {
        // First load welcome message
        setNoticeMessage("Welcome to Duo English! Complete units, earn gems, buy costumes, and build English speaking confidence.");
        setShowStreakNotice(true);
      }
    } catch (e) {
      console.warn("Progress loading error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save progress changes helper
  const saveProgress = (updated: UserProgress) => {
    setProgress(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage saving error:", e);
    }
  };

  // Language selection change
  const handleUpdateLanguage = (lang: 'es' | 'fr' | 'de' | 'it' | 'tr' | 'az') => {
    const next = { ...progress, nativeLanguage: lang };
    saveProgress(next);
  };

  // Lesson player completes successfully
  const handleLessonFinish = (xpReward: number, gemReward: number, heartsRemaining: number) => {
    if (!activeLesson) return;

    const completed = [...progress.completedLessons];
    if (!completed.includes(activeLesson.id)) {
      completed.push(activeLesson.id);
    }

    // Unlocking units logic
    const unlockedUnits = [...progress.unlockedUnits];
    const firstUnit = UNITS[0];
    const secondUnit = UNITS[1];
    const thirdUnit = UNITS[2];
    
    // Check u1_l3 completed to unlock unit_2
    if (completed.includes('u1_l3') && !unlockedUnits.includes('unit_2')) {
      unlockedUnits.push('unit_2');
    }
    // Check u2_l2 completed to unlock unit_3
    if (completed.includes('u2_l2') && !unlockedUnits.includes('unit_3')) {
      unlockedUnits.push('unit_3');
    }
    // Check u3_l1 completed to unlock unit_4
    if (completed.includes('u3_l1') && !unlockedUnits.includes('unit_4')) {
      unlockedUnits.push('unit_4');
    }

    // Increment streak if last active day is different
    let streakCount = progress.streak;
    const todayStr = new Date().toDateString();
    if (progress.lastActiveDate !== todayStr || streakCount === 0) {
      streakCount += 1;
    }

    const nextProgress: UserProgress = {
      ...progress,
      xp: progress.xp + xpReward,
      gems: progress.gems + gemReward,
      hearts: heartsRemaining,
      streak: streakCount,
      todayXp: progress.todayXp + xpReward,
      lastActiveDate: todayStr,
      completedLessons: completed,
      unlockedUnits
    };

    saveProgress(nextProgress);
    setActiveLesson(null);
  };

  // Shop purchases
  const handlePurchaseHearts = () => {
    const next = {
      ...progress,
      gems: progress.gems - 150,
      hearts: 5
    };
    saveProgress(next);
  };

  const handlePurchaseFreeze = () => {
    const next = {
      ...progress,
      gems: progress.gems - 250,
      streakFreezeCount: progress.streakFreezeCount + 1
    };
    saveProgress(next);
  };

  const handlePurchaseCostume = (costumeId: string, cost: number) => {
    const next = {
      ...progress,
      gems: progress.gems - cost,
      ownedCostumes: [...progress.ownedCostumes, costumeId],
      currentCostume: costumeId
    };
    saveProgress(next);
  };

  const handleEquipCostume = (costumeId: string) => {
    const next = {
      ...progress,
      currentCostume: costumeId
    };
    saveProgress(next);
  };

  // Directly award gems inside practice/speaking club
  const handleAwardGems = (amount: number) => {
    const next = {
      ...progress,
      gems: progress.gems + amount
    };
    saveProgress(next);
  };

  const handleCompleteAdventure = (xpEarned: number, gemsEarned: number) => {
    const nextProgress: UserProgress = {
      ...progress,
      xp: progress.xp + xpEarned,
      gems: progress.gems + gemsEarned,
      todayXp: progress.todayXp + xpEarned,
    };
    saveProgress(nextProgress);
    setNoticeMessage(`Super Adventure! You earned +${xpEarned} XP and +${gemsEarned} Gems! 🔥 Duo is so proud of you!`);
    setShowStreakNotice(true);
    setActiveTab('learn');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-bounce">
          <svg viewBox="0 0 200 200" className="w-20 h-20">
            <rect x="20" y="20" width="160" height="160" rx="40" fill="#58CC02" />
            <ellipse cx="75" cy="100" rx="20" ry="20" fill="#FFFFFF" />
            <ellipse cx="125" cy="100" rx="20" ry="20" fill="#FFFFFF" />
            <circle cx="75" cy="100" r="8" fill="#1F2937" />
            <circle cx="125" cy="100" r="8" fill="#1F2937" />
            <polygon points="85,110 115,110 100,128" fill="#FF9600" />
          </svg>
        </div>
        <h2 className="text-xl font-black text-emerald-500 mt-4 font-comfortaa">Loading Duo English...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row text-slate-800 antialiased font-sans select-none">
      {/* Dynamic Lesson Modal Overlay */}
      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          progress={progress}
          onClose={() => setActiveLesson(null)}
          onFinish={handleLessonFinish}
          onRefillHearts={handlePurchaseHearts}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={progress.streak}
        gems={progress.gems}
        nativeLanguage={progress.nativeLanguage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header bar */}
        <Header
          progress={progress}
          updateLanguage={handleUpdateLanguage}
          openShop={() => setActiveTab('shop')}
        />

        {/* Floating notifications for achievements / streaks */}
        <AnimatePresence>
          {showStreakNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 py-4 mx-4 md:mx-8 mt-4 bg-natural-lightsage border-2 border-natural-sage/20 rounded-3xl flex items-center gap-4 relative shadow-sm"
            >
              <MascotDuo state="idle" costume={progress.currentCostume} size="sm" />
              <div className="flex-1">
                <h4 className="font-extrabold text-natural-darksage text-sm font-comfortaa">Duo says:</h4>
                <p className="text-xs text-natural-text font-bold mt-0.5">{noticeMessage}</p>
              </div>
              <button
                onClick={() => setShowStreakNotice(false)}
                className="absolute right-4 top-4 text-natural-sage hover:text-natural-darksage font-black text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Selection Content Router */}
        <main className="flex-1">
          {activeTab === 'learn' && (
            <PathView
              units={UNITS}
              progress={progress}
              onStartLesson={(lesson) => {
                if (progress.hearts <= 0) {
                  alert("You have 0 hearts left! Buy a refill in the Shop or practice vocabulary to earn gems.");
                  setActiveTab('shop');
                  return;
                }
                setActiveLesson(lesson);
              }}
            />
          )}

          {activeTab === 'practice' && (
            <SpeechPractice onAwardGems={handleAwardGems} nativeLanguage={progress.nativeLanguage} />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView progress={progress} />
          )}

          {activeTab === 'shop' && (
            <ShopView
              progress={progress}
              nativeLanguage={progress.nativeLanguage}
              onPurchaseHearts={handlePurchaseHearts}
              onPurchaseFreeze={handlePurchaseFreeze}
              onPurchaseCostume={handlePurchaseCostume}
              onEquipCostume={handleEquipCostume}
            />
          )}

          {activeTab === 'adventure' && (
            <AdventureView
              progress={progress}
              onCompleteAdventure={handleCompleteAdventure}
              onStartCustomLesson={(lesson: any) => setActiveLesson(lesson)}
            />
          )}

          {activeTab === 'vocabulary' && (
            <VocabularyView nativeLanguage={progress.nativeLanguage} />
          )}
        </main>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum QuestionType {
  CHOICE = 'CHOICE',
  TRANSLATE = 'TRANSLATE',
  LISTEN = 'LISTEN',
  SPEAK = 'SPEAK',
  MATCH = 'MATCH'
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  sentence: string; // The English sentence
  nativeTranslations: { [lang: string]: string }; // Translation for each supported native language
  audioText?: string; // Text to speak (defaults to sentence)
  options?: string[]; // Word bank options or multiple choice options
  correctAnswer: string; // For choice: index or matching correct word, For translate: full sentence or ordered word array
  pairs?: { english: string; native: { [lang: string]: string } }[]; // For matching game
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  gemReward: number;
  questions: Question[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  colorClass: string; // Tailwind bg color class
  lessons: Lesson[];
}

export interface UserProgress {
  xp: number;
  gems: number;
  hearts: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[]; // Completed lesson IDs
  unlockedUnits: string[]; // Unlocked unit IDs
  ownedCostumes: string[]; // 'default', 'tuxedo', 'cowboy', 'golden'
  currentCostume: string;
  streakFreezeCount: number;
  nativeLanguage: 'es' | 'fr' | 'de' | 'it' | 'tr' | 'az'; // es: Spanish, fr: French, de: German, it: Italian, tr: Turkish, az: Azerbaijani
  dailyXpGoal: number;
  todayXp: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  avatar: string;
  isUser?: boolean;
  streak: number;
}

export interface VocabularyWord {
  id: string;
  english: string;
  native: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  mastery: number; // 0 to 100%
  lastPracticed: string;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'hearts' | 'freeze' | 'costume';
  costumeId?: string;
  iconName: string;
}

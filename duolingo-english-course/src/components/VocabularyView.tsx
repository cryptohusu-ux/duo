/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  BookOpen, 
  Languages, 
  Sparkles, 
  Trophy, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { VOCABULARY_CATEGORIES, WordDefinition } from '../data/vocabulary';
import { speakEnglish } from '../utils/audio';
import { t, NativeLanguage } from '../utils/translations';

interface VocabularyViewProps {
  nativeLanguage: NativeLanguage;
}

export default function VocabularyView({ nativeLanguage }: VocabularyViewProps) {
  const [activeTab, setActiveTab] = useState<'glossary' | 'flashcards' | 'speedquiz'>('glossary');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('basics');
  
  // Flashcard states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Speed Quiz states
  const [quizState, setQuizState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizBestStreak, setQuizBestStreak] = useState(0);
  const [currentQuizWord, setCurrentQuizWord] = useState<WordDefinition | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const category = VOCABULARY_CATEGORIES[selectedCategoryKey] || VOCABULARY_CATEGORIES.basics;
  const words = category.words;

  // Reset indices when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (quizState === 'playing') {
      startNewQuiz();
    }
  }, [selectedCategoryKey]);

  // Handle Flashcards Next
  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 200);
  };

  const speak = (text: string) => {
    speakEnglish(text);
  };

  // Speed Quiz Logic
  const startNewQuiz = () => {
    setQuizState('playing');
    setQuizScore(0);
    setQuizQuestionIndex(0);
    setQuizStreak(0);
    setQuizBestStreak(0);
    generateQuizQuestion(0);
  };

  const generateQuizQuestion = (index: number) => {
    // Get all words in vocabulary to pick distractors
    const allWords: WordDefinition[] = [];
    Object.keys(VOCABULARY_CATEGORIES).forEach((key) => {
      allWords.push(...VOCABULARY_CATEGORIES[key].words);
    });

    const targetWord = words[index % words.length];
    setCurrentQuizWord(targetWord);
    setSelectedQuizAnswer(null);
    setQuizFeedback(null);

    // Generate options: 1 correct, 3 wrong distractors
    const correctTranslation = targetWord.native[nativeLanguage];
    const wrongDistractors = allWords
      .map((w) => w.native[nativeLanguage])
      .filter((translation) => translation !== correctTranslation);

    // Shuffle and pick 3 unique distractors
    const uniqueDistractors = Array.from(new Set(wrongDistractors))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const mergedOptions = [correctTranslation, ...uniqueDistractors].sort(() => Math.random() - 0.5);
    setQuizOptions(mergedOptions);

    // Speak word on generation
    speak(targetWord.english);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedQuizAnswer || !currentQuizWord) return;
    setSelectedQuizAnswer(option);

    const correctTranslation = currentQuizWord.native[nativeLanguage];
    if (option === correctTranslation) {
      setQuizFeedback('correct');
      setQuizScore((prev) => prev + 10);
      setQuizStreak((prev) => {
        const nextStreak = prev + 1;
        if (nextStreak > quizBestStreak) {
          setQuizBestStreak(nextStreak);
        }
        return nextStreak;
      });
    } else {
      setQuizFeedback('wrong');
      setQuizStreak(0);
    }
  };

  const handleNextQuizQuestion = () => {
    const nextIdx = quizQuestionIndex + 1;
    if (nextIdx >= 10) {
      setQuizState('finished');
    } else {
      setQuizQuestionIndex(nextIdx);
      generateQuizQuestion(nextIdx);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Category selector slider */}
      <div className="mb-6">
        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-3">
          {t('vocab.select_theme', nativeLanguage)}
        </span>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-natural-border scrollbar-track-transparent">
          {Object.keys(VOCABULARY_CATEGORIES).map((key) => {
            const cat = VOCABULARY_CATEGORIES[key];
            const isSelected = selectedCategoryKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategoryKey(key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition border-2 shrink-0 shadow-xs ${
                  isSelected
                    ? 'bg-natural-sage border-natural-sage text-white shadow-md'
                    : 'bg-white border-natural-border text-natural-text hover:bg-natural-cream'
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <div className="text-left">
                  <p className={`leading-none ${isSelected ? 'text-white' : 'text-natural-darkbrown'}`}>
                    {cat.name}
                  </p>
                  <p className={`text-[9px] font-extrabold mt-0.5 uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                    {cat.words.length} {t('vocab.words_count', nativeLanguage)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode navigation */}
      <div className="flex bg-natural-border/30 p-1 rounded-2xl mb-6 justify-between border border-natural-border/40">
        <button
          onClick={() => setActiveTab('glossary')}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'glossary'
              ? 'bg-white text-natural-text shadow-sm border border-natural-border'
              : 'text-gray-400 hover:text-natural-text'
          }`}
        >
          <BookOpen className="w-4 h-4 text-natural-sage" />
          <span>{t('vocab.glossary_tab', nativeLanguage)}</span>
        </button>
        <button
          onClick={() => {
            setIsFlipped(false);
            setActiveTab('flashcards');
          }}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'bg-white text-natural-text shadow-sm border border-natural-border'
              : 'text-gray-400 hover:text-natural-text'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-100/50" />
          <span>{t('vocab.flashcards_tab', nativeLanguage)}</span>
        </button>
        <button
          onClick={() => {
            setQuizState('idle');
            setActiveTab('speedquiz');
          }}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'speedquiz'
              ? 'bg-white text-natural-text shadow-sm border border-natural-border'
              : 'text-gray-400 hover:text-natural-text'
          }`}
        >
          <Trophy className="w-4 h-4 text-[#FF9600]" />
          <span>{t('vocab.speedquiz_tab', nativeLanguage)}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: GLOSSARY */}
        {activeTab === 'glossary' && (
          <motion.div
            key="glossary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-natural-lightsage border border-natural-sage/20 p-4 rounded-2xl">
              <h3 className="text-sm font-extrabold text-natural-darksage flex items-center gap-1.5">
                <Languages className="w-4 h-4" /> {t('vocab.comprehensive_glossary', nativeLanguage)}
              </h3>
              <p className="text-xs text-natural-text/90 font-medium mt-1">
                {t('vocab.explore_words', nativeLanguage)} <span className="font-bold">({category.name})</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((word) => (
                <div
                  key={word.english}
                  className="bg-white border-2 border-natural-border rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm hover:border-natural-sage/40 transition-all group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-base font-black text-natural-darkbrown font-comfortaa">
                        {word.english}
                      </h4>
                      <span className="text-[9px] font-extrabold text-natural-darksage bg-natural-lightsage px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {word.pos}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 mt-0.5 italic">
                      "{word.native[nativeLanguage]}"
                    </p>
                    <p className="text-xs font-semibold text-natural-text mt-2.5 bg-natural-cream p-2.5 rounded-xl border border-natural-border/60 leading-relaxed">
                      💡 <span className="font-bold text-natural-sage">{t('vocab.card.example', nativeLanguage)}:</span> "{word.ex}"
                      <span className="block text-gray-400 font-bold italic mt-1 border-t border-natural-border/40 pt-1">
                        → "{word.ext[nativeLanguage]}"
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => speak(word.english)}
                    className="p-3 bg-natural-lightsage hover:bg-natural-sage/10 text-natural-sage rounded-full transition-all group-hover:scale-110 active:scale-95 flex-shrink-0"
                    title="Hear Pronunciation"
                  >
                    <Volume2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center gap-6 py-6"
          >
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-200 px-3 py-1 rounded-full shadow-xs">
              {t('vocab.flashcards_tab', nativeLanguage)} {currentIndex + 1} / {words.length}
            </span>

            {/* Interactive Flipped Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-md aspect-[3/2] cursor-pointer perspective-1000 group relative select-none"
            >
              <div
                className={`w-full h-full duration-500 preserve-3d relative flex items-center justify-center p-8 border-2 shadow-sm rounded-3xl transition-all ${
                  isFlipped
                    ? 'bg-gradient-to-br from-natural-lightsage to-natural-cream border-natural-sage rotate-y-180'
                    : 'bg-white border-natural-border hover:border-natural-sage/55'
                }`}
              >
                {!isFlipped ? (
                  /* FRONT */
                  <div className="text-center flex flex-col items-center gap-4">
                    <span className="text-[9px] font-black text-natural-sage uppercase tracking-widest bg-natural-lightsage px-3 py-1 rounded-full border border-natural-sage/10">
                      {t('vocab.english_term', nativeLanguage)}
                    </span>
                    <h2 className="text-3xl font-black text-natural-darkbrown font-comfortaa mt-1 tracking-tight">
                      {words[currentIndex].english}
                    </h2>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mt-5">
                      {t('vocab.click_reveal', nativeLanguage)}
                    </p>
                  </div>
                ) : (
                  /* BACK */
                  <div className="text-center flex flex-col items-center gap-4 transform rotate-y-180">
                    <span className="text-[9px] font-black text-natural-brown uppercase tracking-widest bg-natural-cream px-3 py-1 rounded-full border border-natural-brown/10">
                      {t('vocab.native_translation', nativeLanguage)}
                    </span>
                    <h2 className="text-3xl font-black text-natural-brown font-comfortaa mt-1 tracking-tight">
                      {words[currentIndex].native[nativeLanguage]}
                    </h2>
                    <p className="text-xs font-bold text-gray-400 italic mt-0.5">
                      {words[currentIndex].pos}
                    </p>

                    {/* Audible Speaker icon inside card back */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Stop flipping trigger
                        speak(words[currentIndex].english);
                      }}
                      className="mt-4 p-3 bg-natural-lightsage hover:bg-natural-sage/15 text-natural-sage rounded-full transition-all hover:scale-105"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Helper hint */}
            <p className="text-[11px] text-gray-400 font-bold max-w-sm text-center leading-relaxed">
              {t('vocab.duo_says_flip', nativeLanguage)}
            </p>

            {/* Flashcard Buttons */}
            <div className="flex items-center gap-4 w-full max-w-md">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex-1 py-3.5 px-4 bg-white border-2 border-natural-border text-natural-text font-black rounded-2xl text-xs hover:bg-natural-cream transition-all shadow-xs"
              >
                {t('vocab.flip_btn', nativeLanguage)}
              </button>
              <button
                onClick={handleNextCard}
                className="flex-1 py-3.5 px-4 bg-natural-sage border-b-4 border-natural-darksage hover:bg-natural-sage/95 text-white font-black rounded-2xl text-xs transition-all shadow-sm"
              >
                {t('vocab.next_btn', nativeLanguage)}
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: SPEED QUIZ */}
        {activeTab === 'speedquiz' && (
          <motion.div
            key="speedquiz"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center gap-6 py-4"
          >
            {quizState === 'idle' && (
              <div className="text-center py-10 bg-white border-2 border-natural-border rounded-3xl p-8 max-w-lg w-full flex flex-col items-center gap-5 shadow-sm">
                <Trophy className="w-14 h-14 text-amber-500 animate-bounce" />
                <h3 className="text-xl font-black text-natural-darkbrown font-comfortaa">
                  {t('vocab.quiz.title', nativeLanguage)}
                </h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-xs">
                  {t('vocab.quiz.review', nativeLanguage)} <span className="font-black text-natural-sage">({category.name})</span>
                </p>
                <button
                  onClick={startNewQuiz}
                  className="w-full py-3.5 bg-natural-sage border-b-4 border-natural-darksage text-white font-black rounded-2xl text-xs hover:bg-natural-sage/95 transition-all shadow-md"
                >
                  {t('vocab.quiz.start', nativeLanguage)}
                </button>
              </div>
            )}

            {quizState === 'playing' && currentQuizWord && (
              <div className="w-full max-w-md flex flex-col gap-5">
                {/* Scoreboard line */}
                <div className="flex items-center justify-between border-b border-natural-border pb-3">
                  <div className="flex items-center gap-1 text-xs font-extrabold text-gray-400">
                    {t('vocab.speedquiz_tab', nativeLanguage)} {quizQuestionIndex + 1} / 10
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#FF9600] flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                      <Flame className="w-4 h-4 fill-[#FF9600]" /> {t('vocab.quiz.streak', nativeLanguage)}: {quizStreak}
                    </span>
                    <span className="text-xs font-extrabold text-natural-sage">
                      {t('vocab.quiz.score', nativeLanguage)}: {quizScore}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200">
                  <div 
                    className="bg-natural-sage h-full transition-all duration-300"
                    style={{ width: `${(quizQuestionIndex / 10) * 100}%` }}
                  />
                </div>

                {/* Active question card */}
                <div className="bg-natural-cream border-2 border-natural-border rounded-3xl p-6 text-center shadow-xs flex flex-col items-center gap-3">
                  <span className="text-[9px] font-black uppercase text-natural-sage tracking-wider bg-natural-lightsage px-3 py-1 rounded-full">
                    {t('vocab.quiz.what_is', nativeLanguage)}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-natural-darkbrown font-comfortaa">
                    {currentQuizWord.english}
                  </h2>
                  <button
                    onClick={() => speak(currentQuizWord.english)}
                    className="p-2.5 bg-white hover:bg-gray-100 text-natural-sage rounded-full shadow-xs border border-natural-border hover:scale-105 transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 gap-2.5">
                  {quizOptions.map((opt) => {
                    const isSelected = selectedQuizAnswer === opt;
                    const correctTranslation = currentQuizWord.native[nativeLanguage];
                    const isCorrectOption = selectedQuizAnswer && opt === correctTranslation;
                    const isWrongOption = isSelected && quizFeedback === 'wrong';

                    return (
                      <button
                        key={opt}
                        disabled={!!selectedQuizAnswer}
                        onClick={() => handleQuizAnswer(opt)}
                        className={`w-full p-4 rounded-2xl text-left border-2 font-extrabold text-xs transition-all flex items-center justify-between ${
                          isCorrectOption
                            ? 'bg-natural-lightsage border-natural-sage text-natural-darksage'
                            : isWrongOption
                            ? 'bg-rose-50 border-rose-500 text-rose-700'
                            : selectedQuizAnswer
                            ? 'bg-white border-natural-border text-gray-300'
                            : 'bg-white border-natural-border hover:border-natural-sage/45 hover:bg-natural-cream text-natural-text'
                        }`}
                      >
                        <span>{opt}</span>
                        {isCorrectOption && <CheckCircle2 className="w-4 h-4 text-natural-sage" />}
                        {isWrongOption && <XCircle className="w-4 h-4 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback bottom drawer */}
                <AnimatePresence>
                  {selectedQuizAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl p-4 border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                        quizFeedback === 'correct'
                          ? 'bg-natural-lightsage/50 border-natural-sage/35 text-natural-darksage'
                          : 'bg-rose-50 border-rose-100 text-rose-800'
                      }`}
                    >
                      <div className="text-center sm:text-left">
                        <h4 className="font-extrabold text-sm leading-tight">
                          {quizFeedback === 'correct' ? `🎉 ${t('vocab.quiz.brilliant', nativeLanguage)}` : `😢 ${t('vocab.quiz.incorrect', nativeLanguage)}`}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-500 mt-1">
                          "{currentQuizWord.english}" {t('vocab.quiz.is', nativeLanguage)} "{currentQuizWord.native[nativeLanguage]}" ({currentQuizWord.pos})
                        </p>
                      </div>
                      <button
                        onClick={handleNextQuizQuestion}
                        className="py-2.5 px-6 bg-natural-sage hover:bg-natural-darksage text-white font-black rounded-xl text-xs transition shadow-sm flex items-center gap-1 shrink-0"
                      >
                        {t('vocab.quiz.continue', nativeLanguage)} <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {quizState === 'finished' && (
              <div className="text-center py-8 bg-white border-2 border-natural-border rounded-3xl p-8 max-w-lg w-full flex flex-col items-center gap-6 shadow-sm">
                <CheckCircle2 className="w-16 h-16 text-natural-sage animate-pulse" />
                <div>
                  <h3 className="text-2xl font-black text-natural-darkbrown font-comfortaa">
                    {t('vocab.quiz.completed', nativeLanguage)}
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-1.5 leading-relaxed max-w-sm mx-auto">
                    {t('vocab.quiz.excellent', nativeLanguage)}
                  </p>
                </div>

                {/* Score panel */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-natural-lightsage border border-natural-sage/15 p-4 rounded-2xl">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{t('vocab.quiz.score', nativeLanguage)}</span>
                    <h4 className="text-2xl font-black text-natural-sage font-comfortaa mt-1">{quizScore} / 100</h4>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{t('vocab.quiz.best_streak', nativeLanguage)}</span>
                    <h4 className="text-2xl font-black text-amber-600 font-comfortaa mt-1">🔥 {quizBestStreak}</h4>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setQuizState('idle')}
                    className="flex-1 py-3.5 bg-white border-2 border-natural-border text-natural-text font-black rounded-2xl text-xs hover:bg-natural-cream transition shadow-xs flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" /> {t('vocab.quiz.reset', nativeLanguage)}
                  </button>
                  <button
                    onClick={startNewQuiz}
                    className="flex-1 py-3.5 bg-natural-sage border-b-4 border-natural-darksage text-white font-black rounded-2xl text-xs hover:bg-natural-sage/95 transition shadow-sm flex items-center justify-center gap-1"
                  >
                    {t('vocab.quiz.play_again', nativeLanguage)} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

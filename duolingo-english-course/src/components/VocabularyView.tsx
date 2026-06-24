/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, Languages, Sparkles, AlertCircle } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/lessons';
import { speakEnglish } from '../utils/audio';

interface VocabularyViewProps {
  nativeLanguage: 'es' | 'fr' | 'de' | 'it';
}

export default function VocabularyView({ nativeLanguage }: VocabularyViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'flashcards'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const words = VOCABULARY_LIST;

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 200);
  };

  const speak = (text: string) => {
    speakEnglish(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 pb-24">
      {/* Tab toggle for Glossary vs Flashcards */}
      <div className="flex bg-natural-border/40 p-1.5 rounded-2xl mb-8 justify-between shadow-inner">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'all'
              ? 'bg-white text-natural-text shadow-sm border border-natural-border'
              : 'text-gray-400 hover:text-natural-text'
          }`}
        >
          <BookOpen className="w-4 h-4 text-natural-sage" />
          <span>English Glossary</span>
        </button>
        <button
          onClick={() => {
            setIsFlipped(false);
            setActiveTab('flashcards');
          }}
          className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'bg-white text-natural-text shadow-sm border border-natural-border'
              : 'text-gray-400 hover:text-natural-text'
          }`}
        >
          <Sparkles className="w-4 h-4 text-natural-brown fill-amber-50" />
          <span>Interactive Flashcards</span>
        </button>
      </div>

      {activeTab === 'all' ? (
        <div className="flex flex-col gap-4">
          <div className="bg-natural-lightsage border border-natural-sage/20 p-4 rounded-2xl mb-2">
            <h3 className="text-sm font-extrabold text-natural-darksage flex items-center gap-1.5">
              <Languages className="w-4 h-4" /> Speaking Pronunciations
            </h3>
            <p className="text-xs text-natural-text/90 font-medium mt-1">
              Tap any speaker icon to hear the English voice pronunciation narrated by the standard AI speech synthesizer.
            </p>
          </div>

          {/* Dictionary Grid */}
          <div className="grid grid-cols-1 gap-3">
            {words.map((word) => (
              <div
                key={word.english}
                className="bg-white border-2 border-natural-border rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-md font-black text-natural-text font-comfortaa">
                      {word.english}
                    </h4>
                    <span className="text-[10px] font-bold text-natural-darksage bg-natural-lightsage px-2 py-0.5 rounded-md uppercase tracking-wide">
                      {word.pos}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-500 mt-1 italic">
                    "{word.native[nativeLanguage]}"
                  </p>
                  <p className="text-xs font-medium text-natural-text mt-2 bg-natural-cream p-2 rounded-xl border border-natural-border">
                    💡 <span className="font-bold">Example:</span> "{word.ex}"
                    <span className="block text-gray-400 font-bold italic mt-0.5">
                      → "{word.ext[nativeLanguage]}"
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => speak(word.english)}
                  className="p-3 bg-natural-lightsage hover:bg-natural-sage/10 text-natural-sage rounded-full transition-all hover:scale-105"
                  title="Hear English pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FLASHCARDS INTERACTIVE SCREEN */
        <div className="flex flex-col items-center gap-6 py-6">
          <span className="text-xs font-extrabold text-gray-400">
            Card {currentIndex + 1} of {words.length}
          </span>

          {/* Card Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-sm aspect-[3/2] rounded-3xl cursor-pointer perspective-1000 group relative"
          >
            <div
              className={`w-full h-full duration-500 preserve-3d relative flex items-center justify-center p-6 border-2 shadow-md rounded-3xl ${
                isFlipped
                  ? 'bg-gradient-to-br from-natural-lightsage to-natural-cream border-natural-sage rotate-y-180'
                  : 'bg-white border-natural-border hover:border-natural-sage/50'
              }`}
            >
              {!isFlipped ? (
                /* FRONT */
                <div className="text-center flex flex-col items-center gap-3">
                  <span className="text-[10px] font-black text-natural-sage uppercase tracking-widest bg-natural-lightsage px-3 py-1 rounded-full">
                    English Word
                  </span>
                  <h2 className="text-3xl font-black text-natural-text font-comfortaa mt-1">
                    {words[currentIndex].english}
                  </h2>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-4">
                    Click to flip translation
                  </span>
                </div>
              ) : (
                /* BACK */
                <div className="text-center flex flex-col items-center gap-3 transform rotate-y-180">
                  <span className="text-[10px] font-black text-natural-brown uppercase tracking-widest bg-natural-cream px-3 py-1 rounded-full border border-natural-brown/10">
                    Native Translation
                  </span>
                  <h2 className="text-3xl font-black text-natural-brown font-comfortaa mt-1">
                    {words[currentIndex].native[nativeLanguage]}
                  </h2>
                  <p className="text-xs font-bold text-gray-500 italic mt-1">
                    {words[currentIndex].pos}
                  </p>
                  
                  {/* Audible helper */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid reflipping
                      speak(words[currentIndex].english);
                    }}
                    className="mt-4 p-2.5 bg-natural-lightsage hover:bg-natural-sage/15 text-natural-sage rounded-full transition-all"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-4 w-full max-w-sm">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-3 px-4 bg-white border-2 border-natural-border text-natural-text font-bold rounded-2xl text-sm hover:bg-natural-cream transition-all active:translate-y-0.5"
            >
              Flip Card
            </button>
            <button
              onClick={handleNextCard}
              className="flex-1 py-3 px-4 bg-natural-sage border-b-4 border-natural-darksage hover:bg-natural-sage/95 text-white font-black rounded-2xl text-sm transition-all active:translate-y-0.5 shadow-sm"
            >
              Next Word
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

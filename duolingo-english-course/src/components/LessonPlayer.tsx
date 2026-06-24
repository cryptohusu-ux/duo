/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, MicOff, CheckCircle2, XCircle, Heart, ArrowRight, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { Lesson, Question, QuestionType, UserProgress } from '../types';
import MascotDuo from './MascotDuo';
import { soundSynth, speakEnglish } from '../utils/audio';

interface LessonPlayerProps {
  lesson: Lesson;
  progress: UserProgress;
  onFinish: (xpEarned: number, gemsEarned: number, heartsRemaining: number) => void;
  onClose: () => void;
  onRefillHearts: () => void;
}

export default function LessonPlayer({ lesson, progress, onFinish, onClose, onRefillHearts }: LessonPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(progress.hearts);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  // Translation Bubble states
  const [selectedBubbles, setSelectedBubbles] = useState<string[]>([]);
  const [availableBubbles, setAvailableBubbles] = useState<string[]>([]);

  // Choice type states
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  // Match Pair states
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // holds matched english words
  const [matchPairsEnglish, setMatchPairsEnglish] = useState<string[]>([]);
  const [matchPairsNative, setMatchPairsNative] = useState<string[]>([]);
  const [mismatchError, setMismatchError] = useState<boolean>(false);

  // Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  // Playback & Validation
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);

  // Finish States
  const [lessonFinished, setLessonFinished] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState(false);

  const recognitionRef = useRef<any>(null);
  const question = lesson.questions[currentIndex];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
    } else {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
        setSpeechTranscript('');
      };

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        setSpeechTranscript(resultText);
      };

      rec.onerror = (err: any) => {
        console.warn('Speech Recognition error:', err);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Handle Question Change - load structures
  useEffect(() => {
    if (!question) return;

    // Reset answers
    setSelectedChoice(null);
    setSelectedBubbles([]);
    setLeftSelected(null);
    setRightSelected(null);
    setMatchedPairs([]);
    setSpeechTranscript('');
    setHasChecked(false);
    setIsCorrect(false);

    // Dynamic speak voice if listen or choice
    if (question.type === QuestionType.LISTEN || question.type === QuestionType.CHOICE) {
      // Small timeout to not disrupt transition
      const t = setTimeout(() => {
        speakEnglish(question.audioText || question.sentence);
      }, 500);
      return () => clearTimeout(t);
    }

    // Set available bubbles for translating sentence
    if (question.type === QuestionType.TRANSLATE && question.options) {
      // Shuffle options safely once
      const shuffled = [...question.options].sort(() => Math.random() - 0.5);
      setAvailableBubbles(shuffled);
    }

    // Match Pairs preparation
    if (question.type === QuestionType.MATCH && question.pairs) {
      const englishWords = question.pairs.map(p => p.english).sort(() => Math.random() - 0.5);
      const nativeWords = question.pairs.map(p => p.native[progress.nativeLanguage]).sort(() => Math.random() - 0.5);
      setMatchPairsEnglish(englishWords);
      setMatchPairsNative(nativeWords);
    }
  }, [currentIndex, lesson, progress.nativeLanguage]);

  // Voice Toggle
  const startVoiceCapture = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Microphone start error:', e);
      }
    }
  };

  const playTTS = () => {
    speakEnglish(question.audioText || question.sentence);
  };

  // Word Bank Handlers
  const handleAddBubble = (bubble: string) => {
    if (hasChecked) return;
    soundSynth.playPop();
    setSelectedBubbles([...selectedBubbles, bubble]);
    setAvailableBubbles(availableBubbles.filter((b) => b !== bubble));
  };

  const handleRemoveBubble = (bubble: string) => {
    if (hasChecked) return;
    soundSynth.playPop();
    setSelectedBubbles(selectedBubbles.filter((b) => b !== bubble));
    setAvailableBubbles([...availableBubbles, bubble]);
  };

  // Matching Pairs Logic
  const handleMatchTap = (type: 'english' | 'native', value: string) => {
    if (hasChecked) return;
    soundSynth.playPop();

    if (type === 'english') {
      setLeftSelected(value);
      if (rightSelected) {
        evaluatePair(value, rightSelected);
      }
    } else {
      setRightSelected(value);
      if (leftSelected) {
        evaluatePair(leftSelected, value);
      }
    }
  };

  const evaluatePair = (eng: string, nat: string) => {
    const pair = question.pairs?.find(p => p.english === eng);
    const correctNative = pair?.native[progress.nativeLanguage];

    if (correctNative === nat) {
      // Correct Match!
      setMatchedPairs([...matchedPairs, eng]);
      setLeftSelected(null);
      setRightSelected(null);
      soundSynth.playPop();
      
      // Auto-check if all matched
      if (matchedPairs.length + 1 === question.pairs?.length) {
        setIsCorrect(true);
        setHasChecked(true);
        soundSynth.playCorrect();
      }
    } else {
      // Mismatch!
      setMismatchError(true);
      soundSynth.playIncorrect();
      setTimeout(() => {
        setLeftSelected(null);
        setRightSelected(null);
        setMismatchError(false);
      }, 800);
    }
  };

  // Handle "CHECK" submission
  const handleCheck = () => {
    if (hasChecked) return;

    let correct = false;

    if (question.type === QuestionType.CHOICE) {
      correct = selectedChoice === question.correctAnswer;
    } 
    else if (question.type === QuestionType.TRANSLATE) {
      const userSentence = selectedBubbles.join(' ').toLowerCase().trim();
      const targetSentence = question.correctAnswer.toLowerCase().trim();
      correct = userSentence === targetSentence || userSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === targetSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    } 
    else if (question.type === QuestionType.LISTEN) {
      const userSentence = selectedBubbles.join(' ').toLowerCase().trim();
      const targetSentence = question.correctAnswer.toLowerCase().trim();
      correct = userSentence === targetSentence || userSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === targetSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    } 
    else if (question.type === QuestionType.SPEAK) {
      if (speechTranscript) {
        const userNorm = speechTranscript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
        const targetNorm = question.sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
        
        // Match percentage or close spelling
        correct = userNorm.includes(targetNorm) || targetNorm.includes(userNorm) || userNorm === targetNorm;
      } else {
        // Fallback or skipped speak
        correct = true; 
      }
    }
    else if (question.type === QuestionType.MATCH) {
      // Matching evaluates matching pairs on the fly. Unlocks checked state when fully matched.
      correct = true;
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      soundSynth.playCorrect();
      setCorrectStreak(prev => prev + 1);
    } else {
      soundSynth.playIncorrect();
      setCorrectStreak(0);
      const remainingHearts = hearts - 1;
      setHearts(remainingHearts);
      
      if (remainingHearts <= 0) {
        setOutOfHearts(true);
      }
    }
  };

  // Move to next question or complete lesson
  const handleContinue = () => {
    if (currentIndex + 1 < lesson.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      soundSynth.playComplete();
      setLessonFinished(true);
    }
  };

  // Refill hearts immediately with gems inside lesson player
  const handleInternalRefill = () => {
    if (progress.gems >= 150) {
      onRefillHearts();
      setHearts(5);
      setOutOfHearts(false);
    } else {
      alert("You don't have enough gems! Spend gems in the Shop or practice vocabulary to earn some.");
    }
  };

  // Percentage complete
  const progressPercent = Math.round((currentIndex / lesson.questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-screen overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-natural-border max-w-4xl mx-auto w-full">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-natural-text hover:bg-natural-cream rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-6 h-4 bg-natural-border rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-natural-sage rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Sparkle on head */}
          {progressPercent > 0 && (
            <div className="absolute top-0 bottom-0 text-xs text-white/40 flex items-center justify-end px-2" style={{ width: `${progressPercent}%` }}>
              ✨
            </div>
          )}
        </div>

        {/* Lives Counter */}
        <div className="flex items-center gap-1.5 font-bold text-[#FF4B4B]">
          <Heart className="w-6 h-6 fill-[#FF4B4B] animate-pulse" />
          <span className="text-lg font-black font-comfortaa">{hearts}</span>
        </div>
      </div>

      {/* Main Core Section */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!lessonFinished && !outOfHearts && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              {/* Question Prompt */}
              <div className="mb-6">
                <span className="text-xs font-black tracking-widest text-natural-sage uppercase bg-natural-lightsage border border-natural-sage/15 px-3 py-1 rounded-full">
                  {question.type === QuestionType.CHOICE && 'Multiple Choice'}
                  {question.type === QuestionType.TRANSLATE && 'Sentence Builder'}
                  {question.type === QuestionType.LISTEN && 'Listening Challenge'}
                  {question.type === QuestionType.SPEAK && 'Speaking Challenge'}
                  {question.type === QuestionType.MATCH && 'Vocabulary Match-up'}
                </span>
                <h1 className="text-2xl font-black text-natural-text mt-3 font-comfortaa">
                  {question.prompt}
                </h1>
                {question.nativeTranslations[progress.nativeLanguage] && (
                  <p className="text-gray-500 font-bold text-md mt-1 italic">
                    "{question.nativeTranslations[progress.nativeLanguage]}"
                  </p>
                )}
              </div>

              {/* Character Mascot & Speech Bubble Panel */}
              {(question.type === QuestionType.CHOICE || 
                question.type === QuestionType.TRANSLATE || 
                question.type === QuestionType.LISTEN) && (
                <div className="flex gap-4 items-center mb-8">
                  <MascotDuo 
                    state={hasChecked ? (isCorrect ? 'happy' : 'sad') : 'idle'} 
                    costume={progress.currentCostume} 
                    size="sm" 
                  />
                  <div className="relative flex-1 bg-natural-cream border-2 border-natural-border rounded-2xl p-4 shadow-sm text-sm font-bold text-natural-text">
                    <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-2 w-3 h-3 bg-natural-cream border-l-2 border-b-2 border-natural-border rotate-45" />
                    {question.type === QuestionType.LISTEN ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={playTTS}
                          className="p-3 bg-natural-sage hover:bg-natural-sage/95 text-white rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                        >
                          <Volume2 className="w-6 h-6" />
                        </button>
                        <span className="text-gray-400">Tap the speaker to hear the word again!</span>
                      </div>
                    ) : (
                      <p>Do you know the correct English matching for this phrase?</p>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic Answer Selection Modules */}
              <div className="flex-1 flex flex-col justify-center">

                {/* 1. CHOICE MODULE */}
                {question.type === QuestionType.CHOICE && question.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((opt, oIdx) => {
                      const isSelected = selectedChoice === opt;
                      const isOptionChecked = hasChecked && opt === question.correctAnswer;
                      const isWrongSelection = hasChecked && isSelected && !isCorrect;

                      return (
                        <button
                          key={oIdx}
                          disabled={hasChecked}
                          onClick={() => {
                            soundSynth.playPop();
                            setSelectedChoice(opt);
                          }}
                          className={`p-4 rounded-2xl border-2 text-left font-extrabold text-md transition-all flex items-center justify-between ${
                            isOptionChecked
                              ? 'bg-natural-lightsage border-natural-sage text-natural-darksage shadow-sm'
                              : isWrongSelection
                              ? 'bg-rose-50 border-rose-500 text-rose-700'
                              : isSelected
                              ? 'bg-natural-cream border-natural-brown text-natural-brown shadow-md'
                              : 'bg-white border-natural-border text-natural-text hover:bg-natural-cream hover:border-natural-sage/35'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className="w-6 h-6 rounded-full border border-natural-border flex items-center justify-center text-xs text-gray-400 font-bold">
                            {oIdx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. TRANSLATE & LISTEN BUBBLE MODULE */}
                {(question.type === QuestionType.TRANSLATE || question.type === QuestionType.LISTEN) && (
                  <div className="flex flex-col gap-6">
                    {/* Active Selected Sentences Board */}
                    <div className="min-h-16 p-4 border-2 border-dashed border-natural-border bg-natural-cream rounded-2xl flex flex-wrap gap-2 items-center">
                      {selectedBubbles.length === 0 ? (
                        <span className="text-gray-400 font-bold text-sm">Select words from below...</span>
                      ) : (
                        selectedBubbles.map((bubble, bIdx) => (
                          <motion.button
                            layoutId={`bubble-${bubble}`}
                            key={bIdx}
                            disabled={hasChecked}
                            onClick={() => handleRemoveBubble(bubble)}
                            className="bg-white hover:bg-natural-cream border-2 border-natural-border shadow-sm text-natural-text font-extrabold px-4 py-2 rounded-xl text-sm md:text-md active:translate-y-0.5"
                          >
                            {bubble}
                          </motion.button>
                        ))
                      )}
                    </div>

                    {/* Word Bubbles Bank */}
                    <div className="flex flex-wrap gap-2 justify-center py-4">
                      {availableBubbles.map((bubble, bIdx) => (
                        <motion.button
                          layoutId={`bubble-${bubble}`}
                          key={bIdx}
                          disabled={hasChecked}
                          onClick={() => handleAddBubble(bubble)}
                          className="bg-white hover:bg-natural-cream active:bg-natural-lightsage border-2 border-natural-border border-b-4 hover:border-natural-sage/30 shadow-sm text-natural-text font-extrabold px-4 py-2 rounded-xl text-sm md:text-md"
                        >
                          {bubble}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MATCHING PAIRS MODULE */}
                {question.type === QuestionType.MATCH && (
                  <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto w-full py-4">
                    {/* English words column */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase text-center mb-1">English</span>
                      {matchPairsEnglish.map((word) => {
                        const isMatched = matchedPairs.includes(word);
                        const isSelected = leftSelected === word;

                        return (
                          <button
                            key={word}
                            disabled={isMatched || hasChecked}
                            onClick={() => handleMatchTap('english', word)}
                            className={`p-3 rounded-2xl border-2 font-extrabold text-sm text-center transition-all ${
                              isMatched
                                ? 'bg-natural-lightsage/50 border-natural-sage/30 text-natural-darksage/80 opacity-60'
                                : isSelected
                                ? 'bg-natural-lightsage border-natural-sage text-natural-darksage shadow-md'
                                : 'bg-white border-natural-border text-natural-text hover:bg-natural-cream'
                            } ${mismatchError && isSelected ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake' : ''}`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>

                    {/* Native words column */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase text-center mb-1">Native</span>
                      {matchPairsNative.map((word) => {
                        // Find if this native translation belongs to a matched English word
                        const isMatched = matchedPairs.some(eng => {
                          const pair = question.pairs?.find(p => p.english === eng);
                          return pair?.native[progress.nativeLanguage] === word;
                        });
                        const isSelected = rightSelected === word;

                        return (
                          <button
                            key={word}
                            disabled={isMatched || hasChecked}
                            onClick={() => handleMatchTap('native', word)}
                            className={`p-3 rounded-2xl border-2 font-extrabold text-sm text-center transition-all ${
                              isMatched
                                ? 'bg-natural-lightsage/50 border-natural-sage/30 text-natural-darksage/80 opacity-60'
                                : isSelected
                                ? 'bg-natural-lightsage border-natural-sage text-natural-darksage shadow-md'
                                : 'bg-white border-natural-border text-natural-text hover:bg-natural-cream'
                            } ${mismatchError && isSelected ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake' : ''}`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. SPEAKING MODULE */}
                {question.type === QuestionType.SPEAK && (
                  <div className="flex flex-col items-center gap-6 py-6 text-center">
                    <div className="bg-natural-cream border-2 border-natural-border rounded-3xl p-6 w-full max-w-md">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sentence to say:</span>
                      <h2 className="text-xl font-extrabold text-natural-text mt-2 font-comfortaa">
                        "{question.sentence}"
                      </h2>
                      <button
                        onClick={playTTS}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-natural-lightsage text-natural-darksage border border-natural-border/50 rounded-full text-xs font-bold hover:bg-natural-lightsage/80"
                      >
                        <Volume2 className="w-4 h-4" /> Listen Pronunciation
                      </button>
                    </div>

                    {/* Microphone Capture Button */}
                    {isSpeechSupported ? (
                      <div className="flex flex-col items-center gap-3">
                        <button
                          disabled={hasChecked}
                          onClick={startVoiceCapture}
                          className={`w-24 h-24 rounded-full flex items-center justify-center border-b-8 shadow-lg relative transition-all active:translate-y-1 active:border-b-2 ${
                            isRecording
                              ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                              : 'bg-natural-sage border-natural-darksage text-white hover:bg-natural-sage/95'
                          }`}
                        >
                          <Mic className="w-10 h-10" />
                          {isRecording && (
                            <span className="absolute -inset-4 border-4 border-rose-400 rounded-full animate-ping opacity-30" />
                          )}
                        </button>
                        <span className="text-xs font-black uppercase text-gray-400">
                          {isRecording ? 'Listening... Speak now!' : 'Tap mic and speak'}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-natural-brown bg-natural-cream border border-natural-border p-4 rounded-2xl flex items-center gap-2">
                        <MicOff className="w-5 h-5 flex-shrink-0" />
                        <span>Speech Recognition not fully supported in this iframe browser. Speak the sentence aloud to yourself, then click 'Check' to proceed!</span>
                      </div>
                    )}

                    {/* Speech Transcript Output Display */}
                    {speechTranscript && (
                      <div className="bg-natural-lightsage border border-natural-sage/20 rounded-2xl p-4 w-full max-w-md">
                        <span className="text-[10px] font-bold text-natural-sage uppercase">You said:</span>
                        <p className="text-md font-bold text-natural-text mt-1">"{speechTranscript}"</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OUT OF HEARTS LIVE STATE ERROR PANEL */}
        {outOfHearts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 flex flex-col items-center gap-6"
          >
            <MascotDuo state="sad" costume={progress.currentCostume} size="lg" />
            <div className="max-w-md">
              <h2 className="text-3xl font-black text-rose-600 font-comfortaa">No Hearts Left!</h2>
              <p className="text-gray-500 font-medium mt-2">
                Mistakes help you learn, but you have run out of lives for today. Refill your hearts to continue the lesson!
              </p>
            </div>
            <div className="flex flex-col gap-2.5 w-full max-w-xs mt-4">
              <button
                onClick={handleInternalRefill}
                disabled={progress.gems < 150}
                className={`py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-between shadow-md border-b-4 transition-all active:translate-y-0.5 ${
                  progress.gems >= 150
                    ? 'bg-natural-sage border-natural-darksage hover:bg-natural-sage/90 text-white'
                    : 'bg-natural-cream border-natural-border text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Refill Hearts (5 ❤️)</span>
                <span className="flex items-center gap-1">💎 150</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 bg-white border-2 border-natural-border hover:bg-natural-cream text-natural-text rounded-2xl font-black text-sm transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}

        {/* SUCCESS / COMPLETION PANEL */}
        {lessonFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 flex flex-col items-center gap-6"
          >
            <MascotDuo state="happy" costume={progress.currentCostume} size="lg" />
            <div className="max-w-md">
              <span className="text-xs font-black uppercase text-natural-darksage tracking-widest flex items-center gap-1 justify-center bg-natural-lightsage border border-natural-sage/20 py-1.5 px-4 rounded-full">
                👑 Lesson Complete!
              </span>
              <h2 className="text-3xl font-black text-natural-sage mt-4 font-comfortaa">
                Excellent Job!
              </h2>
              <p className="text-gray-500 font-medium mt-2">
                You successfully completed <span className="font-extrabold text-natural-text">"{lesson.title}"</span> and acquired new English language skills!
              </p>
            </div>

            {/* XP and Gem rewards cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
              <div className="bg-natural-cream border-2 border-[#FF9600]/20 p-4 rounded-3xl text-center shadow-sm">
                <span className="text-3xl">🔥</span>
                <div className="text-xl font-black text-[#FF9600] mt-2 font-comfortaa">
                  +{lesson.xpReward}
                </div>
                <span className="text-xs font-bold text-natural-text uppercase tracking-wide">XP Earned</span>
              </div>

              <div className="bg-natural-cream border-2 border-[#1CB0F6]/20 p-4 rounded-3xl text-center shadow-sm">
                <span className="text-3xl">💎</span>
                <div className="text-xl font-black text-[#1CB0F6] mt-2 font-comfortaa">
                  +{lesson.gemReward}
                </div>
                <span className="text-xs font-bold text-natural-text uppercase tracking-wide">Gems Awarded</span>
              </div>
            </div>

            <button
              onClick={() => onFinish(lesson.xpReward, lesson.gemReward, hearts)}
              className="py-4 px-8 bg-natural-sage hover:bg-natural-sage/90 text-white border-b-8 border-natural-darksage rounded-2xl font-black text-md shadow-lg hover:scale-105 active:scale-95 transition-all w-full max-w-sm mt-6 flex items-center justify-center gap-2"
            >
              Finish & Claim <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* FOOTER ANSWER CHECK POPUP DRAWER */}
      {!lessonFinished && !outOfHearts && (
        <div
          className={`border-t-2 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
            hasChecked
              ? isCorrect
                ? 'bg-natural-lightsage border-natural-sage/20'
                : 'bg-rose-50 border-rose-200'
              : 'bg-white border-natural-border'
          }`}
        >
          {/* Feedback message */}
          <div className="flex-1 flex items-start gap-4">
            {hasChecked ? (
              isCorrect ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-natural-sage fill-green-100 flex-shrink-0 animate-bounce" />
                  <div>
                    <h3 className="text-lg font-black text-natural-darksage font-comfortaa">Awesome job! You are correct!</h3>
                    <p className="text-xs font-bold text-natural-sage mt-0.5">Keep up the momentum!</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-10 h-10 text-rose-500 fill-rose-100 flex-shrink-0 animate-shake" />
                  <div>
                    <h3 className="text-lg font-black text-rose-800 font-comfortaa">Ah, not quite! Correct answer:</h3>
                    <p className="text-md font-extrabold text-rose-700 bg-white border border-rose-200 py-1 px-3 rounded-xl mt-1.5 inline-block">
                      {question.correctAnswer || question.sentence}
                    </p>
                  </div>
                </>
              )
            ) : (
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Streak</span>
                <p className="text-sm font-extrabold text-natural-text">{correctStreak} answered correctly in a row</p>
              </div>
            )}
          </div>

          {/* Core Action Button */}
          <div className="w-full sm:w-auto">
            {hasChecked ? (
              <button
                onClick={handleContinue}
                className="py-3.5 px-8 w-full sm:w-56 bg-natural-brown hover:bg-natural-brown/90 border-b-4 border-natural-darkbrown text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCheck}
                disabled={
                  (question.type === QuestionType.CHOICE && !selectedChoice) ||
                  ((question.type === QuestionType.TRANSLATE || question.type === QuestionType.LISTEN) && selectedBubbles.length === 0)
                }
                className={`py-3.5 px-8 w-full sm:w-56 rounded-2xl font-black text-sm flex items-center justify-center shadow-md border-b-4 transition-all ${
                  (question.type === QuestionType.CHOICE && !selectedChoice) ||
                  ((question.type === QuestionType.TRANSLATE || question.type === QuestionType.LISTEN) && selectedBubbles.length === 0)
                    ? 'bg-natural-cream border-natural-border text-gray-400 cursor-not-allowed'
                    : 'bg-natural-sage border-natural-darksage hover:bg-natural-sage/95 text-white active:translate-y-0.5'
                }`}
              >
                Check Answer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

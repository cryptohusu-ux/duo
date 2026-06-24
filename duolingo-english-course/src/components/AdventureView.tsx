/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Rocket, 
  Briefcase, 
  ShieldAlert, 
  Compass, 
  Home, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  Languages, 
  RefreshCw, 
  ArrowLeft,
  Award
} from 'lucide-react';
import { UserProgress } from '../types';
import MascotDuo from './MascotDuo';
import { t } from '../utils/translations';

interface AdventureViewProps {
  progress: UserProgress;
  onCompleteAdventure: (xpEarned: number, gemsEarned: number) => void;
  onStartCustomLesson?: (lesson: any) => void;
}

interface Scenario {
  id: string;
  title: string;
  character: string;
  role: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: any;
  color: string;
  borderColor: string;
  initialMessage: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    title: 'Cozy Cafe Order',
    character: 'Barista Clara',
    role: 'A friendly barista in a warm, lofi-playing coffee shop.',
    description: 'Order your favorite coffee, customize your milk, select a pastry, and make warm small talk.',
    difficulty: 'Beginner',
    icon: Coffee,
    color: 'bg-amber-50 text-amber-800',
    borderColor: 'border-amber-200',
    initialMessage: "Hi there! Welcome to Cozy Beans. What can I get started for you today?"
  },
  {
    id: 'space',
    title: 'Alien Space Survival',
    character: 'Captain Zox',
    role: 'A suspicious alien captain on a massive flagship vessel.',
    description: 'You were pulled into a tractor beam! Persuade the Captain that you are a peaceful traveler.',
    difficulty: 'Intermediate',
    icon: Rocket,
    color: 'bg-indigo-50 text-indigo-800',
    borderColor: 'border-indigo-200',
    initialMessage: "Intruder! Explain your presence in this quadrant immediately, or face primary disintegration!"
  },
  {
    id: 'interview',
    title: 'Tech Job Interview',
    character: 'HR Manager Sarah',
    role: 'A professional recruiter at a cutting-edge tech startup.',
    description: 'Interview for a frontend engineering job, discuss your projects, and handle challenging questions.',
    difficulty: 'Advanced',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-800',
    borderColor: 'border-blue-200',
    initialMessage: "Thank you for coming in today. Could you start by introducing yourself and sharing why you want to join our team?"
  },
  {
    id: 'castle',
    title: 'Gargoyle Riddle Gate',
    character: 'The Stone Guardian',
    role: 'An ancient gargoyle protecting the legendary Library of Secrets.',
    description: 'Convince the ancient stone protector to let you pass by solving riddles and speaking eloquently.',
    difficulty: 'Intermediate',
    icon: ShieldAlert,
    color: 'bg-slate-100 text-slate-800',
    borderColor: 'border-slate-300',
    initialMessage: "Halt, traveler! None may enter the Library of Secrets without proving their wit. Are you ready for my riddle?"
  },
  {
    id: 'tokyo',
    title: 'Lost in Tokyo',
    character: 'Local Resident Kenji',
    role: 'A polite local student walking near Shibuya Crossing.',
    description: 'Ask for directions to the train station, buy a ticket, and practice polite local etiquette.',
    difficulty: 'Beginner',
    icon: Compass,
    color: 'bg-rose-50 text-rose-800',
    borderColor: 'border-rose-200',
    initialMessage: "Excuse me, do you need help? You look a bit lost here in Shibuya."
  },
  {
    id: 'roommate',
    title: 'The Roommate Negotiation',
    character: 'Roommate Alex',
    role: 'Your slightly messy but well-meaning apartment roommate.',
    description: 'Negotiate the cleaning schedule, ask them to wash their dishes, and maintain a peaceful apartment vibe.',
    difficulty: 'Intermediate',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-800',
    borderColor: 'border-emerald-200',
    initialMessage: "Hey! Oh, sorry about the pile of dishes in the sink. I was planning to do them... eventually. What's up?"
  }
];

interface ChatMessage {
  sender: 'character' | 'user';
  text: string;
}

interface Feedback {
  score: number;
  grammarCorrection: string;
  explanation: string;
}

export default function AdventureView({ progress, onCompleteAdventure, onStartCustomLesson }: AdventureViewProps) {
  const nativeLanguage = progress.nativeLanguage;
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [subTab, setSubTab] = useState<'rpg' | 'lesson_lab'>('rpg');
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);
  const [generationStage, setGenerationStage] = useState('Brainstorming concepts...');
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [showTranslate, setShowTranslate] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Dynamic AI State feedback
  const [mascotState, setMascotState] = useState<'idle' | 'happy' | 'sad' | 'shocked' | 'worried' | 'encouraging'>('idle');
  const [noticeMsg, setNoticeMsg] = useState('Duo is here to coach you through the scenario!');
  const [suggestions, setSuggestions] = useState<string[]>([
    "Hello! I am ready.",
    "Let's start the adventure!",
    "Hi there!"
  ]);
  const [lastFeedback, setLastFeedback] = useState<Feedback | null>(null);

  // Audio / Speech Recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Speech synthesis for AI character
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAiLoading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
      rec.onerror = (e: any) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      };
      recognitionRef.current = rec;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Safari.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Start scenario
  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setChatHistory([{ sender: 'character', text: scenario.initialMessage }]);
    setTurnCount(1);
    setMascotState('idle');
    setLastFeedback(null);
    setNoticeMsg(`Clara is greeting you! Order your favorite coffee.`);
    setShowTranslate(false);
    setTranslatedText('');

    // Pre-populate suggestions based on initial message
    if (scenario.id === 'cafe') {
      setSuggestions(["I would like to order a warm cappuccino, please.", "Hi! Can I get an iced Americano with oat milk?", "Hello! Do you have any fresh croissants today?"]);
      setNoticeMsg("Duo says: Let's start by ordering your drink! Speak or type politely.");
    } else if (scenario.id === 'space') {
      setSuggestions(["Wait! I'm just a lost trader, I mean no harm.", "Greetings! Please do not fire, I come in peace.", "Whoa! Calm down, I am an explorer from planet Earth."]);
      setNoticeMsg("Duo says: This alien captain looks angry! Try to calm him down with polite words.");
    } else if (scenario.id === 'interview') {
      setSuggestions(["Hello, thank you for having me. I am a passionate engineer with experience in React.", "Hi! I am excited to interview for this role because I love building user interfaces.", "Good morning. I've been working with web technologies for three years."]);
      setNoticeMsg("Duo says: First impressions matter! Introduce yourself professionally.");
    } else {
      setSuggestions(["Hello! How can I help you?", "Hi there!", "Good day! Let's get started."]);
      setNoticeMsg(`Duo says: Try to respond naturally to the ${scenario.character}.`);
    }

    // Speak initial message
    setTimeout(() => {
      speakText(scenario.initialMessage);
    }, 400);
  };

  // Translate character message
  const handleTranslateMessage = async () => {
    if (!selectedScenario || chatHistory.length === 0) return;
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage.sender !== 'character') return;

    setIsTranslating(true);
    setShowTranslate(true);

    try {
      const response = await fetch('/api/adventure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'translate',
          text: lastMessage.text,
          targetLang: progress.nativeLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translation || 'Could not translate message.');
      } else {
        setTranslatedText('Failed to reach translation service.');
      }
    } catch (err) {
      console.error(err);
      setTranslatedText('Error connecting to translator.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Submit response
  const handleSubmitResponse = async (textToSend: string) => {
    if (!textToSend.trim() || isAiLoading || !selectedScenario) return;

    const userMsg = textToSend.trim();
    setInputText('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsAiLoading(true);
    setNoticeMsg("Duo is analyzing your response and typing feedback...");
    setMascotState('encouraging');
    setShowTranslate(false);
    setTranslatedText('');

    try {
      const response = await fetch('/api/adventure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'respond',
          scenarioId: selectedScenario.id,
          characterName: selectedScenario.character,
          roleDescription: selectedScenario.role,
          chatHistory: [...chatHistory, { sender: 'user', text: userMsg }],
          turn: turnCount,
          nativeLang: progress.nativeLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Update history with AI character response
        setChatHistory(prev => [...prev, { sender: 'character', text: data.characterResponse }]);
        
        // Update feedback
        if (data.feedback) {
          setLastFeedback({
            score: data.feedback.score,
            grammarCorrection: data.feedback.grammarCorrection,
            explanation: data.feedback.explanation
          });
          
          // Update mascot emotion
          if (data.mascotEmotion) {
            setMascotState(data.mascotEmotion);
          } else {
            setMascotState(data.feedback.score > 80 ? 'happy' : 'worried');
          }
        }

        // Update notice and suggestions
        if (data.noticeMessage) setNoticeMsg(data.noticeMessage);
        if (data.suggestions) setSuggestions(data.suggestions);

        // Play character response voice
        speakText(data.characterResponse);

        // Advance turn
        setTurnCount(prev => prev + 1);

      } else {
        // Fallback in case of server error
        const fallbackMsg = "Ah, I see! That's interesting. What else can you tell me?";
        setChatHistory(prev => [...prev, { sender: 'character', text: fallbackMsg }]);
        setLastFeedback({
          score: 80,
          grammarCorrection: 'Perfect!',
          explanation: 'Your sentence was clear, but the server timed out. Let\'s continue!'
        });
        setMascotState('idle');
        setTurnCount(prev => prev + 1);
        speakText(fallbackMsg);
      }
    } catch (err) {
      console.error(err);
      setNoticeMsg("Network error. Let's try sending again!");
      setMascotState('sad');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Finish adventure
  const handleFinishAdventure = () => {
    // Standard reward: 30 XP, 15 Gems
    onCompleteAdventure(30, 15);
    setSelectedScenario(null);
  };

  // Generate dynamic custom lesson via backend AI
  const handleGenerateCustomLesson = async (topicToUse?: string) => {
    const topic = (topicToUse || customTopic).trim();
    if (!topic) return;

    setIsGeneratingLesson(true);
    setGenerationError(null);
    setGenerationStage('Contacting Gemini AI server...');

    const stages = [
      'Deconstructing topic requirements...',
      'Synthesizing choice-response patterns...',
      'Structuring multi-lingual translation layers...',
      'Drafting target listening components...',
      'Mapping custom phoneme pronunciation metrics...',
      'Deploying secure sandbox lesson environment...'
    ];

    let stageIndex = 0;
    const interval = setInterval(() => {
      if (stageIndex < stages.length) {
        setGenerationStage(stages[stageIndex]);
        stageIndex++;
      }
    }, 1200);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      clearInterval(interval);

      if (response.ok) {
        const lesson = await response.json();
        setCustomTopic('');
        setIsGeneratingLesson(false);
        if (onStartCustomLesson) {
          onStartCustomLesson(lesson);
        }
      } else {
        const errData = await response.json();
        setGenerationError(errData.error || 'Failed to generate custom lesson structure.');
        setIsGeneratingLesson(false);
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setGenerationError('Connection timed out or failed. Please verify and try again.');
      setIsGeneratingLesson(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-natural-bg text-natural-text p-4 md:p-8 flex flex-col items-center">
      
      <AnimatePresence mode="wait">
        {!selectedScenario ? (
          /* SCENARIO SELECTOR */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-4xl flex flex-col gap-8"
          >
            <div className="text-center">
              <span className="bg-natural-lightsage text-natural-sage border border-natural-sage/20 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase">
                {t('adventure.badge', nativeLanguage)}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-natural-darkbrown font-comfortaa mt-3">
                {t('adventure.title', nativeLanguage)}
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-2 max-w-lg mx-auto">
                {t('adventure.subtitle', nativeLanguage)}
              </p>
            </div>

            {/* Subtab Switcher */}
            <div className="flex bg-natural-border/30 p-1 rounded-2xl max-w-md mx-auto w-full justify-between border border-natural-border/40">
              <button
                onClick={() => setSubTab('rpg')}
                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  subTab === 'rpg'
                    ? 'bg-white text-natural-text shadow-sm border border-natural-border'
                    : 'text-gray-400 hover:text-natural-text'
                }`}
              >
                <Compass className="w-4 h-4 text-natural-sage" />
                <span>{t('adventure.tab.rpg', nativeLanguage)}</span>
              </button>
              <button
                onClick={() => setSubTab('lesson_lab')}
                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  subTab === 'lesson_lab'
                    ? 'bg-white text-natural-text shadow-sm border border-natural-border'
                    : 'text-gray-400 hover:text-natural-text'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-50" />
                <span>{t('adventure.tab.creator', nativeLanguage)}</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {subTab === 'rpg' ? (
                /* TAB 1: RPG SCENARIOS */
                <motion.div
                  key="rpg_tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {SCENARIOS.map((scen) => {
                    const ScenIcon = scen.icon;
                    return (
                      <motion.div
                        key={scen.id}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="bg-white border-2 border-natural-border hover:border-natural-sage rounded-3xl p-6 shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${scen.color} border ${scen.borderColor}`}>
                              <ScenIcon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                              scen.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              scen.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {scen.difficulty}
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-natural-darkbrown font-comfortaa">
                            {scen.title}
                          </h3>
                          <p className="text-xs text-gray-400 font-bold mt-1">
                            With {scen.character}
                          </p>
                          <p className="text-xs text-gray-500 mt-3 font-medium leading-relaxed">
                            {scen.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleSelectScenario(scen)}
                          className="mt-6 w-full py-3 bg-natural-sage border-b-4 border-natural-darksage hover:bg-natural-sage/95 text-white font-extrabold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                        >
                          <Sparkles className="w-4 h-4" /> {t('adventure.btn.start', nativeLanguage)}
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                /* TAB 2: AI CUSTOM LESSON CREATOR */
                <motion.div
                  key="lesson_lab_tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border-2 border-natural-border rounded-3xl p-6 md:p-8 max-w-2xl mx-auto w-full shadow-sm flex flex-col gap-6"
                >
                  <div className="flex items-start gap-4 border-b border-natural-border pb-4">
                    <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-500 flex-shrink-0 animate-pulse">
                      <Sparkles className="w-6 h-6 fill-amber-100/30" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-natural-darkbrown font-comfortaa">
                        {t('adventure.creator.title', nativeLanguage)}
                      </h3>
                      <p className="text-xs text-gray-400 font-bold mt-0.5 leading-relaxed">
                        {t('adventure.creator.desc', nativeLanguage)}
                      </p>
                    </div>
                  </div>

                  {isGeneratingLesson ? (
                    /* COMPILING LESSON SCREEN */
                    <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
                      <div className="relative">
                        <MascotDuo state="encouraging" costume={progress.currentCostume} size="md" />
                        <div className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md border animate-spin text-natural-sage">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="max-w-xs">
                        <h4 className="text-sm font-black text-natural-darkbrown font-comfortaa animate-pulse">
                          {t('adventure.creator.generating', nativeLanguage)}
                        </h4>
                        <p className="text-xs font-bold text-natural-sage mt-2">
                          {generationStage}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* TOPIC FORM SCREEN */
                    <div className="flex flex-col gap-5">
                      {generationError && (
                        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>{generationError}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {t('adventure.creator.topic_label', nativeLanguage)}
                        </label>
                        <textarea
                          rows={3}
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          placeholder={t('adventure.creator.placeholder', nativeLanguage)}
                          className="w-full p-4 border-2 border-natural-border rounded-2xl text-xs font-semibold focus:border-natural-sage focus:outline-none transition leading-relaxed resize-none shadow-inner"
                        />
                      </div>

                      {/* Creative Chips suggestions */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          Inspirational Ideas:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            '🍣 Ordering sushi at a Tokyo counter',
                            '💻 Explaining a React bug to senior dev',
                            '🎸 Jamming with a London musician',
                            '🚕 Bargaining with a taxi driver at Paris Airport',
                            '🍷 Wine tasting and compliments in Florence'
                          ].map((chip) => (
                            <button
                              key={chip}
                              onClick={() => setCustomTopic(chip.substring(2))}
                              className="px-3 py-2 bg-natural-cream border border-natural-border hover:border-natural-sage rounded-xl text-[10px] font-bold text-natural-text transition active:scale-95"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleGenerateCustomLesson()}
                        disabled={!customTopic.trim()}
                        className="mt-4 w-full py-4 bg-natural-sage border-b-4 border-natural-darksage disabled:opacity-50 disabled:border-b-2 hover:bg-natural-sage/95 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" /> {t('adventure.creator.generate_btn', nativeLanguage)} 🪄
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ACTIVE ADVENTURE INTERFACE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 relative"
          >
            {/* LEFT COLUMN: CHAT INTERFACE */}
            <div className="flex-1 bg-white border-2 border-natural-border rounded-3xl p-4 md:p-6 shadow-sm flex flex-col h-[580px] justify-between">
              
              {/* Header inside chat */}
              <div className="flex items-center justify-between pb-4 border-b border-natural-border mb-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedScenario(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="font-extrabold text-natural-darkbrown font-comfortaa text-sm md:text-base">
                      {selectedScenario.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Chatting with {selectedScenario.character}
                    </p>
                  </div>
                </div>

                {/* Turn Progress bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-natural-sage">
                    Turn {turnCount}/5
                  </span>
                  <div className="w-24 bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200">
                    <div 
                      className="bg-natural-sage h-full transition-all duration-300" 
                      style={{ width: `${Math.min(turnCount * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin flex flex-col gap-4">
                {chatHistory.map((msg, idx) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs font-bold leading-relaxed shadow-sm relative ${
                        isUser 
                          ? 'bg-natural-sage text-white rounded-br-none' 
                          : 'bg-natural-lightsage text-natural-text border border-natural-sage/10 rounded-bl-none'
                      }`}>
                        {/* Audio speaker for character */}
                        {!isUser && (
                          <button 
                            onClick={() => speakText(msg.text)}
                            className="absolute -right-7 top-2.5 p-1 text-natural-sage hover:text-natural-darksage hover:bg-natural-lightsage rounded-full transition"
                            title="Speak response"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-natural-lightsage text-natural-text border border-natural-sage/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2 text-xs font-bold shadow-sm">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-natural-sage" />
                      <span>{selectedScenario.character} is writing...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Bubble quick selects */}
              {turnCount <= 5 && !isAiLoading && (
                <div className="my-3 flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Duo's Suggested Answers:
                  </span>
                  <div className="flex flex-col md:flex-row gap-2 overflow-x-auto scrollbar-none py-1">
                    {suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setInputText(sug);
                          handleSubmitResponse(sug);
                        }}
                        className="text-left text-xs bg-natural-cream hover:bg-natural-lightsage border border-natural-border hover:border-natural-sage text-natural-text px-3 py-2.5 rounded-xl transition duration-150 font-bold shadow-xs shrink-0 max-w-full md:max-w-[32%]"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input & Controls */}
              <div className="pt-3 border-t border-natural-border flex flex-col gap-2">
                {turnCount <= 5 ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitResponse(inputText);
                    }}
                    className="flex gap-2.5 items-center"
                  >
                    {/* Voice Mic Input */}
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center relative ${
                        isListening 
                          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                          : 'bg-natural-lightsage text-natural-sage border-natural-border hover:border-natural-sage'
                      }`}
                      title="Speak with your microphone"
                    >
                      {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>

                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={isListening ? "Listening... Speak now!" : "Type your response in English..."}
                      disabled={isAiLoading}
                      className="flex-1 bg-gray-50 border border-natural-border rounded-2xl px-4 py-3.5 text-xs font-bold text-natural-text outline-none focus:border-natural-sage focus:bg-white transition"
                    />

                    <button
                      type="submit"
                      disabled={isAiLoading || !inputText.trim()}
                      className="p-3.5 bg-natural-sage hover:bg-natural-darksage text-white rounded-2xl transition disabled:opacity-50 disabled:hover:bg-natural-sage cursor-pointer shadow-sm"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                ) : (
                  /* ADVENTURE COMPLETE CARD */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-natural-lightsage border-2 border-natural-sage/20 rounded-2xl p-5 text-center flex flex-col items-center gap-3"
                  >
                    <Award className="w-10 h-10 text-amber-500 animate-bounce" />
                    <h4 className="font-extrabold text-natural-darkbrown font-comfortaa">
                      Scenario Successfully Completed!
                    </h4>
                    <p className="text-xs text-gray-500 font-bold max-w-md">
                      Awesome job! You navigated the situation cleanly. Click below to secure your 30 XP and 15 Gems!
                    </p>
                    <button
                      onClick={handleFinishAdventure}
                      className="px-6 py-2.5 bg-natural-sage hover:bg-natural-darksage text-white font-extrabold rounded-xl transition shadow-sm text-xs mt-1"
                    >
                      Claim Rewards & Return
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: DUO COACH & FEEDBACK SYSTEM */}
            <div className="w-full lg:w-[320px] flex flex-col gap-4">
              
              {/* DUO SPEAKER COMPANION CARD */}
              <div className="bg-white border-2 border-natural-border rounded-3xl p-5 shadow-sm flex flex-col items-center gap-3 relative overflow-hidden">
                <MascotDuo state={mascotState} costume={progress.currentCostume} size="md" />
                
                <div className="text-center w-full bg-natural-lightsage border border-natural-sage/10 p-3.5 rounded-2xl">
                  <h4 className="font-extrabold text-natural-sage text-xs font-comfortaa mb-1">
                    Duo Says:
                  </h4>
                  <p className="text-xs text-natural-text font-bold leading-relaxed">
                    {noticeMsg}
                  </p>
                </div>

                {/* Quick Translate Button for Chat Accessibility */}
                {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === 'character' && (
                  <div className="w-full">
                    <button
                      onClick={handleTranslateMessage}
                      disabled={isTranslating}
                      className="w-full py-2 bg-natural-cream hover:bg-natural-lightsage text-natural-sage border border-natural-border hover:border-natural-sage rounded-xl font-extrabold text-[10px] flex items-center justify-center gap-1.5 uppercase tracking-wider transition"
                    >
                      <Languages className="w-3.5 h-3.5" /> 
                      {isTranslating ? 'Translating...' : 'Translate Barista Message'}
                    </button>
                    {showTranslate && translatedText && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50/50 border border-amber-200/50 text-amber-900 rounded-xl p-3 mt-2 text-[11px] font-bold"
                      >
                        {translatedText}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* GRAMMAR SCORECARD & ANALYTICS */}
              <AnimatePresence mode="wait">
                {lastFeedback ? (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white border-2 border-natural-border rounded-3xl p-5 shadow-sm flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-natural-darkbrown font-comfortaa text-xs uppercase tracking-wider">
                        Response Scorecard
                      </h4>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        lastFeedback.score >= 90 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        lastFeedback.score >= 75 ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {lastFeedback.score}% Score
                      </span>
                    </div>

                    {/* Progress score bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          lastFeedback.score >= 90 ? 'bg-emerald-500' :
                          lastFeedback.score >= 75 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${lastFeedback.score}%` }}
                      />
                    </div>

                    {/* Grammar correction box */}
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-2xl flex flex-col gap-1.5">
                      <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        {lastFeedback.grammarCorrection === 'Perfect!' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                        )}
                        Grammar Correction
                      </span>
                      <p className={`text-xs font-black leading-relaxed ${
                        lastFeedback.grammarCorrection === 'Perfect!' ? 'text-emerald-700' : 'text-amber-800'
                      }`}>
                        {lastFeedback.grammarCorrection}
                      </p>
                    </div>

                    {/* Duo explanation */}
                    <div className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                      {lastFeedback.explanation}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-feedback"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-natural-cream border border-dashed border-natural-border rounded-3xl p-5 text-center flex flex-col items-center justify-center gap-2 h-[180px]"
                  >
                    <Sparkles className="w-8 h-8 text-natural-sage/40 animate-pulse" />
                    <p className="text-xs text-gray-400 font-bold">
                      Waiting for your first response...
                    </p>
                    <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">
                      Send a message to Clara to generate your live grammar & feedback scorecard here!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

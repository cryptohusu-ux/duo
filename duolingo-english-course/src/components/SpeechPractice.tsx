/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, Award, Sparkles, CheckCircle2, ChevronRight, RefreshCw, AlertTriangle } from 'lucide-react';
import { speakEnglish, soundSynth } from '../utils/audio';

interface SpeechPracticeProps {
  onAwardGems: (gems: number) => void;
  nativeLanguage: 'es' | 'fr' | 'de' | 'it' | 'tr' | 'az';
}

interface PracticePhrase {
  sentence: string;
  translations: {
    es: string;
    fr: string;
    de: string;
    it: string;
    tr: string;
    az: string;
  };
  category: 'Basic' | 'Travel' | 'Business' | 'Casual';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const PRACTICE_PHRASES: PracticePhrase[] = [
  {
    sentence: "Hello, nice to meet you",
    translations: {
      es: "Hola, mucho gusto / encantado de conocerte",
      fr: "Bonjour, ravi de vous rencontrer",
      de: "Hallo, schön Sie kennenzulernen",
      it: "Ciao, piacere di conoscerti",
      tr: "Merhaba, tanıştığımıza memnun oldum",
      az: "Salam, tanış olmağımıza şadam"
    },
    category: "Basic",
    difficulty: "Beginner"
  },
  {
    sentence: "Have a wonderful day",
    translations: {
      es: "Que tengas un día maravilloso",
      fr: "Passez une merveilleuse journée",
      de: "Hab einen wundervollen Tag",
      it: "Buona giornata meravigliosa",
      tr: "Harika bir gün geçirmeniz dileğiyle",
      az: "Gözəl bir gün keçirəsiniz"
    },
    category: "Basic",
    difficulty: "Beginner"
  },
  {
    sentence: "Where is the hotel lobby",
    translations: {
      es: "¿Dónde está el lobby del hotel?",
      fr: "Où est le hall de l'hôtel?",
      de: "Wo ist die Hotellobby?",
      it: "Dov'è la hall dell'hotel?",
      tr: "Otel lobisi nerede?",
      az: "Otel lobbisi haradadır?"
    },
    category: "Travel",
    difficulty: "Beginner"
  },
  {
    sentence: "Excuse me, where is the passport control",
    translations: {
      es: "Disculpe, ¿dónde está el control de pasaportes?",
      fr: "Excusez-moi, où est le contrôle des passeports?",
      de: "Entschuldigung, wo ist die Passkontrolle?",
      it: "Scusa, dov'è il controllo passaporti?",
      tr: "Affedersiniz, pasaport kontrolü nerede?",
      az: "Bağışlayın, pasport nəzarəti haradadır?"
    },
    category: "Travel",
    difficulty: "Intermediate"
  },
  {
    sentence: "A table for two and the menu, please",
    translations: {
      es: "Una mesa para dos y el menú, por favor",
      fr: "Une table pour deux et la carte, s'il vous plaît",
      de: "Ein Tisch für zwei und die Speisekarte, bitte",
      it: "Un tavolo per due e il menu, per favore",
      tr: "İki kişilik bir masa ve menü lütfen",
      az: "İki nəfərlik masa və menyu, zəhmət olmasa"
    },
    category: "Travel",
    difficulty: "Intermediate"
  },
  {
    sentence: "Let us schedule a meeting tomorrow",
    translations: {
      es: "Programemos una reunión mañana",
      fr: "Planifions une réunion demain",
      de: "Lass uns morgen eine Besprechung ansetzen",
      it: "Pianifichiamo un incontro domani",
      tr: "Yarın için bir toplantı planlayalım",
      az: "Sabah bir görüş planlaşdıraq"
    },
    category: "Business",
    difficulty: "Intermediate"
  },
  {
    sentence: "This project is highly important to our team",
    translations: {
      es: "Este proyecto es sumamente importante para nuestro equipo",
      fr: "Ce projet est extrêmement important pour notre équipe",
      de: "Dieses Projekt ist für unser Team von großer Bedeutung",
      it: "Questo progetto è estremamente importante per il nostro team",
      tr: "Bu proje ekibimiz için son derece önemlidir",
      az: "Bu layihə komandamız üçün olduqca vacibdir"
    },
    category: "Business",
    difficulty: "Advanced"
  },
  {
    sentence: "I agree with your marketing strategy",
    translations: {
      es: "Estoy de acuerdo con tu estrategia de marketing",
      fr: "Je suis d'accord avec votre stratégie marketing",
      de: "Ich stimme Ihrer Marketingstrategie zu",
      it: "Sono d'accordo con la tua strategia di marketing",
      tr: "Pazarlama stratejinize katılıyorum",
      az: "Sizin marketinq strategiyanızla razıyam"
    },
    category: "Business",
    difficulty: "Advanced"
  },
  {
    sentence: "I would love to learn English with you",
    translations: {
      es: "Me encantaría aprender inglés contigo",
      fr: "J'adorerais apprendre l'anglais avec vous",
      de: "Ich würde sehr gerne mit dir Englisch lernen",
      it: "Mi piacerebbe molto imparare l'inglese con te",
      tr: "Sizinle İngilizce öğrenmeyi çok isterim",
      az: "Sizinlə İngilis dili öyrənməyi çox istərdim"
    },
    category: "Casual",
    difficulty: "Intermediate"
  },
  {
    sentence: "What are your future plans for the weekend",
    translations: {
      es: "¿Cuáles son tus planes futuros para el fin de semana?",
      fr: "Quels sont vos projets futurs pour le week-end?",
      de: "Was sind deine Zukunftspläne für das Wochenende?",
      it: "Quali sono i tuoi piani futuri per il fine settimana?",
      tr: "Hafta sonu için gelecek planlarınız nelerdir?",
      az: "Həftə sonu üçün gələcək planlarınız nədir?"
    },
    category: "Casual",
    difficulty: "Intermediate"
  },
  {
    sentence: "Believe in yourself and achieve your goals",
    translations: {
      es: "Cree en ti mismo y alcanza tus metas",
      fr: "Croyez en vous-même et atteignez vos objectifs",
      de: "Glaube an dich selbst und erreiche deine Ziele",
      it: "Credi in te stesso e raggiungi i tuoi obiettivi",
      tr: "Kendine inan ve hedeflerine ulaş",
      az: "Özünə inan və hədəflərinə nail ol"
    },
    category: "Casual",
    difficulty: "Advanced"
  }
];

export default function SpeechPractice({ onAwardGems, nativeLanguage }: SpeechPracticeProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Basic' | 'Travel' | 'Business' | 'Casual'>('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [multiplierGems, setMultiplierGems] = useState(10);
  const [completedSentences, setCompletedSentences] = useState<string[]>([]);

  const recognitionRef = useRef<any>(null);

  // Filter phrases based on category
  const filteredPhrases = PRACTICE_PHRASES.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const phrase = filteredPhrases[currentIdx] || filteredPhrases[0];

  useEffect(() => {
    // Check speech API
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
        setTranscript('');
        setHasEvaluated(false);
      };

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        setTranscript(resultText);
        evaluateSpeech(resultText);
      };

      rec.onerror = (err: any) => {
        console.warn('Speech error:', err);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentIdx, activeCategory]);

  const evaluateSpeech = (spoken: string) => {
    if (!phrase) return;
    const spokenNorm = spoken.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
    const targetNorm = phrase.sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();

    // Check inclusion or exact matching
    const match = spokenNorm.includes(targetNorm) || targetNorm.includes(spokenNorm) || spokenNorm === targetNorm;
    
    setIsMatch(match);
    setHasEvaluated(true);

    if (match) {
      soundSynth.playCorrect();
      // Award gems only if not already completed in this session
      if (!completedSentences.includes(phrase.sentence)) {
        onAwardGems(multiplierGems);
        setCompletedSentences([...completedSentences, phrase.sentence]);
      }
    } else {
      soundSynth.playIncorrect();
    }
  };

  const startListening = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Mic fail:', e);
      }
    }
  };

  const playTTS = () => {
    if (phrase) {
      speakEnglish(phrase.sentence);
    }
  };

  const handleNext = () => {
    setTranscript('');
    setHasEvaluated(false);
    setIsMatch(false);
    setCurrentIdx((prev) => (prev + 1) % filteredPhrases.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 pb-24 animate-fadeIn">
      {/* Speaking Club Description Card */}
      <div className="bg-gradient-to-r from-natural-sage via-natural-darksage to-natural-brown text-white rounded-3xl p-6 mb-8 shadow-md">
        <span className="text-xs font-black uppercase bg-white/20 px-3 py-1 rounded-full">
          Duo's Speaking Club
        </span>
        <h2 className="text-2xl font-black mt-2 font-comfortaa">AI Pronunciation Practice</h2>
        <p className="text-xs text-natural-lightsage mt-1 max-w-md">
          Practice your spoken English accent directly with standard voice recognition. Pronounce phrases correctly to earn <span className="text-yellow-300 font-extrabold">💎 Gems</span> instantly!
        </p>
      </div>

      {/* Category Selection Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-natural-border">
        {(['All', 'Basic', 'Travel', 'Business', 'Casual'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIdx(0);
              setTranscript('');
              setHasEvaluated(false);
            }}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-natural-sage text-white shadow-md'
                : 'bg-natural-cream text-natural-text border border-natural-border hover:bg-natural-lightsage'
            }`}
          >
            {cat} Phrases
          </button>
        ))}
      </div>

      {/* Primary Practice Box */}
      {filteredPhrases.length > 0 && phrase && (
        <div className="bg-white border-2 border-natural-border rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-sm mt-4">
          {/* Card Headers */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black uppercase text-natural-brown bg-natural-lightsage px-2.5 py-1 rounded-md">
              {phrase.category} Topic
            </span>
            <span className="text-[10px] font-black uppercase text-natural-darksage bg-natural-lightsage border border-natural-sage/10 px-2.5 py-1 rounded-md">
              {phrase.difficulty}
            </span>
          </div>

          {/* Master Prompt */}
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Speak this sentence:</span>
          <h1 className="text-2xl md:text-3xl font-black text-natural-text mt-2 font-comfortaa max-w-md leading-relaxed">
            "{phrase.sentence}"
          </h1>
          <p className="text-sm text-gray-500 font-medium italic mt-2">
            Translation: "{phrase.translations[nativeLanguage] || phrase.translations['es']}"
          </p>

          {/* Play Listen Speaker */}
          <button
            onClick={playTTS}
            className="mt-6 flex items-center gap-2 px-4 py-2 bg-natural-lightsage text-natural-sage hover:bg-natural-lightsage/80 rounded-2xl text-xs font-black transition-all hover:scale-105 active:scale-95 border border-natural-border shadow-sm"
          >
            <Volume2 className="w-5 h-5 text-natural-sage" /> Listen Pronunciation
          </button>

          {/* Core Recording Widget */}
          <div className="my-10 flex flex-col items-center gap-4">
            {isSpeechSupported ? (
              <div className="relative">
                <button
                  onClick={startListening}
                  className={`w-28 h-28 rounded-full flex items-center justify-center border-b-8 shadow-xl relative transition-all active:translate-y-1 active:border-b-2 ${
                    isRecording
                      ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                      : 'bg-natural-sage border-natural-darksage text-white hover:bg-natural-sage/95'
                  }`}
                >
                  <Mic className="w-12 h-12" />
                  {isRecording && (
                    <span className="absolute -inset-4 border-4 border-rose-400 rounded-full animate-ping opacity-30" />
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-natural-cream border border-natural-border p-4 rounded-2xl max-w-md text-xs font-bold text-natural-brown flex items-center gap-2">
                <MicOff className="w-5 h-5 flex-shrink-0" />
                <span>Microphone access restricted in this iframe container. Read the phrase aloud, then click "Simulate Match" to claim rewards!</span>
              </div>
            )}

            <span className="text-xs font-black text-gray-400 uppercase tracking-wider mt-1">
              {isRecording ? 'Listening... Speak now!' : 'Tap mic to start speaking'}
            </span>
          </div>

          {/* Speech Result Indicators */}
          <AnimatePresence mode="wait">
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-natural-cream border border-natural-border p-4 rounded-2xl w-full max-w-md"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase">You pronounced:</span>
                <p className="text-md font-extrabold text-natural-text mt-1 italic">"{transcript}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {hasEvaluated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-2xl w-full max-w-md border flex items-center gap-4 ${
                  isMatch
                    ? 'bg-natural-lightsage border-natural-sage/20 text-natural-darksage'
                    : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}
              >
                {isMatch ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-natural-sage fill-green-100 flex-shrink-0" />
                    <div className="text-left">
                      <h4 className="font-extrabold text-natural-darksage">Accent Matches Perfectly!</h4>
                      <p className="text-xs font-bold text-natural-sage mt-0.5">
                        {completedSentences.includes(phrase.sentence) 
                          ? 'Pronunciation mastered!' 
                          : `Awarded +💎 ${multiplierGems} Gems!`}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-10 h-10 text-rose-500 fill-rose-100 flex-shrink-0" />
                    <div className="text-left">
                      <h4 className="font-extrabold text-rose-900 font-comfortaa">Match Mismatch</h4>
                      <p className="text-xs font-bold text-rose-600 mt-0.5">
                        Try reading it again. Speak slowly and clearly!
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip/Next controls */}
          <div className="flex gap-4 mt-8 w-full max-w-md">
            {!isSpeechSupported && !hasEvaluated && (
              <button
                onClick={() => {
                  setTranscript(phrase.sentence);
                  evaluateSpeech(phrase.sentence);
                }}
                className="flex-1 py-3 px-4 bg-natural-cream border border-natural-border text-natural-brown font-extrabold rounded-2xl text-xs hover:bg-natural-lightsage transition-all flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4" /> Simulate Match
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 bg-natural-brown text-white font-bold rounded-2xl text-xs hover:bg-natural-brown/95 border-b-4 border-natural-darkbrown transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Next Sentence</span> <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

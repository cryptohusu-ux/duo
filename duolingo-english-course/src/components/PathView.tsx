/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Check, Lock, Star, Sparkles } from 'lucide-react';
import { Unit, Lesson, UserProgress } from '../types';
import MascotDuo from './MascotDuo';

interface PathViewProps {
  units: Unit[];
  progress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
}

export default function PathView({ units, progress, onStartLesson }: PathViewProps) {
  // Determine if a lesson is locked
  const isLessonLocked = (unitIndex: number, lessonIndex: number) => {
    if (unitIndex === 0 && lessonIndex === 0) return false;

    // A lesson is unlocked if the previous lesson in the unit is completed
    const currentUnit = units[unitIndex];
    if (lessonIndex > 0) {
      const prevLesson = currentUnit.lessons[lessonIndex - 1];
      return !progress.completedLessons.includes(prevLesson.id);
    }

    // First lesson of a non-first unit is unlocked if all lessons of the previous unit are completed
    const prevUnit = units[unitIndex - 1];
    const lastLessonOfPrevUnit = prevUnit.lessons[prevUnit.lessons.length - 1];
    return !progress.completedLessons.includes(lastLessonOfPrevUnit.id);
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  // Get winding path alternating margins
  const getWindingClass = (index: number) => {
    const sequence = [
      'translate-x-0',        // Center
      'translate-x-8 md:translate-x-12',   // Slight Right
      'translate-x-16 md:translate-x-24',  // Far Right
      'translate-x-8 md:translate-x-12',   // Slight Right
      'translate-x-0',        // Center
      '-translate-x-8 md:-translate-x-12', // Slight Left
      '-translate-x-16 md:-translate-x-24',// Far Left
      '-translate-x-8 md:-translate-x-12', // Slight Left
    ];
    return sequence[index % sequence.length];
  };

  const getUnitCardStyles = (index: number) => {
    const styles = [
      'bg-natural-sage border-natural-darksage shadow-natural-sage/10',
      'bg-natural-brown border-natural-darkbrown shadow-natural-brown/10',
      'bg-natural-darksage border-natural-sage shadow-natural-darksage/10',
      'bg-natural-darkbrown border-natural-brown shadow-natural-darkbrown/10'
    ];
    return styles[index % styles.length];
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 pb-24">
      {/* Dynamic Motivational Widget */}
      <div className="bg-gradient-to-r from-natural-lightsage to-natural-cream border border-natural-border rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <MascotDuo state="encouraging" costume={progress.currentCostume} size="md" />
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-black text-natural-darksage font-comfortaa">
            Ready for your English practice, champ?
          </h3>
          <p className="text-sm font-medium text-natural-text/90 mt-1 max-w-sm">
            Complete your next lesson to maintain your <span className="font-extrabold text-[#FF9600]">🔥 {progress.streak}-day streak</span>. You got this!
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="text-xs font-bold px-3 py-1 bg-white border border-natural-border text-natural-brown rounded-full shadow-sm">
              🎯 Daily Goal: {progress.todayXp} / {progress.dailyXpGoal} XP
            </span>
            <span className="text-xs font-bold px-3 py-1 bg-white border border-natural-border text-natural-sage rounded-full shadow-sm">
              💪 Hearts Remaining: {progress.hearts} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Path Core units */}
      {units.map((unit, unitIdx) => {
        const isUnitUnlocked = unitIdx === 0 || progress.completedLessons.includes(units[unitIdx - 1].lessons[units[unitIdx - 1].lessons.length - 1].id);
        const cardColorStyle = getUnitCardStyles(unitIdx);

        return (
          <div key={unit.id} className={`mb-16 ${!isUnitUnlocked ? 'opacity-50' : ''}`}>
            {/* Unit Headline Card */}
            <div className={`text-white p-6 rounded-3xl shadow-md border-b-8 ${cardColorStyle} mb-12`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full text-white/95">
                    Unit {unit.number}
                  </span>
                  <h2 className="text-2xl font-black mt-2 font-comfortaa">{unit.title}</h2>
                  <p className="text-sm font-medium text-white/90 mt-1">{unit.description}</p>
                </div>
                <div className="hidden xs:block text-5xl">
                  {unitIdx === 0 ? '👋' : unitIdx === 1 ? '✈️' : unitIdx === 2 ? '💼' : '🎉'}
                </div>
              </div>
            </div>

            {/* Path Winding Sequence */}
            <div className="relative flex flex-col items-center gap-8">
              {/* SVG Connecting Winding Line behind nodes */}
              {isUnitUnlocked && (
                <div className="absolute inset-y-12 w-2 bg-natural-border -z-10 rounded-full hidden sm:block">
                  {/* Decorative wavy trail dotted effect */}
                  <div className="h-full border-l-4 border-dashed border-natural-border w-0 mx-auto" />
                </div>
              )}

              {unit.lessons.map((lesson, lessonIdx) => {
                const locked = isLessonLocked(unitIdx, lessonIdx);
                const completed = isLessonCompleted(lesson.id);
                const isCurrent = !locked && !completed;
                const windingOffset = getWindingClass(lessonIdx);

                return (
                  <div key={lesson.id} className={`relative flex flex-col items-center ${windingOffset}`}>
                    {/* Animated Owl floating over current active lesson */}
                    {isCurrent && (
                      <motion.div
                        className="absolute -top-16 z-20"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="bg-white px-3 py-1 rounded-xl shadow-md border border-natural-border text-[10px] font-extrabold text-natural-sage animate-bounce mb-1 whitespace-nowrap">
                          START HERE!
                        </div>
                      </motion.div>
                    )}

                    {/* Round Lesson Button */}
                    <button
                      disabled={locked}
                      onClick={() => onStartLesson(lesson)}
                      className="group relative flex items-center justify-center"
                    >
                      {/* Outer Ring Circle */}
                      <span
                        className={`absolute inset-0 rounded-full scale-125 transition-all duration-300 ${
                          completed
                            ? 'bg-natural-lightsage border-4 border-natural-sage/30 animate-pulse'
                            : isCurrent
                            ? 'bg-natural-lightsage border-4 border-natural-sage scale-125'
                            : 'bg-transparent'
                        }`}
                      />

                      {/* Main Node Button Body */}
                      <div
                        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-black text-xl border-b-8 shadow-md transform transition-all active:translate-y-1 active:border-b-2 ${
                          completed
                            ? 'bg-natural-sage border-natural-darksage text-white hover:bg-natural-sage/95'
                            : isCurrent
                            ? 'bg-natural-brown border-natural-darkbrown text-white hover:bg-natural-brown/95 scale-110'
                            : 'bg-natural-cream border-natural-border text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {completed ? (
                          <Check className="w-8 h-8 text-white stroke-[4]" />
                        ) : locked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Star className="w-8 h-8 text-white fill-white animate-pulse" />
                        )}
                      </div>

                      {/* Tooltip containing Lesson Title */}
                      <div className="absolute top-22 hidden group-hover:flex flex-col items-center z-30">
                        <div className="bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap">
                          {lesson.title}
                        </div>
                        <div className="w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
                      </div>
                    </button>

                    {/* Lesson Label underneath */}
                    <span className="text-xs font-extrabold text-natural-text mt-3 font-comfortaa whitespace-nowrap">
                      {lesson.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* AD AD UNIT REQUEST INSTRUCTIONS EMBED */}
      <div className="mt-16 bg-white border-2 border-dashed border-natural-border rounded-3xl p-6 text-center">
        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Sponsored Placement</span>
        <div className="mt-4 flex justify-center items-center w-full overflow-hidden rounded-2xl bg-natural-cream p-2">
          {/* BEGIN AADS AD UNIT 2445437 */}
          <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
            <iframe 
              data-aa="2445437" 
              src="//acceptable.a-ads.com/2445437/?size=Adaptive"
              style={{ border: 0, padding: 0, width: '100%', height: '120px', overflow: 'hidden', display: 'block', margin: 'auto' }}
            />
          </div>
          {/* END AADS AD UNIT 2445437 */}
        </div>
      </div>
    </div>
  );
}

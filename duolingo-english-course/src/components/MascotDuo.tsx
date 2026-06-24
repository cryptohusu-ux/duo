/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface MascotDuoProps {
  state: 'idle' | 'happy' | 'sad' | 'shocked' | 'worried' | 'encouraging';
  costume?: string; // 'default' | 'tuxedo' | 'cowboy' | 'golden'
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MascotDuo({ state = 'idle', costume = 'default', size = 'md' }: MascotDuoProps) {
  // Determine sizing classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  // Duo the Owl primary color palette depending on costume
  const getPrimaryColor = () => {
    if (costume === 'golden') return '#FBBF24'; // Radiant Gold
    return '#58CC02'; // Duolingo Green
  };

  const getSecondaryColor = () => {
    if (costume === 'golden') return '#F59E0B'; // Darker Gold
    return '#46A302'; // Darker green
  };

  const getChestColor = () => {
    if (costume === 'golden') return '#FEF08A'; // Lighter gold
    return '#84D833'; // Pale green
  };

  const primaryColor = getPrimaryColor();
  const secondaryColor = getSecondaryColor();
  const chestColor = getChestColor();

  // Animation configurations for motion
  const getAnimation = () => {
    switch (state) {
      case 'happy':
        return {
          y: [0, -20, 0, -20, 0],
          scaleY: [1, 0.9, 1.1, 0.9, 1],
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'sad':
        return {
          y: [0, 4, 0],
          scale: [1, 0.97, 1],
          rotate: [-2, 2, -2],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'shocked':
        return {
          x: [-4, 4, -4, 4, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.2, repeat: Infinity }
        };
      case 'worried':
        return {
          rotate: [-1, 1, -1],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'encouraging':
        return {
          y: [0, -8, 0],
          scaleX: [1, 1.03, 1],
          transition: { duration: 1.5, repeat: Infinity }
        };
      case 'idle':
      default:
        return {
          y: [0, -4, 0],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]}`}>
      {/* Background sparkle for golden costume */}
      {costume === 'golden' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-yellow-300/10 rounded-full blur-xl scale-125"
        />
      )}

      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
        animate={getAnimation()}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="180" rx="60" ry="12" fill="rgba(0,0,0,0.15)" />

        {/* Duo Body Group */}
        <g id="owl-body">
          {/* Main Body */}
          <rect x="40" y="45" width="120" height="120" rx="55" fill={primaryColor} />

          {/* Feet */}
          <g id="feet">
            <ellipse cx="75" cy="170" rx="14" ry="8" fill="#FF9600" />
            <ellipse cx="125" cy="170" rx="14" ry="8" fill="#FF9600" />
          </g>

          {/* Wing Left */}
          <motion.path
            d="M40,80 C15,90 20,125 40,135"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="14"
            strokeLinecap="round"
            animate={
              state === 'happy'
                ? { rotate: [-20, 40, -20] }
                : state === 'encouraging'
                ? { rotate: [0, -15, 0] }
                : {}
            }
            style={{ transformOrigin: '40px 90px' }}
          />

          {/* Wing Right */}
          <motion.path
            d="M160,80 C185,90 180,125 160,135"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="14"
            strokeLinecap="round"
            animate={
              state === 'happy'
                ? { rotate: [20, -40, 20] }
                : state === 'encouraging'
                ? { rotate: [0, 30, 0] }
                : {}
            }
            style={{ transformOrigin: '160px 90px' }}
          />

          {/* Chest Feathers Plaque */}
          <path
            d="M60,105 C60,140 140,140 140,105 C140,95 60,95 60,105 Z"
            fill={chestColor}
          />

          {/* Tuxedo Overlay */}
          {costume === 'tuxedo' && (
            <g id="tuxedo">
              {/* White undershirt */}
              <path d="M75,90 L125,90 L100,140 Z" fill="#FFFFFF" />
              {/* Tux jacket panels */}
              <path d="M40,75 L75,90 L100,140 L40,145 Z" fill="#1E293B" />
              {/* Right panel */}
              <path d="M160,75 L125,90 L100,140 L160,145 Z" fill="#1E293B" />
              {/* Bowtie */}
              <polygon points="90,95 90,105 100,100" fill="#EF4444" />
              <polygon points="110,95 110,105 100,100" fill="#EF4444" />
              <circle cx="100" cy="100" r="3" fill="#B91C1C" />
            </g>
          )}

          {/* Cowboy Vest Overlay */}
          {costume === 'cowboy' && (
            <g id="cowboy-vest">
              {/* Brown leather vest panels */}
              <path d="M41,85 L70,95 L65,140 L41,135 Z" fill="#78350F" />
              <path d="M159,85 L130,95 L135,140 L159,135 Z" fill="#78350F" />
              {/* Sheriff badge */}
              <polygon points="55,110 58,118 66,118 60,123 62,130 55,126 48,130 50,123 44,118 52,118" fill="#FBBF24" />
            </g>
          )}

          {/* Ears / Head Tuft Outline */}
          <path d="M55,47 L70,30 L85,45" fill="none" stroke={primaryColor} strokeWidth="10" strokeLinecap="round" />
          <path d="M145,47 L130,30 L115,45" fill="none" stroke={primaryColor} strokeWidth="10" strokeLinecap="round" />

          {/* Face Elements */}
          {/* Eyes Background Ring */}
          <g id="eyes">
            {/* Eye Left */}
            <circle cx="75" cy="75" r="24" fill="#FFFFFF" />
            {/* Eye Right */}
            <circle cx="125" cy="75" r="24" fill="#FFFFFF" />

            {/* Pupils & expressions */}
            {state === 'sad' ? (
              <>
                {/* Sad downward slopes */}
                <path d="M60,78 Q75,65 90,78" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
                <path d="M110,78 Q125,65 140,78" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
                {/* Tears */}
                <circle cx="70" cy="95" r="4" fill="#3B82F6" />
                <circle cx="130" cy="95" r="4" fill="#3B82F6" />
              </>
            ) : state === 'shocked' ? (
              <>
                {/* Huge wide pupils */}
                <circle cx="75" cy="75" r="14" fill="#1F2937" />
                <circle cx="125" cy="75" r="14" fill="#1F2937" />
                <circle cx="71" cy="71" r="5" fill="#FFFFFF" />
                <circle cx="121" cy="71" r="5" fill="#FFFFFF" />
              </>
            ) : state === 'happy' ? (
              <>
                {/* Laughing crescent eyes */}
                <path d="M63,80 Q75,63 87,80" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
                <path d="M113,80 Q125,63 137,80" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
              </>
            ) : state === 'worried' ? (
              <>
                {/* Worried squiggles or small pupils looking sideways */}
                <circle cx="71" cy="75" r="8" fill="#1F2937" />
                <circle cx="121" cy="75" r="8" fill="#1F2937" />
                {/* Eyebrows */}
                <path d="M60,52 Q75,56 90,48" fill="none" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
                <path d="M110,48 Q125,56 140,52" fill="none" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Default large cute eyes */}
                <circle cx="75" cy="75" r="10" fill="#1F2937" />
                <circle cx="125" cy="75" r="10" fill="#1F2937" />
                <circle cx="72" cy="71" r="3" fill="#FFFFFF" />
                <circle cx="122" cy="71" r="3" fill="#FFFFFF" />
              </>
            )}
          </g>

          {/* Orange Beak */}
          <g id="beak">
            {state === 'happy' ? (
              <path d="M90,83 L110,83 L100,105 Z" fill="#FF9600" />
            ) : state === 'sad' ? (
              <path d="M90,92 L110,92 L100,80 Z" fill="#FF9600" />
            ) : (
              <polygon points="88,83 112,83 100,98" fill="#FF9600" />
            )}
          </g>

          {/* Cowboy Hat Overlay */}
          {costume === 'cowboy' && (
            <g id="cowboy-hat" transform="translate(0, -5)">
              {/* Brim */}
              <path d="M30,35 Q100,15 170,35 Q100,32 30,35 Z" fill="#92400E" />
              {/* Hat crown */}
              <path d="M60,32 Q58,5 100,8 Q142,5 140,32 Z" fill="#78350F" />
              {/* Hat band */}
              <path d="M61,28 Q100,24 139,28 L138,32 Q100,28 62,32 Z" fill="#EF4444" />
            </g>
          )}
        </g>
      </motion.svg>
    </div>
  );
}

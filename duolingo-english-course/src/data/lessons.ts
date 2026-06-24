/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit, QuestionType } from '../types';

export const UNITS: Unit[] = [
  {
    id: 'unit_1',
    number: 1,
    title: 'Greetings & Daily Basics',
    description: 'Master simple hello\'s, pronouns, and basic daily objects.',
    colorClass: 'bg-emerald-500 border-emerald-600 shadow-emerald-700/50',
    lessons: [
      {
        id: 'u1_l1',
        title: 'Meeting People',
        description: 'Learn simple introductions, greetings, and asking names.',
        xpReward: 15,
        gemReward: 5,
        questions: [
          {
            id: 'u1_l1_q1',
            type: QuestionType.CHOICE,
            prompt: 'Select the correct word for "Hello"',
            sentence: 'Hello',
            nativeTranslations: {
              es: 'Hola',
              fr: 'Bonjour',
              de: 'Hallo',
              it: 'Ciao'
            },
            options: ['Goodbye', 'Hello', 'Water', 'Apple'],
            correctAnswer: 'Hello'
          },
          {
            id: 'u1_l1_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate this sentence into English',
            sentence: 'I am a boy',
            nativeTranslations: {
              es: 'Yo soy un niño',
              fr: 'Je suis un garçon',
              de: 'Ich bin ein Junge',
              it: 'Io sono un ragazzo'
            },
            options: ['boy', 'girl', 'a', 'cat', 'am', 'I'],
            correctAnswer: 'I am a boy'
          },
          {
            id: 'u1_l1_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and write what you hear',
            sentence: 'Nice to meet you',
            nativeTranslations: {
              es: 'Mucho gusto / Encantado de conocerte',
              fr: 'Ravi de vous rencontrer',
              de: 'Schön, Sie kennenzulernen',
              it: 'Piacere di conoscerti'
            },
            options: ['Nice', 'meet', 'to', 'you', 'eat', 'be', 'happy'],
            correctAnswer: 'Nice to meet you'
          },
          {
            id: 'u1_l1_q4',
            type: QuestionType.SPEAK,
            prompt: 'Tap to speak this English sentence',
            sentence: 'How are you',
            nativeTranslations: {
              es: '¿Cómo estás?',
              fr: 'Comment ça va ?',
              de: 'Wie geht es dir?',
              it: 'Come stai?'
            },
            correctAnswer: 'how are you'
          },
          {
            id: 'u1_l1_q5',
            type: QuestionType.MATCH,
            prompt: 'Match the pairs correctly',
            sentence: '',
            nativeTranslations: {},
            correctAnswer: '',
            pairs: [
              { english: 'Man', native: { es: 'Hombre', fr: 'Homme', de: 'Mann', it: 'Uomo' } },
              { english: 'Woman', native: { es: 'Mujer', fr: 'Femme', de: 'Frau', it: 'Donna' } },
              { english: 'Thank you', native: { es: 'Gracias', fr: 'Merci', de: 'Danke', it: 'Grazie' } },
              { english: 'Please', native: { es: 'Por favor', fr: 'S\'il vous plaît', de: 'Bitte', it: 'Per favore' } },
              { english: 'Yes', native: { es: 'Sí', fr: 'Oui', de: 'Ja', it: 'Sì' } }
            ]
          }
        ]
      },
      {
        id: 'u1_l2',
        title: 'Simple Descriptions',
        description: 'Describe colors, sizes, and everyday household items.',
        xpReward: 15,
        gemReward: 5,
        questions: [
          {
            id: 'u1_l2_q1',
            type: QuestionType.CHOICE,
            prompt: 'Select the English translation for "El coche rojo" / "La voiture rouge"',
            sentence: 'The red car',
            nativeTranslations: {
              es: 'El coche rojo',
              fr: 'La voiture rouge',
              de: 'Das rote Auto',
              it: 'L\'auto rossa'
            },
            options: ['The red car', 'A big apple', 'A blue house', 'The red cat'],
            correctAnswer: 'The red car'
          },
          {
            id: 'u1_l2_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate this sentence into English',
            sentence: 'The house is big',
            nativeTranslations: {
              es: 'La casa es grande',
              fr: 'La maison est grande',
              de: 'Das Haus ist groß',
              it: 'La casa è grande'
            },
            options: ['big', 'is', 'blue', 'cat', 'house', 'The'],
            correctAnswer: 'The house is big'
          },
          {
            id: 'u1_l2_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and click the correct matching words',
            sentence: 'I have a black cat',
            nativeTranslations: {
              es: 'Yo tengo un gato negro',
              fr: 'J\'ai un chat noir',
              de: 'Ich habe eine schwarze Katze',
              it: 'Ho un gatto nero'
            },
            options: ['black', 'cat', 'have', 'I', 'a', 'dog', 'white'],
            correctAnswer: 'I have a black cat'
          },
          {
            id: 'u1_l2_q4',
            type: QuestionType.SPEAK,
            prompt: 'Tap and practice your speaking',
            sentence: 'This is a small table',
            nativeTranslations: {
              es: 'Esta es una mesa pequeña',
              fr: 'Ceci est une petite table',
              de: 'Das ist ein kleiner Tisch',
              it: 'Questo è un piccolo tavolo'
            },
            correctAnswer: 'this is a small table'
          },
          {
            id: 'u1_l2_q5',
            type: QuestionType.MATCH,
            prompt: 'Match these items',
            sentence: '',
            nativeTranslations: {},
            correctAnswer: '',
            pairs: [
              { english: 'Book', native: { es: 'Libro', fr: 'Livre', de: 'Buch', it: 'Libro' } },
              { english: 'Key', native: { es: 'Llave', fr: 'Clé', de: 'Schlüssel', it: 'Chiave' } },
              { english: 'Chair', native: { es: 'Silla', fr: 'Chaise', de: 'Stuhl', it: 'Sedia' } },
              { english: 'Window', native: { es: 'Ventana', fr: 'Fenêtre', de: 'Fenster', it: 'Finestra' } },
              { english: 'Water', native: { es: 'Agua', fr: 'Eau', de: 'Wasser', it: 'Acqua' } }
            ]
          }
        ]
      },
      {
        id: 'u1_l3',
        title: 'Simple Actions',
        description: 'Acquire high-frequency verbs for daily movements.',
        xpReward: 20,
        gemReward: 6,
        questions: [
          {
            id: 'u1_l3_q1',
            type: QuestionType.CHOICE,
            prompt: 'What does "They run in the park" mean?',
            sentence: 'They run in the park',
            nativeTranslations: {
              es: 'Ellos corren en el parque',
              fr: 'Ils courent dans le parc',
              de: 'Sie rennen im Park',
              it: 'Corrono nel parco'
            },
            options: ['Ellos corren en el parque', 'Nosotros comemos manzanas', 'Ella lee un libro', 'Él camina a casa'],
            correctAnswer: 'Ellos corren en el parque'
          },
          {
            id: 'u1_l3_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate into English',
            sentence: 'We drink cold water',
            nativeTranslations: {
              es: 'Nosotros bebemos agua fría',
              fr: 'Nous buvons de l\'eau froide',
              de: 'Wir trinken kaltes Wasser',
              it: 'Beviamo acqua fredda'
            },
            options: ['drink', 'water', 'hot', 'We', 'milk', 'cold'],
            correctAnswer: 'We drink cold water'
          },
          {
            id: 'u1_l3_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and write what you hear',
            sentence: 'She reads a newspaper',
            nativeTranslations: {
              es: 'Ella lee un periódico',
              fr: 'Elle lit un journal',
              de: 'Sie liest eine Zeitung',
              it: 'Lei legge un giornale'
            },
            options: ['She', 'reads', 'book', 'newspaper', 'writes', 'a'],
            correctAnswer: 'She reads a newspaper'
          },
          {
            id: 'u1_l3_q4',
            type: QuestionType.SPEAK,
            prompt: 'Read this sentence clearly',
            sentence: 'I eat bread every morning',
            nativeTranslations: {
              es: 'Como pan todas las mañanas',
              fr: 'Je mange du pain tous les matins',
              de: 'Ich esse jeden Morgen Brot',
              it: 'Mangio pane ogni mattina'
            },
            correctAnswer: 'i eat bread every morning'
          }
        ]
      }
    ]
  },
  {
    id: 'unit_2',
    number: 2,
    title: 'Travel & Navigation',
    description: 'Learn to ask for directions, navigate airports, and order food.',
    colorClass: 'bg-blue-500 border-blue-600 shadow-blue-700/50',
    lessons: [
      {
        id: 'u2_l1',
        title: 'Asking Directions',
        description: 'Inquire where places are and understand simple street directions.',
        xpReward: 20,
        gemReward: 6,
        questions: [
          {
            id: 'u2_l1_q1',
            type: QuestionType.CHOICE,
            prompt: 'Select the English translation for: "¿Dónde está la estación de tren?"',
            sentence: 'Where is the train station',
            nativeTranslations: {
              es: '¿Dónde está la estación de tren?',
              fr: 'Où est la gare ferroviaire ?',
              de: 'Wo ist der Bahnhof?',
              it: 'Dov\'è la stazione ferroviaria?'
            },
            options: ['Where is the train station', 'Is the bus near here', 'Where is my hotel room', 'Go straight to the hotel'],
            correctAnswer: 'Where is the train station'
          },
          {
            id: 'u2_l1_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate into English',
            sentence: 'Turn left at the hotel',
            nativeTranslations: {
              es: 'Gira a la izquierda en el hotel',
              fr: 'Tournez à gauche à l\'hôtel',
              de: 'Biegen Sie am Hotel links ab',
              it: 'Gira a sinistra all\'hotel'
            },
            options: ['Turn', 'right', 'left', 'at', 'the', 'hotel', 'street'],
            correctAnswer: 'Turn left at the hotel'
          },
          {
            id: 'u2_l1_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen carefully and select the words',
            sentence: 'The airport is very far',
            nativeTranslations: {
              es: 'El aeropuerto está muy lejos',
              fr: 'L\'aéroport est très loin',
              de: 'Der Flughafen ist sehr weit weg',
              it: 'L\'aeroporto è molto lontano'
            },
            options: ['The', 'airport', 'is', 'close', 'very', 'far', 'hotel'],
            correctAnswer: 'The airport is very far'
          },
          {
            id: 'u2_l1_q4',
            type: QuestionType.SPEAK,
            prompt: 'Speak this essential travel phrase',
            sentence: 'Excuse me where is my passport',
            nativeTranslations: {
              es: 'Disculpe, ¿dónde está mi pasaporte?',
              fr: 'Excusez-moi, où est mon passeport ?',
              de: 'Entschuldigung, wo ist mein Reisepass?',
              it: 'Scusa, dov\'è il mio passaporto?'
            },
            correctAnswer: 'excuse me where is my passport'
          },
          {
            id: 'u2_l1_q5',
            type: QuestionType.MATCH,
            prompt: 'Match street words',
            sentence: '',
            nativeTranslations: {},
            correctAnswer: '',
            pairs: [
              { english: 'Left', native: { es: 'Izquierda', fr: 'Gauche', de: 'Links', it: 'Sinistra' } },
              { english: 'Right', native: { es: 'Derecha', fr: 'Droite', de: 'Rechts', it: 'Destra' } },
              { english: 'Straight', native: { es: 'Derecho / Recto', fr: 'Tout droit', de: 'Geradeaus', it: 'Dritto' } },
              { english: 'Street', native: { es: 'Calle', fr: 'Rue', de: 'Straße', it: 'Via / Strada' } },
              { english: 'Map', native: { es: 'Mapa', fr: 'Carte', de: 'Karte', it: 'Mappa' } }
            ]
          }
        ]
      },
      {
        id: 'u2_l2',
        title: 'Ordering Food',
        description: 'Interact with restaurant staff, ask for a menu, and order drinks.',
        xpReward: 20,
        gemReward: 6,
        questions: [
          {
            id: 'u2_l2_q1',
            type: QuestionType.CHOICE,
            prompt: 'What is the translation for: "Una mesa para dos, por favor"',
            sentence: 'A table for two please',
            nativeTranslations: {
              es: 'Una mesa para dos, por favor',
              fr: 'Une table pour deux, s\'il vous plaît',
              de: 'Ein Tisch für zwei Personen, bitte',
              it: 'Un tavolo per due, per favore'
            },
            options: ['A menu please', 'A cup of tea', 'A table for two please', 'Can I pay the bill'],
            correctAnswer: 'A table for two please'
          },
          {
            id: 'u2_l2_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate into English',
            sentence: 'I would like a glass of water',
            nativeTranslations: {
              es: 'Me gustaría un vaso de agua',
              fr: 'Je voudrais un verre d\'eau',
              de: 'Ich hätte gerne ein Glas Wasser',
              it: 'Vorrei un bicchiere d\'acqua'
            },
            options: ['would', 'like', 'I', 'a', 'glass', 'of', 'tea', 'water'],
            correctAnswer: 'I would like a glass of water'
          },
          {
            id: 'u2_l2_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and write the phrase',
            sentence: 'May I have the menu please',
            nativeTranslations: {
              es: '¿Me permite ver el menú, por favor?',
              fr: 'Puis-je avoir le menu s\'il vous plaît ?',
              de: 'Kann ich bitte die Speisekarte haben?',
              it: 'Posso avere il menu, per favore?'
            },
            options: ['menu', 'May', 'I', 'have', 'the', 'please', 'food', 'check'],
            correctAnswer: 'May I have the menu please'
          },
          {
            id: 'u2_l2_q4',
            type: QuestionType.SPEAK,
            prompt: 'Ask for the bill clearly',
            sentence: 'Check please thank you',
            nativeTranslations: {
              es: 'La cuenta por favor, gracias',
              fr: 'L\'addition s\'il vous plaît, merci',
              de: 'Die Rechnung bitte, danke',
              it: 'Il conto per favore, grazie'
            },
            correctAnswer: 'check please thank you'
          }
        ]
      }
    ]
  },
  {
    id: 'unit_3',
    number: 3,
    title: 'Work & Professional Life',
    description: 'Learn office vocabulary, simple professional emails, and meeting terms.',
    colorClass: 'bg-indigo-500 border-indigo-600 shadow-indigo-700/50',
    lessons: [
      {
        id: 'u3_l1',
        title: 'Meeting & Emailing',
        description: 'Schedule a time to discuss projects and write professional phrases.',
        xpReward: 25,
        gemReward: 7,
        questions: [
          {
            id: 'u3_l1_q1',
            type: QuestionType.CHOICE,
            prompt: 'Translate to English: "Envíame un correo electrónico mañana"',
            sentence: 'Send me an email tomorrow',
            nativeTranslations: {
              es: 'Envíame un correo electrónico mañana',
              fr: 'Envoyez-moi un e-mail demain',
              de: 'Senden Sie mir morgen eine E-Mail',
              it: 'Inviami un\'email domani'
            },
            options: ['Send me an email tomorrow', 'Meet me in the room', 'I will write a letter today', 'Call me in the evening'],
            correctAnswer: 'Send me an email tomorrow'
          },
          {
            id: 'u3_l1_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate into English',
            sentence: 'Let us meet at three o clock',
            nativeTranslations: {
              es: 'Reunámonos a las tres en punto',
              fr: 'Réunissons-nous à trois heures',
              de: 'Treffen wir uns um drei Uhr',
              it: 'Incontriamoci alle tre in punto'
            },
            options: ['meet', 'at', 'us', 'Let', 'three', 'o', 'clock', 'time'],
            correctAnswer: 'Let us meet at three o clock'
          },
          {
            id: 'u3_l1_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and transcribe the office sentence',
            sentence: 'This project is very important',
            nativeTranslations: {
              es: 'Este proyecto es muy importante',
              fr: 'Ce projet est très important',
              de: 'Dieses Projekt ist sehr wichtig',
              it: 'Questo progetto è molto importante'
            },
            options: ['project', 'is', 'very', 'important', 'My', 'This', 'hard'],
            correctAnswer: 'This project is very important'
          },
          {
            id: 'u3_l1_q4',
            type: QuestionType.SPEAK,
            prompt: 'Express this professional opinion',
            sentence: 'I agree with your proposal',
            nativeTranslations: {
              es: 'Estoy de acuerdo con tu propuesta',
              fr: 'Je suis d\'accord avec votre proposition',
              de: 'Ich stimme Ihrem Vorschlag zu',
              it: 'Sono d\'accordo con la tua proposta'
            },
            correctAnswer: 'i agree with your proposal'
          },
          {
            id: 'u3_l1_q5',
            type: QuestionType.MATCH,
            prompt: 'Match office terms',
            sentence: '',
            nativeTranslations: {},
            correctAnswer: '',
            pairs: [
              { english: 'Office', native: { es: 'Oficina', fr: 'Bureau', de: 'Büro', it: 'Ufficio' } },
              { english: 'Manager', native: { es: 'Gerente / Jefe', fr: 'Directeur / Manager', de: 'Manager', it: 'Manager' } },
              { english: 'Meeting', native: { es: 'Reunión', fr: 'Réunion', de: 'Besprechung', it: 'Riunione' } },
              { english: 'Computer', native: { es: 'Computadora', fr: 'Ordinateur', de: 'Computer', it: 'Computer' } },
              { english: 'Job', native: { es: 'Trabajo / Empleo', fr: 'Emploi / Job', de: 'Arbeit / Beruf', it: 'Lavoro' } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'unit_4',
    number: 4,
    title: 'Socializing & Future',
    description: 'Talk about your hobbies, plans, and discuss life experiences.',
    colorClass: 'bg-violet-500 border-violet-600 shadow-violet-700/50',
    lessons: [
      {
        id: 'u4_l1',
        title: 'Future Plans',
        description: 'Formulate sentences about what you intend to do.',
        xpReward: 25,
        gemReward: 8,
        questions: [
          {
            id: 'u4_l1_q1',
            type: QuestionType.CHOICE,
            prompt: 'Which sentence describes future vacation plans?',
            sentence: 'I am going to travel next month',
            nativeTranslations: {
              es: 'Voy a viajar el próximo mes',
              fr: 'Je vais voyager le mois prochain',
              de: 'Ich werde nächsten Monat reisen',
              it: 'Viaggerò il mese prossimo'
            },
            options: ['I am going to travel next month', 'I traveled last month', 'I like traveling in general', 'I hate packing my bags'],
            correctAnswer: 'I am going to travel next month'
          },
          {
            id: 'u4_l1_q2',
            type: QuestionType.TRANSLATE,
            prompt: 'Translate to English',
            sentence: 'What are you doing this weekend',
            nativeTranslations: {
              es: '¿Qué vas a hacer este fin de semana?',
              fr: 'Que fais-tu ce week-end ?',
              de: 'Was machst du dieses Wochenende?',
              it: 'Cosa fai questo fine settimana?'
            },
            options: ['are', 'What', 'you', 'doing', 'this', 'weekend', 'day'],
            correctAnswer: 'What are you doing this weekend'
          },
          {
            id: 'u4_l1_q3',
            type: QuestionType.LISTEN,
            prompt: 'Listen and click the word bubbles',
            sentence: 'My dream is to learn English fluently',
            nativeTranslations: {
              es: 'Mi sueño es aprender inglés con fluidez',
              fr: 'Mon rêve est d\'apprendre l\'anglais couramment',
              de: 'Mein Traum ist es, fließend Englisch zu lernen',
              it: 'Il mio sogno è imparare l\'inglese correntemente'
            },
            options: ['My', 'dream', 'is', 'to', 'learn', 'English', 'fluently', 'write'],
            correctAnswer: 'My dream is to learn English fluently'
          },
          {
            id: 'u4_l1_q4',
            type: QuestionType.SPEAK,
            prompt: 'Speak this powerful optimistic sentence',
            sentence: 'I will achieve all my personal goals',
            nativeTranslations: {
              es: 'Lograré todas mis metas personales',
              fr: 'Je vais atteindre tous mes objectifs personnels',
              de: 'Ich werde alle meine persönlichen Ziele erreichen',
              it: 'Raggiungerò tutti i miei obiettivi personali'
            },
            correctAnswer: 'i will achieve all my personal goals'
          }
        ]
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: { [key: string]: string }[] = [
  { name: 'Sophie Bernard', country: '🇫🇷', baseXP: '340' },
  { name: 'Mateo Garcia', country: '🇪🇸', baseXP: '280' },
  { name: 'Lukas Schmid', country: '🇩🇪', baseXP: '220' },
  { name: 'Elena Rossi', country: '🇮🇹', baseXP: '190' },
  { name: 'Arthur Pendelton', country: '🇬🇧', baseXP: '150' },
  { name: 'Yuki Sato', country: '🇯🇵', baseXP: '110' },
  { name: 'Gabriel Silva', country: '🇧🇷', baseXP: '90' }
];

export const STORE_ITEMS = [
  {
    id: 'refill_hearts',
    name: 'Refill Hearts',
    description: 'Instantly restore your lives to 5 so you can keep studying without interruption!',
    cost: 150,
    type: 'hearts' as const,
    iconName: 'HeartHandshake'
  },
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protects your daily streak if you forget to practice for a full day. Automatic use.',
    cost: 250,
    type: 'freeze' as const,
    iconName: 'Snowflake'
  },
  {
    id: 'costume_tuxedo',
    name: 'Dapper Tuxedo Duo',
    description: 'Dress Duo the Owl in a sophisticated, formal tuxedo. Let\'s learn with style!',
    cost: 350,
    type: 'costume' as const,
    costumeId: 'tuxedo',
    iconName: 'Shirt'
  },
  {
    id: 'costume_cowboy',
    name: 'Wild West Cowboy Duo',
    description: 'Y\'all ready for some English? Outfits Duo with a cool Stetson hat and leather vest.',
    cost: 400,
    type: 'costume' as const,
    costumeId: 'cowboy',
    iconName: 'Crown'
  },
  {
    id: 'costume_golden',
    name: 'Golden Gilded Duo',
    description: 'A glowing, majestic gold costume that reflects supreme mastery and high streaks.',
    cost: 600,
    type: 'costume' as const,
    costumeId: 'golden',
    iconName: 'Sparkles'
  }
];

export const VOCABULARY_LIST = [
  { english: 'Hello', native: { es: 'Hola', fr: 'Bonjour', de: 'Hallo', it: 'Ciao' }, pos: 'Noun / Interjection', ex: 'Hello, how are you?', ext: { es: 'Hola, ¿cómo estás?', fr: 'Bonjour, comment ça va ?', de: 'Hallo, wie geht es dir?', it: 'Ciao, come stai?' } },
  { english: 'Please', native: { es: 'Por favor', fr: 'S\'il vous plaît', de: 'Bitte', it: 'Per favore' }, pos: 'Adverb', ex: 'A glass of water, please.', ext: { es: 'Un vaso de agua, por favor.', fr: 'Un verre d\'eau, s\'il vous plaît.', de: 'Ein Glas Wasser, bitte.', it: 'Un bicchiere d\'acqua, per favore.' } },
  { english: 'Excuse me', native: { es: 'Disculpe / Con permiso', fr: 'Excusez-moi', de: 'Entschuldigung', it: 'Scusa' }, pos: 'Phrase', ex: 'Excuse me, is this the train to London?', ext: { es: 'Disculpe, ¿es este el tren a Londres?', fr: 'Excusez-moi, est-ce le train pour Londres ?', de: 'Entschuldigung, ist das der Zug nach London?', it: 'Scusa, è questo il treno per Londra?' } },
  { english: 'Thank you', native: { es: 'Gracias', fr: 'Merci', de: 'Danke', it: 'Grazie' }, pos: 'Phrase', ex: 'Thank you for your help.', ext: { es: 'Gracias por tu ayuda.', fr: 'Merci pour votre aide.', de: 'Danke für deine Hilfe.', it: 'Grazie per il tuo aiuto.' } },
  { english: 'Where', native: { es: 'Dónde', fr: 'Où', de: 'Wo', it: 'Dove' }, pos: 'Adverb / Pronoun', ex: 'Where is the nearest restaurant?', ext: { es: '¿Dónde está el restaurante más cercano?', fr: 'Où se trouve le restaurant le plus proche ?', de: 'Wo ist das nächste Restaurant?', it: 'Dov\'è il ristorante più vicino?' } },
  { english: 'Airport', native: { es: 'Aeropuerto', fr: 'Aéroport', de: 'Flughafen', it: 'Aeroporto' }, pos: 'Noun', ex: 'We must leave for the airport now.', ext: { es: 'Debemos salir para el aeropuerto ahora.', fr: 'Nous devons partir pour l\'aéroport maintenant.', de: 'Wir müssen jetzt zum Flughafen aufbrechen.', it: 'Dobbiamo partire per l\'aeroporto adesso.' } },
  { english: 'Meeting', native: { es: 'Reunión', fr: 'Réunion', de: 'Besprechung / Meeting', it: 'Riunione' }, pos: 'Noun', ex: 'Our business meeting starts at three o\'clock.', ext: { es: 'Nuestra reunión de negocios comienza a las tres en punto.', fr: 'Notre réunion d\'affaires commence à trois heures.', de: 'Unsere geschäftliche Besprechung beginnt um drei Uhr.', it: 'La nostra riunione d\'affari inizia alle tre.' } },
  { english: 'Agreement', native: { es: 'Acuerdo', fr: 'Accord', de: 'Vereinbarung', it: 'Accordo' }, pos: 'Noun', ex: 'We finally reached an agreement.', ext: { es: 'Finalmente llegamos a un acuerdo.', fr: 'Nous sommes finalement parvenus à un accord.', de: 'Wir haben uns schließlich geeinigt.', it: 'Finalmente abbiamo raggiunto un accordo.' } }
];

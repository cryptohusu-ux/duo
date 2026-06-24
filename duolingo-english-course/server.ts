/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON middleware for POST requests
app.use(express.json());

// Initialize Gemini API securely server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Endpoint for Interactive AI Adventure
app.post('/api/adventure', async (req, res) => {
  try {
    const { action } = req.body;

    if (action === 'translate') {
      const { text, targetLang } = req.body;
      const langMap: { [key: string]: string } = {
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        it: 'Italian',
        tr: 'Turkish',
        az: 'Azerbaijani'
      };
      const languageName = langMap[targetLang] || 'Spanish';

      const prompt = `Translate the following English sentence to ${languageName}:
"${text}"

Return a simple JSON matching this schema:
{
  "translation": "..."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translation: { type: Type.STRING }
            },
            required: ['translation']
          }
        }
      });

      if (response && response.text) {
        const data = JSON.parse(response.text);
        return res.json(data);
      }
      return res.status(500).json({ error: 'Failed to generate translation' });
    }

    if (action === 'respond') {
      const { scenarioId, characterName, roleDescription, chatHistory, turn, nativeLang } = req.body;
      const langMap: { [key: string]: string } = {
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        it: 'Italian',
        tr: 'Turkish',
        az: 'Azerbaijani'
      };
      const userNativeLanguage = langMap[nativeLang] || 'Spanish';

      // Build context and instruction
      const systemInstruction = `You are the backend engine for an interactive, gamified English learning roleplay game.
The user is speaking to '${characterName}' who acts as '${roleDescription}'.
The current turn of the interaction is ${turn} out of 5.

Based on the conversation history:
${JSON.stringify(chatHistory)}

Formulate a structured JSON output with:
1. "characterResponse": The NPC's next natural, contextual, and polite response in English (1-2 sentences max).
2. "noticeMessage": Duo the Owl's helpful coaching tip (e.g., teaching vocabulary, offering encouragement, or suggesting alternatives in English).
3. "suggestions": A list of exactly 3 distinct, contextually valid phrases (all in English) the user could say next. Variety is key: one polite, one casual, one creative.
4. "feedback": A review scorecard of the user's LAST message in the history.
   - "score": An integer from 0 to 100 evaluating grammar, naturalness, and conversational suitability.
   - "grammarCorrection": Corrected sentence. If the sentence was perfect, output "Perfect!".
   - "explanation": A friendly, brief 1-sentence breakdown of the grammatical feedback.
5. "mascotEmotion": Duo's current visual state based on user performance. Select from: "happy" (score >= 90), "encouraging" (75 <= score < 90), "worried" (score < 75), "shocked", "sad", "idle".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: systemInstruction,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              characterResponse: { type: Type.STRING },
              noticeMessage: { type: Type.STRING },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              feedback: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER },
                  grammarCorrection: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['score', 'grammarCorrection', 'explanation']
              },
              mascotEmotion: { type: Type.STRING }
            },
            required: ['characterResponse', 'noticeMessage', 'suggestions', 'feedback', 'mascotEmotion']
          }
        }
      });

      if (response && response.text) {
        const data = JSON.parse(response.text);
        return res.json(data);
      }
      return res.status(500).json({ error: 'Failed to generate adventure response' });
    }

    return res.status(400).json({ error: 'Invalid action parameter' });

  } catch (error: any) {
    console.error('Adventure API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// API Endpoint for Interactive AI Lesson Generation
app.post('/api/generate-lesson', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'Missing topic parameter' });
    }

    const systemInstruction = `You are a professional ESL (English as a Second Language) curriculum developer.
Generate an immersive, highly-engaging English language learning lesson of exactly 5 questions based on the topic: "${topic}".
The lesson must contain five questions with the following specific types:
Question 1: CHOICE (Multiple choice, e.g. select correct translation or fill-in-the-blank)
Question 2: TRANSLATE (Translate sentence by picking words from a word bank)
Question 3: LISTEN (Hear sentence and build it, prompt is "Listen and write what you hear")
Question 4: SPEAK (Speak the sentence out loud)
Question 5: MATCH (Match 5 English vocabulary words with their translations)

For Question 1 (CHOICE):
- prompt: In English or native translation.
- options: Exactly 4 distinct English words or sentences.
- correctAnswer: Must match exactly one of the options.

For Question 2 (TRANSLATE) and Question 3 (LISTEN):
- options: Exactly 8 single-word word bank elements in English, which contains all the words required to construct the correctAnswer sentence, plus a couple of decoy words.
- correctAnswer: The full constructed correct English sentence (e.g. "I love fresh apples").

For Question 4 (SPEAK):
- sentence: A practical English sentence for the topic.
- correctAnswer: The lowercase normalized version of the sentence.

For Question 5 (MATCH):
- pairs: A list of exactly 5 words/phrases. Each pair must contain "english" (the English word) and "native" (an object with languages 'es', 'fr', 'de', 'it', 'tr', 'az' as keys and their translations as values).

Every question must provide 'nativeTranslations' with correct translations for 'es' (Spanish), 'fr' (French), 'de' (German), 'it' (Italian), 'tr' (Turkish), and 'az' (Azerbaijani).

Return a single JSON matching this exact schema:
{
  "id": "custom_lesson_generated",
  "title": "A short, engaging title based on the topic",
  "description": "A description outlining what the user will learn",
  "xpReward": 35,
  "gemReward": 10,
  "questions": [
    {
      "id": "q1",
      "type": "CHOICE",
      "prompt": "...",
      "sentence": "The English sentence or blank phrase if applicable",
      "nativeTranslations": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." },
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "..."
    },
    {
      "id": "q2",
      "type": "TRANSLATE",
      "prompt": "Translate this sentence into English",
      "sentence": "The English target sentence",
      "nativeTranslations": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." },
      "options": ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8"],
      "correctAnswer": "The full correct sentence"
    },
    {
      "id": "q3",
      "type": "LISTEN",
      "prompt": "Listen and write what you hear",
      "sentence": "The English sentence they listen to",
      "nativeTranslations": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." },
      "options": ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8"],
      "correctAnswer": "The full correct sentence"
    },
    {
      "id": "q4",
      "type": "SPEAK",
      "prompt": "Tap to speak this English sentence",
      "sentence": "A simple sentence to say",
      "nativeTranslations": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." },
      "correctAnswer": "lowercase version of sentence"
    },
    {
      "id": "q5",
      "type": "MATCH",
      "prompt": "Match the pairs correctly",
      "sentence": "",
      "nativeTranslations": {},
      "correctAnswer": "",
      "pairs": [
        { "english": "WordA", "native": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." } },
        { "english": "WordB", "native": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." } },
        { "english": "WordC", "native": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." } },
        { "english": "WordD", "native": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." } },
        { "english": "WordE", "native": { "es": "...", "fr": "...", "de": "...", "it": "...", "tr": "...", "az": "..." } }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: systemInstruction,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            xpReward: { type: Type.INTEGER },
            gemReward: { type: Type.INTEGER },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  sentence: { type: Type.STRING },
                  nativeTranslations: {
                    type: Type.OBJECT,
                    properties: {
                      es: { type: Type.STRING },
                      fr: { type: Type.STRING },
                      de: { type: Type.STRING },
                      it: { type: Type.STRING },
                      tr: { type: Type.STRING },
                      az: { type: Type.STRING }
                    },
                    required: ['es', 'fr', 'de', 'it', 'tr', 'az']
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.STRING },
                  pairs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        english: { type: Type.STRING },
                        native: {
                          type: Type.OBJECT,
                          properties: {
                            es: { type: Type.STRING },
                            fr: { type: Type.STRING },
                            de: { type: Type.STRING },
                            it: { type: Type.STRING },
                            tr: { type: Type.STRING },
                            az: { type: Type.STRING }
                          },
                          required: ['es', 'fr', 'de', 'it', 'tr', 'az']
                        }
                      },
                      required: ['english', 'native']
                    }
                  }
                },
                required: ['id', 'type', 'prompt', 'sentence', 'nativeTranslations', 'correctAnswer']
              }
            }
          },
          required: ['id', 'title', 'description', 'xpReward', 'gemReward', 'questions']
        }
      }
    });

    if (response && response.text) {
      const data = JSON.parse(response.text);
      return res.json(data);
    }
    return res.status(500).json({ error: 'Failed to generate custom lesson structure' });
  } catch (error: any) {
    console.error('Generate Lesson API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Serve assets & support Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode: Mount Vite's HMR and middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve Compiled Assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server successfully active on port ${PORT}`);
  });
}

startServer();

import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client
// Note: In a real deployment, ensure process.env.API_KEY is available.
// For this MVP, if no key is present, we fallback to mock data to prevent crashing.
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generatePracticeSet = async (
  activeLetters: string[],
  count: number = 10
): Promise<string[]> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning mock data.");
    // Simple fallback generator
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      let word = "";
      const len = Math.floor(Math.random() * 3) + 3; // 3-5 chars
      for (let j = 0; j < len; j++) {
        word += activeLetters[Math.floor(Math.random() * activeLetters.length)];
      }
      words.push(word);
    }
    return words;
  }

  try {
    const lettersStr = activeLetters.join(", ");
    const prompt = `Generate ${count} simple, pronounceable English-like nonsense words or real short English words using ONLY the following letters: ${lettersStr}. The words should be between 3 and 5 letters long.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const words = JSON.parse(jsonText) as string[];
    // Normalize to uppercase
    return words.map(w => w.toUpperCase());

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
};
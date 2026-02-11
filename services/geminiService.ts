
import { GoogleGenAI, Type } from "@google/genai";

const CACHE_KEY = 'atalaias_daily_verse';

interface DailyVerse {
  verse: string;
  reference: string;
  reflection: string;
  date: string;
}

export async function getDailyVerse(): Promise<DailyVerse> {
  const today = new Date().toISOString().split('T')[0];
  
  // 1. Tentar recuperar do cache local primeiro
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed: DailyVerse = JSON.parse(cached);
      if (parsed.date === today) {
        return parsed;
      }
    } catch (e) {
      console.error("Erro ao ler cache do versículo:", e);
    }
  }

  // 2. Se não houver cache ou for de outro dia, chamar a API
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Gere um versículo bíblico encorajador para hoje com uma breve reflexão de uma frase, no estilo de uma igreja apostólica. Retorne em formato JSON com campos "verse", "reference" e "reflection".',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING },
            reference: { type: Type.STRING },
            reflection: { type: Type.STRING },
          },
          required: ["verse", "reference", "reflection"],
        },
      }
    });
    
    const text = response.text;
    if (text) {
      const data = JSON.parse(text.trim());
      const verseData = { ...data, date: today };
      
      // Salvar no cache para evitar estourar a cota em refreshs
      localStorage.setItem(CACHE_KEY, JSON.stringify(verseData));
      return verseData;
    }
    
    throw new Error("Resposta vazia da API");

  } catch (error: any) {
    // Tratamento específico para erro de cota (429)
    if (error?.message?.includes('429') || error?.status === 429) {
      console.warn("Cota de API excedida. Usando fallback offline.");
    } else {
      console.error("Erro ao buscar versículo:", error);
    }

    // Fallback estático e seguro
    return {
      verse: "O Senhor é o meu pastor, nada me faltará.",
      reference: "Salmos 23:1",
      reflection: "Confie na provisão divina em todos os momentos de sua jornada.",
      date: today
    };
  }
}

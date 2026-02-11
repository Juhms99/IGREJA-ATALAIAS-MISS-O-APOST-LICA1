
import { GoogleGenAI, Type } from "@google/genai";

export async function getDailyVerse() {
  // Initialize with the API key directly from process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Gere um versículo bíblico encorajador para hoje com uma breve reflexão de uma frase, no estilo de uma igreja apostólica. Retorne em formato JSON com campos "verse", "reference" e "reflection".',
      config: {
        responseMimeType: 'application/json',
        // Define the response schema to ensure the model returns structured JSON
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: {
              type: Type.STRING,
              description: 'O texto do versículo bíblico.',
            },
            reference: {
              type: Type.STRING,
              description: 'A referência bíblica (livro, capítulo e versículo).',
            },
            reflection: {
              type: Type.STRING,
              description: 'Uma breve reflexão de uma frase sobre o versículo.',
            },
          },
          required: ["verse", "reference", "reflection"],
        },
      }
    });
    
    // Access the .text property directly (it is not a method)
    const text = response.text;
    if (text) {
      return JSON.parse(text.trim());
    }
    return {
      verse: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.",
      reference: "Salmos 119:105",
      reflection: "A Palavra de Deus é a direção segura para sua vida hoje."
    };
  } catch (error) {
    console.error("Error fetching verse:", error);
    return {
      verse: "O Senhor é o meu pastor, nada me faltará.",
      reference: "Salmos 23:1",
      reflection: "Confie na provisão divina em todos os momentos."
    };
  }
}

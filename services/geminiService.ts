
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, DashboardStats } from "../types";

export const getBusinessInsights = async (stats: DashboardStats, transactions: Transaction[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a professional business analyst for a "Common Service Center" (CSC). 
    Based on the following data, provide 3 short, actionable business insights or warnings.
    
    Current Stats:
    - Daily Sales: ₹${stats.dailySales}
    - Total Cash in Hand: ₹${stats.totalCash}
    - Sales Returns: ₹${stats.salesReturns}
    
    Recent Transactions:
    ${transactions.map(t => `${t.customer}: ₹${t.amount} (${t.status})`).join('\n')}
    
    Format the response as JSON with an array of objects containing 'title', 'description', and 'type' (success, warning, or info).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING }
            },
            required: ['title', 'description', 'type']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return [];
  }
};

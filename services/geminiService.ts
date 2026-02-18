import { GoogleGenAI } from "@google/genai";
import { BusinessMetrics, FeatureImportance, ModelMetrics } from "../types";

// Note: Using process.env.API_KEY as per instructions.
// This service acts as the "AI Business Agent".

export const getGeminiInsights = async (
  metrics: BusinessMetrics,
  modelMetrics: ModelMetrics,
  topFeatures: FeatureImportance[],
  userQuery: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "⚠️ API Key not found. Please set REACT_APP_GEMINI_API_KEY or allow the demo to run without AI.";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Context preparation
    const context = `
      You are an expert Chief Data Officer and Business Consultant for 'StreamGuard', a major OTT streaming platform (like Netflix).
      
      Current Dashboard Metrics:
      - Total Users: ${metrics.totalUsers}
      - Churn Rate: ${metrics.churnRate}%
      - Monthly Revenue Loss due to Churn: $${metrics.revenueLoss.toLocaleString()}
      - Average CLV: $${metrics.clv.toLocaleString()}
      
      ML Model Performance:
      - Accuracy: ${modelMetrics.accuracy}
      - Top Churn Drivers: ${topFeatures.map(f => `${f.feature} (${f.importance})`).join(', ')}
      
      User Question: "${userQuery}"
      
      Provide a professional, executive-level response. Be concise but insightful. Use bullet points for strategy.
      If asked for strategies, focus on the top churn drivers listed above.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context,
    });

    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this moment. Please check your API key connection.";
  }
};
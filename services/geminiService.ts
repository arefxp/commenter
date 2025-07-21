import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateComment = async (postContent: string, tone: string, length: string): Promise<string> => {
    
  const lengthInstructions = {
    'Short': 'Strictly 1-2 sentences maximum.',
    'Medium': 'A concise paragraph of 3-4 sentences.',
    'Long': 'A more detailed paragraph of 5-6 sentences.'
  };

  const prompt = `
    You are an expert social media commentator specializing in crafting insightful and engaging LinkedIn comments. 
    Your goal is to analyze the following LinkedIn post and generate a comment that is valuable, human-like, and unique.

    The comment must not be generic. It must demonstrate that you have read and understood the post's core message. 
    It should add a new perspective, ask a thoughtful follow-up question, or offer a specific, meaningful compliment that encourages further discussion.

    **LinkedIn Post to Analyze:**
    """
    ${postContent}
    """

    **Required Tone:** ${tone}
    **Required Length:** ${lengthInstructions[length] || 'A concise paragraph of 3-4 sentences.'}

    **Instructions:**
    - Analyze the post for its main points, underlying message, and overall sentiment.
    - Craft a comment that strictly adheres to the specified length.
    - Ensure the comment is unique and not a simple rephrasing of the post.
    - DO NOT use generic phrases like "Great post!" or "Thanks for sharing." unless you add significant substance immediately after.
    - Your entire output should be ONLY the comment text itself. Do not include any prefixes, titles like "Generated Comment:", or quotation marks around the response.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.9, // Higher temperature for more creative/unique responses
            topP: 1,
            topK: 32,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate comment from Gemini API.");
  }
};
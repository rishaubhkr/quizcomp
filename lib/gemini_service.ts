import { GoogleGenerativeAI } from "@google/generative-ai"

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" })

export async function Gemini({ text, topic, n }: { text?: string, topic?: string, n: number }) {
    const prompt = `
    Generate a JSON object in the following format:

{
  "questions": [
    {
      "question": "string",
      "option1": "string",
      "option2": "string",
      "option3": "string",
      "option4": "string",
      "answer": 1 | 2 | 3 | 4
    }
  ]
}

Instructions:
- Use the following input:
  - Topic (if provided): ${topic}
  - Text (if provided): ${text}
  - Number of questions: ${n}

Rules:
- Each question must be based on the provided topic or text.
- Each question must have exactly 4 options.
- Only one correct answer per question; provide its option number in the "answer" field.
- Avoid repeated or overly similar questions.
- Keep the questions simple, clear, and factually correct.
    `

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    const jsonMatch = rawText.match(/```json([\s\S]*?)```/i) || rawText.match(/```([\s\S]*?)```/i);
    const cleanJson = jsonMatch ? jsonMatch[1].trim() : rawText.trim();

    try {
      const json = JSON.parse(cleanJson)
      return json;
    } catch {
      return null
    }
}
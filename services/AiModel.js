import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTE_API_KEY,
});

export const CalculateCaloriesAI = async (PROMPT) => {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [{ role: "user", content: PROMPT }],
  });
  console.log("completion", completion);
  return completion.choices[0]?.message?.content;
};

// console.log(CalculateCalories.choices[0].message);

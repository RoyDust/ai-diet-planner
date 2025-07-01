import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTE_API_KEY,
});

const AI_MODEL = "google/gemini-2.0-flash-001";

// 计算卡路里
export const CalculateCaloriesAI = async (PROMPT) => {
  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [{ role: "user", content: PROMPT }],
  });
  console.log("completion", completion);
  return completion.choices[0]?.message?.content;
};

// 生成食谱
export const GenerateRecipeAI = async (PROMPT) => {
  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [{ role: "user", content: PROMPT }],
    response_format: "json_object",
  });
  console.log("completion", completion);
  return completion.choices[0]?.message?.content;
};

// console.log(CalculateCalories.choices[0].message);

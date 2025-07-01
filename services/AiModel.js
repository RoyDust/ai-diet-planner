import axios from "axios";
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

// 生成食谱图片
const BASE_URL = "https://aigurulab.tech";
export const GenerateImage = async (prompt) => {
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_AIRGURU_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );
  console.log(result.data.image); //Output Result: Base 64 Image
  return result.data.image;
};

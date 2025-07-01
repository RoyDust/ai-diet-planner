export default {
  // 计算卡路里
  CALORIES_PROMPT: `Based on Weight,Height,Gender,Goal give me calories and proteins need daily Consider Age as 28 in Json format and follow the schema:
  {
    calories: <>,
    proteins: <>
  }`,
  // 生成选择食谱
  GENERATE_RECIPE_PROMPT: `Depends on user instruction create 3 different recipes Recipe Name with 
variant with Emoji,2 line description and main ingredient list in JsoN format with field recipeName,description,ingredients (without size) only,
  and answer in Chinese, and return in Json format , \`\`\`json and \`\`\` are not included in the response`,
  // 生成完整食谱
  GENERATE_COMPLETE_RECIPE_PROMPT: `Generate a detailed recipe in JSON format based on the following requirements:

1. Include the recipe name as "recipeName" and a brief description as "description"
2. For each ingredient, provide:
   - An appropriate emoji icon as "icon"
   - The ingredient name as "ingredient"
   - The quantity/amount as "quantity"
3. Include:
   - Total calories as "calories" (number only)
   - Cooking time in minutes as "cookTime"
   - A realistic image text prompt as "imagePrompt"
   - Serving size as "serveTo" (number of people)
4. Select categories from this list: [Breakfast, Lunch, Dinner, Dessert, Snack, Vegetarian, Vegan, Gluten-Free]
5. Provide clear step-by-step instructions as "steps" (array of strings)
6. Answer in Chinese
The JSON schema should be exactly:

{
  "description": "string",
  "recipeName": "string",
  "calories": number,
  "category": ["string"],
  "cookTime": number,
  "imagePrompt": "string",
  "ingredients": [{
    "icon": "string",
    "ingredient": "string",
    "quantity": "string"
  }],
  "serveTo": number,
  "steps": ["string"]
}

Provide only the JSON output with no additional text or explanation. Ensure all measurements are in metric units and quantities are precise., \`\`\`json and \`\`\` are not included in the response`,
};

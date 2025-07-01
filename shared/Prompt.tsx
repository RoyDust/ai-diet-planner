export default {
  // 计算卡路里
  CALORIES_PROMPT: `Based on Weight,Height,Gender,Goal give me calories and proteins need daily Consider Age as 28 in Json format and follow the schema:
  {
    calories: <>,
    proteins: <>
  }`,
  // 生成食谱
  GENERATE_RECIPE_PROMPT: `Depends on user instruction create 3 different recipes Recipe Name with 
variant with Emoji,2 line description and main ingredient list in JsoN format with field recipeName,description,ingredients (without size) only,
  and answer in Chinese, and return in Json format , \`\`\`json and \`\`\` are not included in the response`,
};

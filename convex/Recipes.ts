import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建食谱
export const CreateRecipe = mutation({
  args: {
    jsonData: v.any(),
    userId: v.id("Users"),
    imageUrl: v.optional(v.string()),
    recipeName: v.any(),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.insert("Recipes", {
      jsonData: args.jsonData,
      userId: args.userId,
      recipeName: args.recipeName,
      imageUrl: args.imageUrl,
    });
    return recipe;
  },
});

// 通过食谱id获取食谱
export const GetRecipeById = query({
  args: {
    id: v.id("Recipes"),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.id);
    return recipe;
  },
});

// 获取所有食谱
export const GetAllRecipes = query({
  handler: async (ctx) => {
    const recipes = await ctx.db.query("Recipes").order("desc").collect();
    return recipes;
  },
});
import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
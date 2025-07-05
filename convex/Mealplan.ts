import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createMealPlan = mutation({
  args: {
    uid: v.id("Users"),
    recipeId: v.id("Recipes"),
    date: v.string(),
    mealType: v.string(),
  },
  handler: async (ctx, args) => {
    const mealPlan = await ctx.db.insert("MealPlan", {
      recipeId: args.recipeId,
      date: args.date,
      mealType: args.mealType,
      uid: args.uid,
    });
    return mealPlan;
  },
});
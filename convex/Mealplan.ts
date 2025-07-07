import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// 获取用户当天的计划
export const getTodaysMealPlan = query({
  args: {
    uid: v.id("Users"),
    date: v.any(),
  },
  handler: async (ctx, args) => {

    console.log("args ", args);

    // 获取全部计划
    const allMealPlan = await ctx.db.query("MealPlan")
      .filter((q) => q.and(
        q.eq(q.field("uid"), args.uid),
        q.eq(q.field("date"), args.date),
      ))
      .collect();

    // console.log("allMealPlan ", allMealPlan);


    // 获取计划详情
    const result = await Promise.all(allMealPlan.map(async (mealPlan) => {
      const recipe = await ctx.db.get(mealPlan.recipeId);
      return {
        mealPlan,
        recipe,
      };
    }));
    return result;
  },
});

// 更新计划状态
export const updateMealPlanStatus = mutation({
  args: {
    id: v.id("MealPlan"),
    status: v.boolean(),
    calories: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    console.log("updateMealPlanStatus ", args);
    const result = await ctx.db.patch(args.id, {
      status: args.status,
      calories: args?.calories || 0,
    });
    return result;
  },
});


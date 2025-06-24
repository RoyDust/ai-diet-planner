// 用户相关操作 Convex数据库  
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 创建新用户
export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("Users").filter((q) => q.eq(q.field("email"), args.email)).first();

    const data = {
      name: args.name,
      email: args.email,
      credits: 10,
    }

    if (!user) {
      const newUser = await ctx.db.insert("Users", { ...data, updatedAt: Date.now() });
      console.log("newUser", newUser);

      return { ...data };
    } else {
      return { ...data };
    }
  },
});

// 获取用户信息
export const GetUserInfo = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("Users").filter((q) => q.eq(q.field("email"), args.email)).first();
    return { ...user };
  },
});

// 更新用户信息
export const UpdateUserInfo = mutation({
  args: {
    userId: v.id("Users"),
    height: v.string(),
    weight: v.string(),
    goal: v.string(),
    gender: v.string(),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("Users").filter((q) => q.eq(q.field("_id"), args.userId)).first();
    if (!user) {
      return { error: "User not found" };
    }
    const updatedUser = await ctx.db.patch(user._id, {
      height: args.height,
      weight: args.weight,
      goal: args.goal,
      gender: args.gender,
      calories: args.calories,
      proteins: args.proteins,
    });
    return updatedUser
  },
});
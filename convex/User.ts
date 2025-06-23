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
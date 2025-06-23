import { v } from "convex/values";
import { mutation } from "./_generated/server";

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

      return { ...data, user: newUser };
    } else {
      return { ...data, user };
    }
  },
});
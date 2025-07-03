import GenerateRecipe from "@/components/home/GenerateRecipe";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Platform, StyleSheet, View } from "react-native";

const RecipeDetail = () => {
  const searchParams = useLocalSearchParams();
  const recipeId = searchParams?.recipeId;
  console.log("recipeId", recipeId); // j97afqehp2g82e7tbbhvejy2n57k0ref

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId as Id<"Recipes">,
  });
  console.log("getRecipe", recipeDetail);
  return (
    <View style={styles.container}>
      {/* 配方介绍 */}
      <GenerateRecipe recipeDetail={recipeDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    height: "100%",
    padding: 20,
  },
});

export default RecipeDetail;

import GenerateRecipe from "@/components/home/GenerateRecipe";
import RecipeIngredients from "@/components/home/RecipeIngredients";
import RecipeSteps from "@/components/home/RecipeSteps";
import Button from "@/components/shared/Button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Colors from "@/shared/Colors";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { FlatList, Platform, StyleSheet, View } from "react-native";

const RecipeDetail = () => {
  const searchParams = useLocalSearchParams();
  const recipeId = searchParams?.recipeId;
  console.log("recipeId", recipeId); // j97afqehp2g82e7tbbhvejy2n57k0ref

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId as Id<"Recipes">,
  });
  console.log("getRecipe", recipeDetail);

  // 加入计划
  const addToPlan = () => {
    console.log("加入计划");
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          {/* 配方介绍 */}
          <GenerateRecipe recipeDetail={recipeDetail} />
          {/* 食材 */}
          <RecipeIngredients recipeDetail={recipeDetail} />
          {/* 步骤 */}
          <RecipeSteps recipeDetail={recipeDetail} />
          {/* 按钮 */}
          <View style={styles.buttonContainer}>
            <Button title="加入计划" onPress={addToPlan} loading={false} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    height: "100%",
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecipeDetail;

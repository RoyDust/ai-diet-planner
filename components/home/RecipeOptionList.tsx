import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { GenerateImage, GenerateRecipeAI } from "@/services/AiModel";
import Colors from "@/shared/Colors";
import Prompt from "@/shared/Prompt";
import { useMutation } from "convex/react";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingDialog from "./LoadingDialog";

const RecipeOptionList = ({ recipeOptions }: { recipeOptions: any[] }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);

  const handleSelectRecipe = async (recipe: any) => {
    try {
      // 生成完整食谱
      setSelectedRecipe(recipe);
      console.log("selectedRecipe", selectedRecipe);
      const PROMPT = `
    RecipeName: ${recipe.recipeName}
    Description: ${recipe.description}
    Ingredients: ${recipe.ingredients}
    ${Prompt.GENERATE_COMPLETE_RECIPE_PROMPT}
    `;
      console.log("PROMPT", PROMPT);
      setLoading(true);
      const response = await GenerateRecipeAI(PROMPT);
      console.log("response", response);
      const extractedJson = response?.replace("```json", "").replace("```", "");
      console.log("extractedJson", JSON.parse(extractedJson || "[]"));
      const recipeData = JSON.parse(extractedJson || "[]");

      // 生成食谱图片
      const aiImage = await GenerateImage(recipeData?.imagePrompt);
      console.log("aiImage", aiImage);

      // 保存食谱到数据库
      const savedRecipe = await CreateRecipe({
        jsonData: recipeData,
        userId: user?._id,
        recipeName: recipe.recipeName,
        imageUrl: aiImage,
      });
      console.log("savedRecipe", savedRecipe);
      
      setLoading(false);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>根据你的偏好，我为你准备了以下食谱：</Text>

      <View style={styles.recipeList}>
        {recipeOptions.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recipeContainer}
            onPress={() => {
              handleSelectRecipe(recipe);
            }}
          >
            <Text style={styles.title}>{recipe.recipeName}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            <Text style={styles.ingredients}>{recipe.ingredients}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog visible={loading} message="生成中..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeList: {
    marginTop: 10,
  },
  recipeContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  ingredients: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});

export default RecipeOptionList;

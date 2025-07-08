import AIRecommendation from "@/components/home/AIRecommendation";
import RecipeCard from "@/components/meals/RecipeCard";
import { api } from "@/convex/_generated/api";
import Colors from "@/shared/Colors";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Meals = () => {
  const router = useRouter();
  const handleGenerateAI = () => {
    router.push("/generate-ai-recipe");
  };

  const recipes = useQuery(api.Recipes.GetAllRecipes);
  console.log(recipes);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mealPlanContainer}>
          <Text style={styles.title}>食谱菜单🥬</Text>

          <AIRecommendation onGeneratePress={handleGenerateAI} />
          <FlatList
            data={recipes}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 5,
            }}
            renderItem={({ item }) => <RecipeCard recipeInfo={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    display: "flex",
    flexDirection: "column",
  },
  scrollView: {
    flex: 1,
  },
  mealPlanContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    paddingLeft: 20,
    marginBottom: 20,
  },
});

export default Meals;

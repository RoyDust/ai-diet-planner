import AddActionSheet from "@/components/home/AddActionSheet";
import GenerateRecipe from "@/components/home/GenerateRecipe";
import RecipeIngredients from "@/components/home/RecipeIngredients";
import RecipeSteps from "@/components/home/RecipeSteps";
import Button from "@/components/shared/Button";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Colors from "@/shared/Colors";
import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router/build/hooks";

import { useContext, useRef } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const RecipeDetail = () => {
  const searchParams = useLocalSearchParams();
  const recipeId = searchParams?.recipeId;
  console.log("recipeId", recipeId); // j97afqehp2g82e7tbbhvejy2n57k0ref

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const createMealPlan = useMutation(api.Mealplan.createMealPlan);
  const { user } = useContext(UserContext);

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId as Id<"Recipes">,
  });
  console.log("getRecipe", recipeDetail);

  // 点击加入计划
  const handleAddToPlan = () => {
    actionSheetRef.current?.show();
  };

  // 加入计划
  const addToPlan = async (params: {
    selectedDate: string;
    selectedMeal: string;
  }) => {
    try {
      console.log("加入计划", params);
      if (!params.selectedDate || !params.selectedMeal) {
        Alert.alert("请选择日期和餐点");
        return;
      }
      console.log("user", user);
      const mealPlan = await createMealPlan({
        recipeId: recipeId as Id<"Recipes">,
        date: params.selectedDate,
        mealType: params.selectedMeal,
        uid: user?._id as Id<"Users">,
      });
      console.log("mealPlan", mealPlan);
      Alert.alert("加入计划成功");
      cancelAddToPlan();
    } catch (error) {
      console.log("error", error);
    }
  };

  // 取消加入计划
  const cancelAddToPlan = () => {
    actionSheetRef.current?.hide();
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
            <Button
              title="加入计划"
              onPress={handleAddToPlan}
              loading={false}
            />
          </View>

          <ActionSheet ref={actionSheetRef}>
            <AddActionSheet
              cancelAddToPlan={cancelAddToPlan}
              addToPlan={addToPlan}
            />
          </ActionSheet>
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

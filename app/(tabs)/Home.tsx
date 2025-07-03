import AIRecommendation from "@/components/home/AIRecommendation";
import GoalProgress from "@/components/home/GoalProgress";
import MealPlanCard from "@/components/home/MealPlanCard";
import UserGreeting from "@/components/home/UserGreeting";
import { UserContext } from "@/context/UserContext";
import Colors from "@/shared/Colors";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth >= 768;

interface MealPlan {
  id: string;
  type: "早餐" | "午餐" | "晚餐";
  name: string;
  calories: number;
  completed: boolean;
}

const Home = () => {
  const { user } = useContext(UserContext);

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: "1",
      type: "早餐",
      name: "燕麦配浆果坚果",
      calories: 450,
      completed: true,
    },
    {
      id: "2",
      type: "午餐",
      name: "燕麦配浆果坚果",
      calories: 450,
      completed: false,
    },
    {
      id: "3",
      type: "晚餐",
      name: "燕麦配浆果坚果",
      calories: 450,
      completed: false,
    },
  ]);

  useEffect(() => {
    console.log(user);
    if (!user?.height) {
      router.replace("/preference");
    }
  }, [user]);

  const handleGenerateAI = () => {
    console.log("AI生成按钮被点击");
    // TODO: 实现AI生成逻辑
    router.push("/generate-ai-recipe");
  };

  const handleMealPress = (mealId: string) => {
    console.log("餐食被点击:", mealId);
    // TODO: 导航到餐食详情
  };

  const handleToggleComplete = (mealId: string) => {
    console.log("切换完成状态:", mealId);
    setMealPlans((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  // 计算当前摄入的卡路里
  const currentCalories = mealPlans
    .filter((meal) => meal.completed)
    .reduce((total, meal) => total + meal.calories, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <UserGreeting userName={user?.name || "用户"} />

        <GoalProgress
          current={currentCalories}
          target={2000}
          date="2025年4月16日"
        />

        <AIRecommendation onGeneratePress={handleGenerateAI} />

        <View style={styles.mealPlanSection}>
          <TouchableOpacity onPress={() => router.push("/recipe-detail?recipeId=j97afqehp2g82e7tbbhvejy2n57k0ref")}>
            <Text>跳转至食谱详情</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mealPlanSection}>
          <Text style={styles.sectionTitle}>今日餐食计划</Text>

          {mealPlans.map((meal) => (
            <MealPlanCard
              key={meal.id}
              type={meal.type}
              name={meal.name}
              calories={meal.calories}
              completed={meal.completed}
              onPress={() => handleMealPress(meal.id)}
              onToggleComplete={() => handleToggleComplete(meal.id)}
            />
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  mealPlanSection: {
    marginTop: 8,
    paddingBottom: isTablet ? 40 : 20,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: "700",
    color: Colors.TEXT_PRIMARY,
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
  },
  bottomPadding: {
    height: isTablet ? 100 : 80,
  },
});

export default Home;

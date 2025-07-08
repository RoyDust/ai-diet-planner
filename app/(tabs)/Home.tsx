import AIRecommendation from "@/components/home/AIRecommendation";
import GoalProgress from "@/components/home/GoalProgress";
import TodaysMealPlan from "@/components/home/TodaysMealPlan";
import UserGreeting from "@/components/home/UserGreeting";
import { UserContext } from "@/context/UserContext";
import Colors from "@/shared/Colors";
import { useConvex } from "convex/react";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth >= 768;

const Home = () => {
  const { user } = useContext(UserContext);

  const convex = useConvex();

  const [mealPlans, setMealPlans] = useState<any[]>([
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

  const handleGenerateAI = () => {
    router.push("/generate-ai-recipe");
  };

  // 计算当前摄入的卡路里
  const currentCalories = mealPlans
    .filter((meal) => meal.completed)
    .reduce((total, meal) => total + meal.calories, 0);

  useEffect(() => {
    console.log(user);
    if (!user?.height) {
      router.replace("/preference");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <UserGreeting userName={user?.name || "用户"} />

        <GoalProgress />

        <AIRecommendation onGeneratePress={handleGenerateAI} />

        <View>
          <TouchableOpacity
            onPress={() =>
              router.push(
                "/recipe-detail?recipeId=j97afqehp2g82e7tbbhvejy2n57k0ref"
              )
            }
          >
            <Text>跳转至食谱详情</Text>
          </TouchableOpacity>
        </View>

        <TodaysMealPlan />

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
  bottomPadding: {
    height: isTablet ? 100 : 80,
  },
});

export default Home;

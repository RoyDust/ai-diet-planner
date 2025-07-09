import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useConvex } from "convex/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MealPlanCard from "./MealPlanCard";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

interface TodaysMealPlanProps {
  mealPlans: any[];
  onMealPress: (mealId: string) => void;
  onToggleComplete: (mealId: string) => void;
}

const TodaysMealPlan = ({}) => {
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const convex = useConvex();
  const { user } = useContext(UserContext);

  // 获取当天的计划
  const getTodaysMealPlan = async () => {
    try {
      const date = moment(new Date()).add(1, "days").format("DD/MM/YYYY");
      // console.log("date ", date);
      const result = await convex.query(api.Mealplan.getTodaysMealPlan, {
        uid: user?._id,
        date: date,
      });

      // console.log("getTodaysMealPlan ", result);

      const mealPlans = result.map((meal) => {
        let recipeData: any = {};
        if (meal.recipe?.jsonData) {
          try {
            const data =
              typeof meal.recipe.jsonData === "string"
                ? JSON.parse(meal.recipe.jsonData)
                : meal.recipe.jsonData;
            recipeData = data;
          } catch (e) {
            console.error(
              "Failed to process recipe jsonData:",
              meal.recipe.jsonData,
              e
            );
          }
        }

        return {
          id: meal.mealPlan._id,
          type: meal.mealPlan.mealType,
          name: meal.recipe?.recipeName,
          calories: recipeData?.calories || 0,
          image: meal.recipe?.imageUrl,
          completed: meal.mealPlan.status || false,
        };
      });

      console.log("mealPlans  ", mealPlans);

      setMealPlans(mealPlans);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleMealPress = (mealId: string) => {
    console.log("餐食被点击:", mealId);

    // TODO: 导航到餐食详情
  };

  // 切换完成状态
  const handleToggleComplete = (mealId: string) => {
    console.log("切换完成状态:", mealId);
    setMealPlans((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const handleCreateNewPlan = () => {
    // TODO: 实现创建新计划的逻辑
    console.log("创建新的饮食计划");
    getTodaysMealPlan();
  };

  useEffect(() => {
    getTodaysMealPlan();
  }, [user]);

  return (
    <View style={styles.mealPlanSection}>
      <Text style={styles.sectionTitle}>今日餐食计划</Text>

      {mealPlans.length > 0 ? (
        mealPlans.map((meal) => (
          <MealPlanCard
            key={meal.id}
            mealInfo={meal}
            onPress={() => handleMealPress(meal.id)}
            onToggleComplete={() => handleToggleComplete(meal.id)}
          />
        ))
      ) : (
        <View style={styles.noPlanContainer}>
          <Ionicons
            name="calendar-outline"
            size={48}
            color={Colors.TEXT_SECONDARY}
          />
          <Text style={styles.noPlanText}>你没有制定今日的饮食计划</Text>
          <TouchableOpacity
            style={styles.createPlanButton}
            onPress={handleCreateNewPlan}
          >
            <Text style={styles.createPlanButtonText}>创建新的饮食计划</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealPlanSection: {
    marginTop: 8,
    paddingBottom: isTablet ? 40 : 20,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: "700",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 16,
  },
  noPlanContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    marginTop: 20,
  },
  noPlanText: {
    fontSize: isSmallScreen ? 14 : 16,
    color: Colors.TEXT_SECONDARY,
    marginTop: 16,
    marginBottom: 24,
  },
  createPlanButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  createPlanButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TodaysMealPlan;

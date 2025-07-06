import Colors from "@/shared/Colors";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MealPlanCard from "./MealPlanCard";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

export interface MealPlan {
  id: string;
  type: "早餐" | "午餐" | "晚餐";
  name: string;
  calories: number;
  completed: boolean;
}

interface TodaysMealPlanProps {
  mealPlans: MealPlan[];
  onMealPress: (mealId: string) => void;
  onToggleComplete: (mealId: string) => void;
}

const TodaysMealPlan = ({
  mealPlans,
  onMealPress,
  onToggleComplete,
}: TodaysMealPlanProps) => {
  return (
    <View style={styles.mealPlanSection}>
      <Text style={styles.sectionTitle}>今日餐食计划</Text>

      {mealPlans.map((meal) => (
        <MealPlanCard
          key={meal.id}
          type={meal.type}
          name={meal.name}
          calories={meal.calories}
          completed={meal.completed}
          onPress={() => onMealPress(meal.id)}
          onToggleComplete={() => onToggleComplete(meal.id)}
        />
      ))}
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
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
  },
});

export default TodaysMealPlan;

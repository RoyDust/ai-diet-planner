import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import moment from "moment";
import { useContext, useMemo } from "react";
import {
  ActivityIndicator,
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

const TodaysMealPlan = ({ selectedDate }: { selectedDate?: string }) => {
  const { user } = useContext(UserContext);

  const dateToQuery = selectedDate || moment().utcOffset("+08:00").format("DD/MM/YYYY");

  const mealPlanData = useQuery(api.Mealplan.getTodaysMealPlan, {
    uid: user?._id,
    date: dateToQuery,
  });

  const mealPlans = useMemo(() => {
    if (!mealPlanData) return [];

    return mealPlanData.map((meal) => {
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
  }, [mealPlanData]);

  const handleMealPress = (mealId: string) => {
    console.log("餐食被点击:", mealId);
    // TODO: 导航到餐食详情
  };

  const handleToggleComplete = (mealId: string) => {
    console.log("切换完成状态:", mealId);
    // This is a temporary state update. For persistence, you'd need a mutation.
    // setMealPlans(prevMeals => ...);
  };

  const handleCreateNewPlan = () => {
    // TODO: 实现创建新计划的逻辑
    console.log("创建新的饮食计划");
  };

  const title = selectedDate
    ? `${moment(selectedDate, "DD/MM/YYYY").utcOffset("+08:00").format("M月D日")}的计划`
    : "今日餐食计划";

  return (
    <View style={styles.mealPlanSection}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {mealPlanData === undefined ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : mealPlans && mealPlans.length > 0 ? (
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
          <Text style={styles.noPlanText}>你没有为这一天制定饮食计划</Text>
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

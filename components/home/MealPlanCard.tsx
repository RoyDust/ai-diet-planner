import { RefreshDataContext } from "@/context/RefreshDataContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/shared/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface MealPlanCardProps {
  mealInfo: any;
  onPress?: () => void;
  onToggleComplete?: () => void;
}

const mealTypeMap = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
};

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  mealInfo,
  onPress,
  onToggleComplete,
}) => {
  const [completed, setCompleted] = useState(mealInfo.completed);
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const updateMealPlanStatus = useMutation(api.Mealplan.updateMealPlanStatus);

  const onConfirm = (status: boolean) => {
    // console.log("onConfirm ", status);
    updateMealPlanStatus({
      id: mealInfo.id as any,
      status: !status,
      calories: mealInfo.calories,
    });
    setCompleted(!status);
    setRefreshData(Date.now());
    Alert.alert("提示", "已更新完成状态");
  };

  useEffect(() => {
    setCompleted(mealInfo.completed);
  }, [mealInfo.completed]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {mealInfo.image ? (
            <Image source={{ uri: mealInfo.image }} style={styles.foodImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialIcons
                name="restaurant"
                size={24}
                color={Colors.TEXT_TERTIARY}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.textSection}>
            <View style={styles.mealType}>
              <Text style={styles.mealTypeText}>
                {mealTypeMap[mealInfo.type as keyof typeof mealTypeMap]}
              </Text>
            </View>
            <Text style={styles.mealName}>{mealInfo.name}</Text>
            <Text style={styles.calories}>{mealInfo.calories}千卡</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.checkButton,
              completed && styles.checkButtonCompleted,
            ]}
            onPress={onToggleComplete}
            activeOpacity={0.6}
            accessible={true}
            accessibilityLabel={
              completed ? "已完成，点击取消完成" : "未完成，点击标记为完成"
            }
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
          >
            <FontAwesome
              onPress={() => onConfirm(completed)}
              name={completed ? "check-square" : "square-o"}
              size={24}
              color={completed ? Colors.SUCCESS : Colors.TEXT_TERTIARY}
              style={[styles.checkIcon, completed && styles.checkIconCompleted]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 16,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.BORDER_LIGHT,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.BORDER_LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
  },
  mealType: {
    marginBottom: 4,
    backgroundColor: Colors.PRIMARY_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.PRIMARY,
  },
  mealName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  calories: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.TEXT_SECONDARY,
  },
  checkButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  checkButtonCompleted: {
    backgroundColor: Colors.SUCCESS + "10", // 10% opacity
  },
  checkIcon: {
    textShadowColor: Colors.SHADOW_LIGHT,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  checkIconCompleted: {
    transform: [{ scale: 1.1 }],
  },
});

export default MealPlanCard;

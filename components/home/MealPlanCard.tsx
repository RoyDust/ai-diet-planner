import Colors from "@/shared/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MealPlanCardProps {
  type: "早餐" | "午餐" | "晚餐";
  name: string;
  calories: number;
  image?: string;
  completed?: boolean;
  onPress?: () => void;
  onToggleComplete?: () => void;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  type,
  name,
  calories,
  image,
  completed = false,
  onPress,
  onToggleComplete,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.foodImage} />
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
            <Text style={styles.mealType}>{type}</Text>
            <Text style={styles.mealName}>{name}</Text>
            <Text style={styles.calories}>{calories}千卡</Text>
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
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: "600",
    color: Colors.INFO,
    marginBottom: 4,
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
    color: Colors.INFO,
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

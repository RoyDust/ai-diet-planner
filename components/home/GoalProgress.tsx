import { RefreshDataContext } from "@/context/RefreshDataContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/shared/Colors";
import { useConvex } from "convex/react";
import moment from "moment";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface GoalProgressProps {
  selectedDate?: string;
}

const GoalProgress = memo(({ selectedDate }: GoalProgressProps) => {
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(2000);
  const [date, setDate] = useState(
    moment().add(1, "days").utcOffset("+08:00").format("DD/MM/YYYY")
  );

  const convex = useConvex();
  const { user } = useContext(UserContext);
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  // 获取今日的摄入量
  const getCaloriesForDate = async () => {
    const dateToFetch =
      selectedDate ||
      moment().add(1, "days").utcOffset("+08:00").format("DD/MM/YYYY");
    setDate(dateToFetch);
    const result = await convex.query(api.Mealplan.getTodaysCalories, {
      uid: user?._id,
      date: dateToFetch,
    });
    console.log("getCaloriesForDate ", result);
    setCurrent(result);
  };

  useEffect(() => {
    getCaloriesForDate();
  }, [user, refreshData, selectedDate]);

  const progressData = useMemo(() => {
    const progress = Math.min(current / target, 1);
    const percentage = Math.round(progress * 100);
    return { progress, percentage };
  }, [current, target]);

  const isToday =
    date === moment().add(1, "days").utcOffset("+08:00").format("DD/MM/YYYY");

  return (
    <View style={styles.container}>
      <View
        style={styles.card}
        accessible={true}
        accessibilityLabel={`目标: 已摄入${current}卡路里，目标${target}卡路里，完成度${progressData.percentage}%`}
        accessibilityRole="progressbar"
      >
        <View style={styles.header}>
          <Text style={styles.title}>{isToday ? "今日目标" : "当日目标"}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.progressSection}>
          <Text
            style={styles.progressText}
            accessible={true}
            accessibilityLabel={`${current} 卡路里，目标 ${target} 卡路里`}
          >
            <Text style={styles.currentText}>{current}</Text>
            <Text style={styles.separatorText}>/</Text>
            <Text style={styles.targetText}>{target}</Text>
            <Text style={styles.unitText}> 千卡</Text>
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={styles.progressBarBackground}
            accessible={true}
            accessibilityLabel={`进度条显示完成度 ${progressData.percentage}%`}
            accessibilityRole="progressbar"
          >
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressData.percentage}%` },
              ]}
            />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>已摄入卡路里</Text>
            <Text style={styles.encouragement}>继续保持！</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

GoalProgress.displayName = "GoalProgress";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.TEXT_PRIMARY,
  },
  date: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    fontWeight: "500",
  },
  progressSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  progressText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.TEXT_PRIMARY,
  },
  currentText: {
    color: Colors.SUCCESS,
  },
  separatorText: {
    color: Colors.TEXT_TERTIARY,
  },
  targetText: {
    color: Colors.TEXT_SECONDARY,
  },
  unitText: {
    fontSize: 18,
    color: Colors.TEXT_SECONDARY,
    fontWeight: "500",
  },
  progressBarContainer: {
    gap: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.BORDER_LIGHT,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.SUCCESS,
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    fontWeight: "500",
  },
  encouragement: {
    fontSize: 14,
    color: Colors.SUCCESS,
    fontWeight: "600",
  },
});

export default GoalProgress;

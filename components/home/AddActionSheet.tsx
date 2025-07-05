import Button from "@/components/shared/Button";
import Colors from "@/shared/Colors";
import {
  Coffee01Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react-native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateOption {
  date: Date;
  weekday: string;
  day: number;
  month: number;
}

interface MealOption {
  id: "breakfast" | "lunch" | "dinner";
  name: string;
  icon: IconSvgElement;
}

const AddActionSheet = ({
  cancelAddToPlan,
  addToPlan,
}: {
  cancelAddToPlan: () => void;
  addToPlan: (params: { selectedDate: string; selectedMeal: string }) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  // 生成从今天开始的三天日期
  const dateOptions = useMemo((): DateOption[] => {
    const dates: DateOption[] = [];
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);

      dates.push({
        date,
        weekday: weekdays[date.getDay()],
        day: date.getDate(),
        month: date.getMonth() + 1,
      });
    }

    return dates;
  }, []);

  // 饭点选项
  const mealOptions: MealOption[] = [
    { id: "breakfast", name: "早餐", icon: Coffee01Icon },
    { id: "lunch", name: "午餐", icon: Sun03Icon },
    { id: "dinner", name: "晚餐", icon: Moon02Icon },
  ];

  // 处理添加到饮食计划
  const handleAddToPlan = () => {
    if (!selectedDate || !selectedMeal) {
      console.log("请选择日期和饭点");
      return;
    }

    console.log("添加到饮食计划:", { selectedDate, selectedMeal });
    addToPlan({ selectedDate: selectedDate, selectedMeal });
  };

  // 处理取消
  const handleCancel = () => {
    console.log("取消添加");
    cancelAddToPlan();
  };

  return (
    <View style={styles.container}>
      {/* 标题 */}
      <Text style={styles.title}>添加到饮食计划</Text>

      {/* 日期选择 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>选择日期</Text>
        <View style={styles.optionsRow}>
          {dateOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateOption,
                selectedDate === option.date.toDateString() &&
                  styles.selectedOption,
              ]}
              onPress={() => setSelectedDate(option.date.toDateString())}
            >
              <Text
                style={[
                  styles.weekdayText,
                  selectedDate === option.date.toDateString() &&
                    styles.selectedText,
                ]}
              >
                星期{option.weekday}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  selectedDate === option.date.toDateString() &&
                    styles.selectedText,
                ]}
              >
                {option.day}号
              </Text>
              <Text
                style={[
                  styles.monthText,
                  selectedDate === option.date.toDateString() &&
                    styles.selectedText,
                ]}
              >
                {option.month}月
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 饭点选择 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>选择饭点</Text>
        <View style={styles.optionsRow}>
          {mealOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.mealOption,
                selectedMeal === option.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedMeal(option.id)}
            >
              <HugeiconsIcon
                icon={option.icon}
                size={24}
                color={
                  selectedMeal === option.id ? Colors.WHITE : Colors.PRIMARY
                }
              />
              <Text
                style={[
                  styles.mealText,
                  selectedMeal === option.id && styles.selectedText,
                ]}
              >
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 操作按钮 */}
      <View style={styles.buttonSection}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
          <View style={styles.addButton}>
            <Button
              title="+添加到饮食计划"
              onPress={handleAddToPlan}
              loading={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.BACKGROUND,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  dateOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  mealOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  selectedOption: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  weekdayText: {
    fontSize: 12,
    color: Colors.TEXT_SECONDARY,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  monthText: {
    fontSize: 12,
    color: Colors.TEXT_SECONDARY,
  },
  mealText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.TEXT_PRIMARY,
    marginTop: 4,
  },
  selectedText: {
    color: Colors.WHITE,
  },
  buttonSection: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.TEXT_PRIMARY,
  },
  addButton: {
    flex: 2,
  },
});

export default AddActionSheet;

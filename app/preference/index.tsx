import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Colors from "@/shared/Colors";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Dumbbell01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Preference = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [goal, setGoal] = useState<"lose" | "gain" | "muscle" | null>(null);

  // 性别选项数据
  const genderOptions = [
    {
      value: "male" as const,
      title: "男性",
    },
    {
      value: "female" as const,
      title: "女性",
    },
  ];

  // 目标选项数据
  const goalOptions = [
    {
      value: "lose" as const,
      icon: ArrowDown01Icon,
      title: "减重",
      description: "减少体重，塑造理想身材",
    },
    {
      value: "gain" as const,
      icon: ArrowUp01Icon,
      title: "增重",
      description: "健康增重，增强体质",
    },
    {
      value: "muscle" as const,
      icon: Dumbbell01Icon,
      title: "增肌",
      description: "增强肌肉质量和力量",
    },
  ];

  const handleContinue = () => {
    // 这里可以添加保存用户信息的逻辑
    console.log({ weight, height, gender, goal });
  };

  const isFormValid = weight && height && gender && goal;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 标题区域 */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>让我们了解你一下吧</Text>
          <Text style={styles.subtitle}>
            这有助于我们创建您的个性化膳食计划
          </Text>
        </View>

        {/* 基本信息区域 */}
        <View style={styles.section}>
          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>体重 (kg)</Text>
              <Input
                placeholder="请输入体重"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>身高 (cm)</Text>
              <Input
                placeholder="请输入身高"
                value={height}
                onChangeText={setHeight}
              />
            </View>
          </View>
        </View>

        {/* 性别选择区域 */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>性别</Text>
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.genderOption,
                  gender === option.value && styles.genderOptionSelected,
                ]}
                onPress={() => setGender(option.value)}
              >
                <HugeiconsIcon
                  icon={User02Icon}
                  size={40}
                  color={
                    gender === option.value ? Colors.WHITE : Colors.DARK_GRAY
                  }
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === option.value && styles.genderTextSelected,
                  ]}
                >
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 目标选择区域 */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>您的目标</Text>
          <View style={styles.goalContainer}>
            {goalOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.goalOption,
                  goal === option.value && styles.goalOptionSelected,
                ]}
                onPress={() => setGoal(option.value)}
              >
                <HugeiconsIcon
                  icon={option.icon}
                  size={28}
                  color={
                    goal === option.value ? Colors.WHITE : Colors.DARK_GRAY
                  }
                />
                <View style={styles.goalContent}>
                  <Text
                    style={[
                      styles.goalTitle,
                      goal === option.value && styles.goalTitleSelected,
                    ]}
                  >
                    {option.title}
                  </Text>
                  <Text
                    style={[
                      styles.goalDescription,
                      goal === option.value && styles.goalDescriptionSelected,
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 继续按钮 */}
        <View style={styles.buttonContainer}>
          <Button title="继续" onPress={handleContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.BLACK,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.BLACK,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  inputHalf: {
    flex: 1,
    gap: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.BLACK,
    marginBottom: 2,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 12,
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    minHeight: 120,
  },
  genderOptionSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  genderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.BLACK,
  },
  genderTextSelected: {
    color: Colors.WHITE,
  },
  goalContainer: {
    gap: 15,
    marginTop: 12,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    gap: 20,
  },
  goalOptionSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  goalContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.BLACK,
    marginBottom: 4,
  },
  goalTitleSelected: {
    color: Colors.WHITE,
  },
  goalDescription: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    lineHeight: 20,
  },
  goalDescriptionSelected: {
    color: Colors.LIGHT_GRAY,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default Preference;

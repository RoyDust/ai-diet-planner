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
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "male" && styles.genderOptionSelected,
              ]}
              onPress={() => setGender("male")}
            >
              <HugeiconsIcon
                icon={User02Icon}
                size={40}
                color={gender === "male" ? Colors.WHITE : Colors.DARK_GRAY}
              />
              <Text
                style={[
                  styles.genderText,
                  gender === "male" && styles.genderTextSelected,
                ]}
              >
                男性
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "female" && styles.genderOptionSelected,
              ]}
              onPress={() => setGender("female")}
            >
              <HugeiconsIcon
                icon={User02Icon}
                size={40}
                color={gender === "female" ? Colors.WHITE : Colors.DARK_GRAY}
              />
              <Text
                style={[
                  styles.genderText,
                  gender === "female" && styles.genderTextSelected,
                ]}
              >
                女性
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 目标选择区域 */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>您的目标</Text>
          <View style={styles.goalContainer}>
            <TouchableOpacity
              style={[
                styles.goalOption,
                goal === "lose" && styles.goalOptionSelected,
              ]}
              onPress={() => setGoal("lose")}
            >
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={28}
                color={goal === "lose" ? Colors.WHITE : Colors.DARK_GRAY}
              />
              <View style={styles.goalContent}>
                <Text
                  style={[
                    styles.goalTitle,
                    goal === "lose" && styles.goalTitleSelected,
                  ]}
                >
                  减重
                </Text>
                <Text
                  style={[
                    styles.goalDescription,
                    goal === "lose" && styles.goalDescriptionSelected,
                  ]}
                >
                  减少体重，塑造理想身材
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalOption,
                goal === "gain" && styles.goalOptionSelected,
              ]}
              onPress={() => setGoal("gain")}
            >
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                size={28}
                color={goal === "gain" ? Colors.WHITE : Colors.DARK_GRAY}
              />
              <View style={styles.goalContent}>
                <Text
                  style={[
                    styles.goalTitle,
                    goal === "gain" && styles.goalTitleSelected,
                  ]}
                >
                  增重
                </Text>
                <Text
                  style={[
                    styles.goalDescription,
                    goal === "gain" && styles.goalDescriptionSelected,
                  ]}
                >
                  健康增重，增强体质
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalOption,
                goal === "muscle" && styles.goalOptionSelected,
              ]}
              onPress={() => setGoal("muscle")}
            >
              <HugeiconsIcon
                icon={Dumbbell01Icon}
                size={28}
                color={goal === "muscle" ? Colors.WHITE : Colors.DARK_GRAY}
              />
              <View style={styles.goalContent}>
                <Text
                  style={[
                    styles.goalTitle,
                    goal === "muscle" && styles.goalTitleSelected,
                  ]}
                >
                  增肌
                </Text>
                <Text
                  style={[
                    styles.goalDescription,
                    goal === "muscle" && styles.goalDescriptionSelected,
                  ]}
                >
                  增强肌肉质量和力量
                </Text>
              </View>
            </TouchableOpacity>
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

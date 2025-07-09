import Colors from "@/shared/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AIRecommendationProps {
  onGeneratePress?: () => void;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({
  onGeneratePress,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f97ff", "#8D10EC"]} style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <Text style={styles.title}>需要餐食灵感?✨</Text>
            <Text style={styles.subtitle}>让我们的AI为您生成个性化食谱！</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onGeneratePress}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="auto-awesome"
              size={20}
              color={Colors.YELLOW}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>AI生成餐食</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={Colors.PRIMARY}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.INFO,
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
  content: {
    gap: 16,
  },
  textSection: {
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.WHITE,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.WHITE,
    lineHeight: 20,
    fontWeight: "400",
  },
  button: {
    width: "100%",
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginLeft: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AIRecommendation;

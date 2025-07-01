import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Colors from "@/shared/Colors";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GenerateAiRecipe = () => {
  const [userInput, setUserInput] = useState("");

  const onGenerate = () => {
    // Implement AI generation logic here
    console.log("Generating recipe for:", userInput);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>AI食谱生成器</Text>
        <Text style={styles.subtitle}>使用AI生成个性化食谱</Text>

        <View style={styles.spacer} />

        <Input
          placeholder="输入你的饮食偏好，例如：&#10;- 低碳水&#10;- 素食&#10;- 健身增肌"
          value={userInput}
          onChangeText={setUserInput}
          multiline
          style={styles.input}
        />

        <View style={styles.spacer} />

        <Button title="生成食谱" onPress={onGenerate} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.BLACK,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 8,
  },
  spacer: {
    height: 32,
  },
  input: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: 18,
  },
});

export default GenerateAiRecipe;

import Colors from "@/shared/Colors";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RecipeSteps = ({ recipeDetail }: { recipeDetail: any }) => {
  const steps = recipeDetail?.jsonData?.steps;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>步骤</Text>
      <Text style={styles.stepsTitle}>{steps?.length} 步骤</Text>
      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
  },
  stepsTitle: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    marginTop: 5,
  },
  stepItem: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 10,
    flex: 1,
  },
  stepNumber: {
    fontSize: 15,
    color: Colors.WHITE,
    fontWeight: "bold",
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    paddingHorizontal: 15,
  },
  stepText: {
    fontSize: 18,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 25,
  },
});

export default RecipeSteps;

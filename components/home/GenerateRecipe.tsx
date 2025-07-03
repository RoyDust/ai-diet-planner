import Colors from "@/shared/Colors";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const GenerateRecipe = ({ recipeDetail }: { recipeDetail: any }) => {
  const RecipeJson = recipeDetail?.jsonData;
  console.log("RecipeJson", RecipeJson);
  return (
    <View style={styles.container}>
      <Image source={{ uri: recipeDetail?.imageUrl }} style={styles.image} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{recipeDetail?.recipeName}</Text>
        <View style={styles.iconContainer}>
          <HugeiconsIcon
            color={Colors.PRIMARY}
            size={30}
            icon={PlusSignSquareIcon}
          />
        </View>
      </View>
      <View style={styles.recipeContainer}>
        <Text style={styles.recipeText}>{RecipeJson?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.TEXT_PRIMARY,
    textAlign: "center",
  },
  iconContainer: {
    marginTop: 2,
  },
  recipeContainer: {
    marginTop: 6,
  },
  recipeText: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 25,
  },
});

export default GenerateRecipe;

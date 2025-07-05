import Colors from "@/shared/Colors";
import {
  Fire03Icon,
  PlusSignSquareIcon,
  ServiceFreeIcons,
  Time02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const GenerateRecipe = ({ recipeDetail }: { recipeDetail: any }) => {
  const RecipeJson = recipeDetail?.jsonData;
  // console.log("RecipeJson", RecipeJson);
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
      <View style={styles.ingredientsContainer}>
        <View style={styles.ingredientsIconContainer}>
          <HugeiconsIcon color={Colors.PRIMARY} size={30} icon={Fire03Icon} />
          <Text style={styles.ingredientsTitle}>卡路里</Text>
          <Text style={styles.ingredientsText}>{RecipeJson?.calories}</Text>
        </View>
        {/* <View style={styles.ingredientsIconContainer}>
          <HugeiconsIcon
            color={Colors.PRIMARY}
            size={30}
            icon={Dumbbell01FreeIcons}
          />
          <Text style={styles.ingredientsTitle}>蛋白质</Text>
          <Text style={styles.ingredientsText}>{RecipeJson?.calories}</Text>
        </View> */}
        <View style={styles.ingredientsIconContainer}>
          <HugeiconsIcon
            color={Colors.PRIMARY}
            size={30}
            icon={Time02FreeIcons}
          />
          <Text style={styles.ingredientsTitle}>时间</Text>
          <Text style={styles.ingredientsText}>{RecipeJson?.cookTime} min</Text>
        </View>
        <View style={styles.ingredientsIconContainer}>
          <HugeiconsIcon
            color={Colors.PRIMARY}
            size={30}
            icon={ServiceFreeIcons}
          />
          <Text style={styles.ingredientsTitle}>步骤</Text>
          <Text style={styles.ingredientsText}>{RecipeJson?.serveTo}</Text>
        </View>
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
  ingredientsContainer: {
    marginTop: 15,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ingredientsIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_BG,
    padding: 6,
    borderRadius: 10,
    width: 110,
    gap: 2,
  },
  ingredientsTitle: {
    fontSize: 18,
    // color: Colors.TEXT_SECONDARY,
  },
  ingredientsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    display: "flex",
  },
});

export default GenerateRecipe;

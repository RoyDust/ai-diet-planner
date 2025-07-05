import Colors from "@/shared/Colors";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RecipeIngredients = ({ recipeDetail }: { recipeDetail: any }) => {
  const ingredients = recipeDetail?.jsonData?.ingredients;
  // console.log("RecipeJson", ingredients);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>食材</Text>
      <Text style={styles.ingredientListTitle}>
        {ingredients?.length} 种食材
      </Text>
      <FlatList
        style={styles.ingredientList}
        data={ingredients}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <View style={styles.ingredientItemIconContainer}>
              <Text style={styles.ingredientItemIcon}>{item.icon}</Text>
              <Text style={styles.ingredientItemText}>{item.ingredient}</Text>
            </View>
            <Text style={styles.ingredientItemQuantity}>{item.quantity}</Text>
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
  ingredientListTitle: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    marginTop: 5,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  ingredientItemIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ingredientItemIcon: {
    fontSize: 16,
    padding: 6,
    borderRadius: 99,
    backgroundColor: Colors.PRIMARY_BG,
  },
  ingredientItemText: {
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  ingredientItemQuantity: {
    fontSize: 17,
    color: Colors.TEXT_SECONDARY,
  },
  ingredientList: {
    marginTop: 10,
  },
});

export default RecipeIngredients;

import Colors from "@/shared/Colors";
import { TRecipe } from "@/types";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const RecipeCard = ({ recipeInfo }: { recipeInfo: TRecipe }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  const router = useRouter();

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => {
        router.push(`/recipe-detail?recipeId=${recipeInfo._id}`);
      }}
    >
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <Image
          style={styles.cardImage}
          source={{
            uri: recipeInfo.imageUrl,
          }}
        />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
            {recipeInfo.recipeName}
          </Text>
          <View style={styles.cardSubInfoContainer}>
            <Text style={styles.cardSubInfoText}>
              🔥 {recipeInfo.jsonData.calories} kcal
            </Text>
            <Text style={styles.cardSubInfoText}>
              🕒 {recipeInfo.jsonData.cookTime} min
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width * 0.45,
    height: 190,
    backgroundColor: Colors.WHITE,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardInfoContainer: {
    padding: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cardSubInfoText: {
    fontSize: 12,
    color: Colors.GRAY,
  },
});

export default RecipeCard;

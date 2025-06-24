import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";

const Home = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user?.height) {
      router.replace("/preference");
    }
  }, [user]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

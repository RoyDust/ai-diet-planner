import Button from "@/components/shared/Button";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/firebase";
import Colors from "@/shared/Colors";
import { useConvex } from "convex/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const convex = useConvex();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log("userInfo", userInfo);
      console.log(userInfo?.email);

      const currentUser = await convex.query(api.User.GetUserInfo, {
        email: userInfo!.email!,
      });
      console.log("user", currentUser);
      setUser(currentUser);
      router.push("/(tabs)/Home");
    });
    return () => unsubscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/images/bg.png")}
        style={{
          // width: "100%",
          height: Dimensions.get("screen").height,
        }}
        contentFit="contain"
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("../assets/images/menu.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: 150,
          }}
          contentFit="contain"
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: Colors.WHITE,
            marginTop: 20,
          }}
        >
          AI 智能食谱
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          精心制作美味、健康、刻薄的计划 专为您量身定制。实现您的目标 轻松！
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 25,
          width: "100%",
          padding: 20,
        }}
      >
        <Button
          title="开始使用"
          onPress={() => {
            router.push("/auth/SignIn");
          }}
        />
      </View>
    </View>
  );
}

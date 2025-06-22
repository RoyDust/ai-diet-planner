import Button from "@/components/shared/Button";
import Colors from "@/shared/Colors";
import { Image } from "expo-image";
import { Dimensions, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/images/bg.jpg")}
        style={{
          width: "100%",
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
          source={require("../assets/images/icon.png")}
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
            console.log("onPress");
          }}
        />
      </View>
    </View>
  );
}

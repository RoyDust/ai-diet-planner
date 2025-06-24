import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/firebase";
import Colors from "@/shared/Colors";
import { useConvex } from "convex/react";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 获取convex实例
  const convex = useConvex();
  // 获取路由实例
  const router = useRouter();

  // 获取用户信息 从useContext中获取
  const { user, setUser } = useContext(UserContext);

  const onSignin = async () => {
    console.log("onSignin", email, password);
    if (!email || !password) {
      Alert.alert("请输入邮箱和密码");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        const userInfo = await convex.query(api.User.GetUserInfo, {
          email: user.email!,
        });
        console.log("userInfo", userInfo);
        setUser(userInfo);

        Alert.alert("登录成功");
        router.push("/(tabs)/Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        Alert.alert("登录失败", errorMessage);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("../../assets/images/menu.png")}
        style={{
          width: 150,
          height: 150,
          marginTop: 60,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
          color: Colors.BLACK,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        欢迎回来
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input placeholder="请输入邮箱" value={email} onChangeText={setEmail} />
        <Input
          placeholder="请输入密码"
          password={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Button title="登录" onPress={() => onSignin()} />
        <View
          style={{
            marginTop: 15,
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              marginTop: 15,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            没有账号？
          </Text>
          <Link href="/auth/SignUp" asChild>
            <Text
              style={{
                color: Colors.SKYBLUE,
                textAlign: "center",
                fontSize: 16,
                marginTop: 14,
              }}
            >
              注册
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

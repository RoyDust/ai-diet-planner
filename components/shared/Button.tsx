import Colors from "@/shared/Colors";
import { Text, TouchableOpacity } from "react-native";

function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

import Colors from "@/shared/Colors";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

function Button({
  title,
  onPress,
  loading,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
}) {
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
      {loading ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;

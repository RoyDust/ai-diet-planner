import Colors from "@/shared/Colors";
import { TextInput } from "react-native";

export default function Input({
  placeholder,
  password = false,
  value,
  onChangeText,
}: {
  placeholder: string;
  password?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.GRAY}
      secureTextEntry={password}
      style={{
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderWidth: 1.5,
        borderColor: Colors.LIGHT_GRAY,
        borderRadius: 12,
        fontSize: 16,
        backgroundColor: Colors.WHITE,
        color: Colors.BLACK,
        shadowColor: Colors.BLACK,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    />
  );
}

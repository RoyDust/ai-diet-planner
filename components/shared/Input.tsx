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
      secureTextEntry={password}
      style={{
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        paddingVertical: 20,
      }}
    />
  );
}

import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  onPress,
  children,
  variant = "primary",
  loading,
  disabled,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled || loading}>
      <View>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text>{children}</Text>
        )}
      </View>
    </Pressable>
  );
}

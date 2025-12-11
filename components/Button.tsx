import { memo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from "react-native";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

const ACTIVITY_INDICATOR_COLOR = "white";

interface ButtonProps {
  onPress: (event?: GestureResponderEvent) => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    onPress,
    children,
    variant = ButtonVariant.PRIMARY, // TODO: use for styling or remove if not needed
    loading,
    disabled,
  } = props;
  const isPressable = !disabled && !loading;
  const handlePress = (event?: GestureResponderEvent) => {
    if (isPressable) {
      onPress(event);
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={!isPressable}>
      <View>
        {loading ? (
          <ActivityIndicator color={ACTIVITY_INDICATOR_COLOR} />
        ) : (
          <Text>{children}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default memo(Button);

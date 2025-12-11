import STRINGS from "@/constants/Strings";
import { GestureResponderEvent, Text, View } from "react-native";
import Button from "./Button";

interface ErrorStateProps {
  error: string;
  onRetry: (event?: GestureResponderEvent) => void;
}

const ErrorState = (props: ErrorStateProps) => {
  const { error, onRetry } = props;

  return (
    <View>
      <Text>
        {/* TODO: handle RTL languages */}
        {STRINGS.error}: {error}
      </Text>
      <Button onPress={onRetry}>{STRINGS.retry}</Button>
    </View>
  );
};

export default ErrorState;

import { ActivityIndicator, View } from "react-native";

const DEFAULT_SIZE = "small";

interface Props {
  size?: number | "small" | "large" | undefined;
}

const LoadingSpinner = (props: Props) => {
  const { size = DEFAULT_SIZE } = props;

  return (
    <View>
      <ActivityIndicator size={size} />
    </View>
  );
};

export default LoadingSpinner;

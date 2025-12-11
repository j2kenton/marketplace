import STRINGS from "@/constants/Strings";
import { Text, View } from "react-native";

interface EmptyStateProps {
  loading: boolean;
  message?: string;
}

const ListEmpty = (props: EmptyStateProps) => {
  const { loading, message = STRINGS.noItemsFound } = props;
  if (loading) return null;

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export default ListEmpty;

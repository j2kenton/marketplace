import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import LoadingSpinner from "./LoadingSpinner";

const ICON_SIZE = 64;

const EmptyContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Icon = styled(FontAwesome)`
  margin-bottom: 16px;
`;

interface EmptyStateProps {
  loading: boolean;
  message?: string;
  iconName?: React.ComponentProps<typeof FontAwesome>["name"];
}

const ListEmpty = (props: EmptyStateProps) => {
  const { loading, message = STRINGS.noItemsFound, iconName } = props;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <EmptyContainer>
      {iconName && (
        <Icon name={iconName} size={ICON_SIZE} color={COLORS.mutedIcon} />
      )}
      <Text>{message}</Text>
    </EmptyContainer>
  );
};

export default ListEmpty;

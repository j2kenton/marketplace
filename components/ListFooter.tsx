import STRINGS from "@/constants/Strings";
import { GestureResponderEvent, View } from "react-native";
import styled from "styled-components/native";
import Button from "./Button";

const Container = styled(View)`
  width: 100%;
  align-items: center;
  padding-vertical: 24px;
`;

interface ListFooterProps {
  loading?: boolean;
  hasMore?: boolean;
  isEmpty?: boolean;
  onLoadMore: (event?: GestureResponderEvent) => void;
}

const ListFooter = (props: ListFooterProps) => {
  const { loading, hasMore, isEmpty, onLoadMore } = props;

  if (isEmpty || !hasMore) {
    return null;
  }

  return (
    <Container>
      <Button onPress={onLoadMore} loading={loading}>
        {STRINGS.loadMore}
      </Button>
    </Container>
  );
};

export default ListFooter;

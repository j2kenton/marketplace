import STRINGS from "@/constants/Strings";
import { GestureResponderEvent } from "react-native";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

interface ListFooterProps {
  loading?: boolean;
  hasMore?: boolean;
  isEmpty?: boolean;
  onLoadMore: (event?: GestureResponderEvent) => void;
}

const ListFooter = (props: ListFooterProps) => {
  const { loading, hasMore, isEmpty, onLoadMore } = props;

  if (loading && isEmpty) {
    return <LoadingSpinner />;
  }

  if (!hasMore) {
    return null;
  }

  return (
    <Button onPress={onLoadMore} loading={loading}>
      {STRINGS.loadMore}
    </Button>
  );
};

export default ListFooter;

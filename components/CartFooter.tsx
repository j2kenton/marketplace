import STRINGS from "@/constants/Strings";
import { GestureResponderEvent, Text, View } from "react-native";
import Button from "./Button";
import CurrencyDisplay from "./CurrencyDisplay";

interface CartFooterProps {
  total: number;
  error: string | null;
  loading?: boolean;
  isEmpty?: boolean;
  onPlaceOrder: (event?: GestureResponderEvent) => void;
}

const CartFooter = (props: CartFooterProps) => {
  const { total, error, loading, isEmpty, onPlaceOrder } = props;

  if (isEmpty) {
    return null;
  }

  return (
    <View>
      <View>
        <Text>{STRINGS.total}</Text>
        <CurrencyDisplay value={total} />
      </View>
      {error ? <Text>{error}</Text> : null}
      <Button onPress={onPlaceOrder} loading={loading}>
        {STRINGS.placeOrder}
      </Button>
    </View>
  );
};

export default CartFooter;

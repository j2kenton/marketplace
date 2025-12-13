import STRINGS from "@/constants/Strings";
import { GestureResponderEvent, Text, View } from "react-native";
import styled from "styled-components/native";
import ActionButton from "./ActionButton";
import CurrencyDisplay from "./CurrencyDisplay";

const Container = styled(View)`
  padding: 24px 0;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

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
    <Container>
      <Row>
        <Text>{STRINGS.total}</Text>
        <CurrencyDisplay value={total} />
      </Row>
      {error ? <Text>{error}</Text> : null}
      <ActionButton
        onPress={onPlaceOrder}
        label={STRINGS.placeOrder}
        iconName="check"
        loading={loading}
      />
    </Container>
  );
};

export default CartFooter;

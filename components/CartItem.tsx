import { REMOVE } from "@/constants/Chars";
import { Product } from "@/types";
import { formatPrice } from "@/utils/Text";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";
import QuantitySelector from "./QuantitySelector";

const LINES_OF_TEXT = 1;

// TODO: make a proper grid system
export const CART_GRID = {
  IMAGE: 40,
  GAP: 6,
  QTY: 70,
  PRICE: 70,
  TOTAL: 90,
  REMOVE: 30,
};

const Container = styled(View)`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

const ProductPressable = styled(Pressable)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ProductImage = styled(Image)`
  width: ${CART_GRID.IMAGE}px;
  height: ${CART_GRID.IMAGE}px;
  border-radius: 8px;
  margin-right: ${CART_GRID.GAP}px;
`;

const ProductName = styled(Text)`
  flex: 1;
`;

const QuantityColumn = styled(View)`
  width: ${CART_GRID.QTY}px;
`;

const PriceText = styled(Text)`
  width: ${CART_GRID.PRICE}px;
  text-align: right;
`;

const TotalText = styled(Text)`
  width: ${CART_GRID.TOTAL}px;
  text-align: right;
`;

const RemoveButton = styled(Pressable)`
  width: ${CART_GRID.REMOVE}px;
  align-items: center;
`;

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: (event?: GestureResponderEvent) => void;
  onPressProduct: (event?: GestureResponderEvent) => void;
}

const CartItem = (props: CartItemProps) => {
  const { product, quantity, onUpdateQuantity, onRemove, onPressProduct } =
    props;
  const { price, name, image } = product;

  return (
    <Container>
      <ProductPressable accessibilityRole="link" onPress={onPressProduct}>
        <ProductImage source={{ uri: image }} />
        <ProductName numberOfLines={LINES_OF_TEXT}>{name}</ProductName>
      </ProductPressable>
      <QuantityColumn>
        <QuantitySelector value={quantity} onChange={onUpdateQuantity} />
      </QuantityColumn>
      <PriceText>@ {formatPrice(price)}</PriceText>
      <TotalText>{formatPrice(price * quantity)}</TotalText>
      <RemoveButton onPress={onRemove}>
        <Text>{REMOVE}</Text>
      </RemoveButton>
    </Container>
  );
};

export default CartItem;

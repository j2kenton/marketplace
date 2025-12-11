import { CURRENCY_SYMBOL, REMOVE } from "@/constants/Chars";
import { Product } from "@/types";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import QuantitySelector from "./QuantitySelector";

const LINES_OF_TEXT = 2;

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: (event?: GestureResponderEvent) => void;
}

const CartItem = (props: CartItemProps) => {
  const { product, quantity, onUpdateQuantity, onRemove } = props;
  const { price, name, image } = product;
  const priceText = `${CURRENCY_SYMBOL}${price}`;

  return (
    <View>
      <Image source={{ uri: image }} />
      <View>
        <Text numberOfLines={LINES_OF_TEXT}>{name}</Text>
        <Text>{priceText}</Text>
        <QuantitySelector value={quantity} onChange={onUpdateQuantity} />
      </View>
      <Pressable onPress={onRemove}>
        <Text>{REMOVE}</Text>
      </Pressable>
    </View>
  );
};

export default CartItem;

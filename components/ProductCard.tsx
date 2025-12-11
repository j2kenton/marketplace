import { Product } from "@/types";
import { memo } from "react";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import StarRating from "./StarRating";

const LINES_OF_TEXT = 2;
const CURRENCY_SYMBOL = "$"; // TODO: i11n

interface ProductCardProps {
  product: Product;
  onPress: (event?: GestureResponderEvent) => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { product, onPress } = props;
  const { image, name, price, rating, reviewCount } = product;

  return (
    <Pressable onPress={onPress}>
      <View>
        <Image source={{ uri: image }} />
        <Text numberOfLines={LINES_OF_TEXT}>{name}</Text>
        <Text>
          {CURRENCY_SYMBOL}
          {price}
        </Text>
        <StarRating rating={rating} reviewCount={reviewCount} />
      </View>
    </Pressable>
  );
};

export default memo(ProductCard);

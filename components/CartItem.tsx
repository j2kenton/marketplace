import { Product } from "@/types";
import { Image, Pressable, Text, View } from "react-native";
import { QuantitySelector } from "./QuantitySelector";

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image source={{ uri: product.image }} />
      <View>
        <Text numberOfLines={2}>{product.name}</Text>
        <Text>${product.price}</Text>
        <QuantitySelector value={quantity} onChange={onUpdateQuantity} />
      </View>
      <Pressable onPress={onRemove}>
        <Text>✕</Text>
      </Pressable>
    </View>
  );
}

import { Product } from "@/types";
import { Image, Pressable, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Image source={{ uri: product.image }} />
        <Text numberOfLines={2}>{product.name}</Text>
        <Text>${product.price}</Text>
        <Text>
          ⭐ {product.rating} ({product.reviewCount})
        </Text>
      </View>
    </Pressable>
  );
}

import Button from "@/components/Button";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import StarRating from "@/components/StarRating";
import STRINGS from "@/constants/Strings";
import { api } from "@/services/api";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // TODO: handle quantity selection or remove this if unneeded
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const result = await api.getProduct(id);
      setProduct(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : STRINGS.productFetchError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ productId: product.id, quantity }));
      router.back();
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error || !product) {
    return (
      <ErrorState
        error={error || STRINGS.productNotFound}
        onRetry={fetchProduct}
      />
    );
  }

  const { price, rating, reviewCount, category, stock, name } = product;

  return (
    <View>
      <Image source={{ uri: product.image }} />
      <View>
        <Text>{name}</Text>
        <CurrencyDisplay value={price} />
        <StarRating rating={rating} reviewCount={reviewCount} />
        <Text>
          {STRINGS.category}: {category.name}
        </Text>
        <Text>
          {STRINGS.inStock}: {stock}
        </Text>
      </View>
      <View>
        <Button onPress={handleAddToCart}>{STRINGS.addToCart}</Button>
      </View>
    </View>
  );
}

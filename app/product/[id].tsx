import ActionButton from "@/components/ActionButton";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import StarRating from "@/components/StarRating";
import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontSize, FontWeight } from "@/constants/Text";
import { api } from "@/services/api";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";

const TITLE_ARIA_LEVEL = 2;
const ICON_SIZE = 16;

const ScreenContainer = styled(View)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
  padding: 16px;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

const Title = styled(Text)`
  font-size: ${FontSize.SIZE_24};
  font-weight: ${FontWeight.BOLD};
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Description = styled(Text)`
  margin-bottom: 12px;
`;

const InfoRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
      dispatch(
        addToCart({
          productId: product.id,
          quantity,
          maxQuantity: product.stock,
        })
      );
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingSpinner />
      </ScreenContainer>
    );
  }

  if (error || !product) {
    return (
      <ErrorState
        error={error || STRINGS.productNotFound}
        onRetry={fetchProduct}
      />
    );
  }

  const { price, rating, reviewCount, category, stock, name, description } =
    product;

  return (
    <ScreenContainer>
      <Content>
        <ProductImage source={{ uri: product.image }} />
        <View>
          <Title accessibilityRole="header" aria-level={TITLE_ARIA_LEVEL}>
            {name}
          </Title>
          <Description>{description}</Description>
          <InfoRow>
            <FontAwesome name="dollar" size={ICON_SIZE} color={COLORS.black} />
            <CurrencyDisplay value={price} />
          </InfoRow>
          <InfoRow>
            <FontAwesome name="star" size={ICON_SIZE} color={COLORS.black} />
            <StarRating rating={rating} reviewCount={reviewCount} />
          </InfoRow>
          <InfoRow>
            <FontAwesome name="tag" size={ICON_SIZE} color={COLORS.black} />
            <Text>
              {STRINGS.category}: {category.name}
            </Text>
          </InfoRow>
          <InfoRow>
            <FontAwesome name="cube" size={ICON_SIZE} color={COLORS.black} />
            <Text>
              {STRINGS.inStock}: {stock}
            </Text>
          </InfoRow>
        </View>
      </Content>
      <ActionButton
        onPress={handleAddToCart}
        label={STRINGS.addToCart}
        iconName="shopping-cart"
      />
    </ScreenContainer>
  );
}

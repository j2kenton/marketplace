import ActionButton from "@/components/ActionButton";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import ErrorState from "@/components/ErrorState";
import IconInfoRow from "@/components/IconInfoRow";
import LoadingSpinner from "@/components/LoadingSpinner";
import QuantitySelector from "@/components/QuantitySelector";
import StarRating from "@/components/StarRating";
import STRINGS from "@/constants/Strings";
import { FontSize, FontWeight } from "@/constants/Text";
import { api } from "@/services/api";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types";
import { clampQuantity } from "@/utils/Numbers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";

const TITLE_ARIA_LEVEL = 2;
const MIN_TO_ADD = 1;

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

const QuantitySection = styled(View)`
  margin-top: 16px;
  gap: 8px;
`;

const QuantityLabel = styled(Text)`
  font-weight: ${FontWeight.BOLD};
`;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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
    if (!product) {
      return;
    }

    const quantityToAdd = clampQuantity(quantity, product.stock);

    if (quantityToAdd <= 0) {
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        quantity: quantityToAdd,
        maxQuantity: product.stock,
      })
    );
    router.push("/cart");
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
  const isAddDisabled = stock <= 0 || quantity <= 0;

  return (
    <ScreenContainer>
      <Content>
        <ProductImage source={{ uri: product.image }} />
        <View>
          <Title accessibilityRole="header" aria-level={TITLE_ARIA_LEVEL}>
            {name}
          </Title>
          <Description>{description}</Description>
          <IconInfoRow iconName="dollar">
            <CurrencyDisplay value={price} />
          </IconInfoRow>
          <IconInfoRow iconName="star">
            <StarRating rating={rating} reviewCount={reviewCount} />
          </IconInfoRow>
          <IconInfoRow iconName="tag">
            <Text>
              {STRINGS.category}: {category.name}
            </Text>
          </IconInfoRow>
          <IconInfoRow iconName="cube">
            <Text>
              {STRINGS.inStock}: {stock}
            </Text>
          </IconInfoRow>
          <QuantitySection>
            <QuantityLabel>{STRINGS.quantity}</QuantityLabel>
            <QuantitySelector
              value={quantity}
              min={MIN_TO_ADD}
              max={stock}
              onChange={setQuantity}
            />
          </QuantitySection>
        </View>
      </Content>
      <ActionButton
        onPress={handleAddToCart}
        label={STRINGS.addToCart}
        iconName="shopping-cart"
        disabled={isAddDisabled}
      />
    </ScreenContainer>
  );
}

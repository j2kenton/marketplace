import { CURRENCY_SYMBOL } from "@/constants/Chars";
import COLORS from "@/constants/Colors";
import { FontSize, FontWeight } from "@/constants/Text";
import { Product } from "@/types";
import { memo } from "react";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";
import StarRating from "./StarRating";

const LINES_OF_TEXT = 2;

const CardPressable = styled(Pressable)`
  flex: 1;
  min-height: unset;
`;

const ContentWrapper = styled(View)`
  padding: 12px;
  background-color: ${COLORS.productCardBackground};
  border-radius: 8px;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 150px;
  border-radius: 8px;
`;

const Title = styled(Text)`
  font-size: ${FontSize.SIZE_20};
  font-weight: ${FontWeight.REGULAR};
  margin-top: 10px;
`;

const PriceRow = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Price = styled(Text)`
  flex: 1;
`;

interface ProductCardProps {
  product: Product;
  onPress: (event?: GestureResponderEvent) => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { product, onPress } = props;
  const { image, name, price, rating, reviewCount } = product;

  return (
    <CardPressable onPress={onPress}>
      <ContentWrapper>
        <ProductImage source={{ uri: image }} />
        <Title numberOfLines={LINES_OF_TEXT}>{name}</Title>
        <PriceRow>
          <Price>
            {CURRENCY_SYMBOL}
            {price}
          </Price>
          <StarRating rating={rating} reviewCount={reviewCount} />
        </PriceRow>
      </ContentWrapper>
    </CardPressable>
  );
};

export default memo(ProductCard);

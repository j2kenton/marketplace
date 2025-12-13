import ProductCard from "@/components/ProductCard";
import { EYES } from "@/constants/Chars";
import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontSize } from "@/constants/Text";
import { getOneProductPerCategory } from "@/services/mockData";
import { useAppDispatch } from "@/store/hooks";
import { setCategoryFilter } from "@/store/slices/productsSlice";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Divider = styled(View)`
  width: 100%;
  height: 1px;
  background-color: ${COLORS.gray400};
  margin-bottom: 24px;
`;

const Heading = styled(Text)`
  font-size: ${FontSize.SIZE_18};
  font-weight: 600;
  margin-bottom: 32px;
  text-align: left;
`;

const Eye = styled(Text)`
  font-size: ${FontSize.SIZE_30};
`;

const ProductList = styled(View)`
  width: 100%;
  gap: 16px;
`;

const CategoryLink = styled(Text)`
  font-size: ${FontSize.SIZE_21};
  font-weight: 600;
  color: ${COLORS.tint};
  text-decoration-line: underline;
  margin-bottom: 8px;
`;

const Recommendations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const featuredProducts = getOneProductPerCategory();

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    dispatch(setCategoryFilter(categoryId));
    router.navigate("/");
  };

  return (
    <>
      <Divider />
      <Heading>
        {STRINGS.recommendationsHeading} <Eye>{EYES}</Eye>
      </Heading>
      <ProductList>
        {featuredProducts.map((product) => (
          <View key={product.id}>
            <CategoryLink
              accessibilityRole="link"
              onPress={() => handleCategoryPress(product.category.id)}
            >
              {product.category.name}
            </CategoryLink>
            <ProductCard
              product={product}
              onPress={() => handleProductPress(product.id)}
            />
          </View>
        ))}
      </ProductList>
    </>
  );
};

export default Recommendations;

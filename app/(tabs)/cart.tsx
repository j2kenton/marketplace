import ActionButton from "@/components/ActionButton";
import CartItem, { CART_GRID } from "@/components/CartItem";
import Confirmation from "@/components/Confirmation";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import Recommendations from "@/components/Recommendations";
import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontWeight } from "@/constants/Text";
import { api } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotal, selectCartWithProducts } from "@/store/selectors";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import type { ListRenderItem } from "react-native";
import { Text, View } from "react-native";
import styled from "styled-components/native";

type CartListItem = ReturnType<typeof selectCartWithProducts>[number];

const ScreenContainer = styled(View)`
  flex: 1;
`;

const CartList = styled.FlatList.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  padding: 16px 8px 16px 16px;
`;

const Footer = styled(View)`
  padding-vertical: 24px;
`;

const FooterRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

interface GridCellProps {
  $width: number;
  $marginRight?: number;
}

const GridCell = styled(View)<GridCellProps>`
  width: ${({ $width }: GridCellProps) => `${$width}px`};
  ${({ $marginRight }: GridCellProps) =>
    $marginRight ? `margin-right: ${$marginRight}px;` : ""};
`;

const TotalLabel = styled(Text)`
  flex: 1;
  font-weight: ${FontWeight.BOLD};
`;

const TotalAmount = styled(CurrencyDisplay)`
  width: 100%;
  text-align: right;
`;

const ErrorText = styled(Text)``;

function CartContent() {
  const { status } = useLocalSearchParams<{ status?: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartWithProducts);
  const cartTotal = useAppSelector(selectCartTotal);

  const [orderComplete, setOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success") {
      setOrderComplete(true);
    }
  }, [status]);

  useFocusEffect(
    useCallback(() => {
      return () => setOrderComplete(false);
    }, [])
  );

  useEffect(() => {
    if (cartItems.length > 0 && orderComplete) {
      setOrderComplete(false);
    }
  }, [cartItems.length, orderComplete]);

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    maxQuantity: number
  ) => {
    dispatch(updateQuantity({ productId, quantity, maxQuantity }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleViewProduct = (productId: string) => {
    router.push({ pathname: "/product/[id]", params: { id: productId } });
  };

  // TODO: move to api service
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await api.placeOrder(orderItems);
      dispatch(clearCart());
      setOrderComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : STRINGS.orderFailed);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = cartItems.length === 0;

  const renderCartItem: ListRenderItem<CartListItem> = ({ item }) => {
    const { product, quantity, productId } = item;
    return (
      <CartItem
        product={product}
        quantity={quantity}
        onUpdateQuantity={(qty) =>
          handleUpdateQuantity(productId, qty, product.stock)
        }
        onRemove={() => handleRemove(productId)}
        onPressProduct={() => handleViewProduct(productId)}
      />
    );
  };

  if (isEmpty && orderComplete) {
    return (
      <Confirmation
        iconName="check-circle"
        iconColor={COLORS.success}
        title={STRINGS.orderConfirmedTitle}
        message={STRINGS.orderConfirmedMessage}
      >
        <Recommendations hasJustOrdered />
      </Confirmation>
    );
  }

  if (isEmpty) {
    return (
      <Confirmation
        iconName="shopping-cart"
        title={STRINGS.cartEmpty}
        message={STRINGS.cartEmptyDescription}
      >
        <Recommendations />
      </Confirmation>
    );
  }

  return (
    <ScreenContainer>
      <CartList
        data={cartItems}
        keyExtractor={({ productId }: CartListItem) => productId}
        renderItem={renderCartItem}
        ListFooterComponent={
          <Footer>
            <FooterRow>
              <GridCell $width={CART_GRID.IMAGE} $marginRight={CART_GRID.GAP} />
              <TotalLabel>{STRINGS.total}</TotalLabel>
              <GridCell $width={CART_GRID.QTY} />
              <GridCell $width={CART_GRID.PRICE} />
              <GridCell $width={CART_GRID.TOTAL}>
                <TotalAmount value={cartTotal} />
              </GridCell>
              <GridCell $width={CART_GRID.REMOVE} />
            </FooterRow>
            {error ? <ErrorText>{error}</ErrorText> : null}
          </Footer>
        }
      />
      <ActionButton
        onPress={handlePlaceOrder}
        label={STRINGS.placeOrder}
        iconName="check"
        loading={loading}
        backgroundColor={COLORS.success}
      />
    </ScreenContainer>
  );
}

// TODO: find a better fix for this re-rendering issue
export default function CartScreen() {
  const [renderKey, setRenderKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRenderKey((key) => key + 1);
    }, [])
  );

  return <CartContent key={renderKey} />;
}

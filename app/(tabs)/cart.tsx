import CartFooter from "@/components/CartFooter";
import CartItem from "@/components/CartItem";
import ListEmpty from "@/components/ListEmpty";
import STRINGS from "@/constants/Strings";
import { api } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotal, selectCartWithProducts } from "@/store/selectors";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartWithProducts);
  const cartTotal = useAppSelector(selectCartTotal);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

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
      // TODO: extract route string
      router.push("/order-success");
    } catch (err) {
      setError(err instanceof Error ? err.message : STRINGS.orderFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={cartItems}
      keyExtractor={({ productId }) => productId}
      renderItem={({ item }) => {
        const { product, quantity, productId } = item;
        return (
          <CartItem
            product={product}
            quantity={quantity}
            onUpdateQuantity={(qty) => handleUpdateQuantity(productId, qty)}
            onRemove={() => handleRemove(productId)}
          />
        );
      }}
      ListEmptyComponent={
        <ListEmpty loading={false} message={STRINGS.cartEmpty} />
      }
      ListFooterComponent={
        <CartFooter
          total={cartTotal}
          error={error}
          loading={loading}
          isEmpty={cartItems.length === 0}
          onPlaceOrder={handlePlaceOrder}
        />
      }
    />
  );
}

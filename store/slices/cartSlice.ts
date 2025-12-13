import { CartItem } from "@/types";
import { clampQuantity } from "@/utils/Numbers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        maxQuantity?: number;
      }>
    ) {
      const { productId, quantity, maxQuantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      const nextQuantity = clampQuantity(
        (existingItem?.quantity ?? 0) + quantity,
        maxQuantity
      );
      if (existingItem) {
        existingItem.quantity = nextQuantity;
      } else if (nextQuantity > 0) {
        state.items.push({ productId, quantity: nextQuantity });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        maxQuantity?: number;
      }>
    ) {
      const { productId, quantity, maxQuantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = clampQuantity(quantity, maxQuantity);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

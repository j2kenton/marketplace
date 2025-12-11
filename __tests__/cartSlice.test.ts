import cartReducer, {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";

describe("cartSlice", () => {
  const initialState = { items: [] };

  describe("addToCart", () => {
    it("should add item to cart", () => {
      const state = cartReducer(
        initialState,
        addToCart({ productId: "1", quantity: 2 })
      );
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({ productId: "1", quantity: 2 });
    });

    it("should increase quantity if item already exists in cart", () => {
      const stateWithItem = { items: [{ productId: "1", quantity: 1 }] };
      const state = cartReducer(
        stateWithItem,
        addToCart({ productId: "1", quantity: 2 })
      );
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3);
    });

    it("should add multiple different items to cart", () => {
      let state = cartReducer(
        initialState,
        addToCart({ productId: "1", quantity: 1 })
      );
      state = cartReducer(state, addToCart({ productId: "2", quantity: 3 }));
      expect(state.items).toHaveLength(2);
      expect(state.items[0]).toEqual({ productId: "1", quantity: 1 });
      expect(state.items[1]).toEqual({ productId: "2", quantity: 3 });
    });
  });

  describe("removeFromCart", () => {
    it("should remove item from cart", () => {
      const stateWithItem = { items: [{ productId: "1", quantity: 1 }] };
      const state = cartReducer(stateWithItem, removeFromCart("1"));
      expect(state.items).toHaveLength(0);
    });

    it("should only remove the specified item", () => {
      const stateWithItems = {
        items: [
          { productId: "1", quantity: 1 },
          { productId: "2", quantity: 2 },
        ],
      };
      const state = cartReducer(stateWithItems, removeFromCart("1"));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].productId).toBe("2");
    });
  });

  describe("updateQuantity", () => {
    it("should update quantity of existing item", () => {
      const stateWithItem = { items: [{ productId: "1", quantity: 1 }] };
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: "1", quantity: 5 })
      );
      expect(state.items[0].quantity).toBe(5);
    });
  });

  describe("clearCart", () => {
    it("should remove all items from cart", () => {
      const stateWithItems = {
        items: [
          { productId: "1", quantity: 1 },
          { productId: "2", quantity: 2 },
        ],
      };
      const state = cartReducer(stateWithItems, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });
});

import STRINGS from "@/constants/Strings";
import { useAppSelector } from "@/store/hooks";
import { selectCartItemCount } from "@/store/selectors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

const ICON_SIZE = 24;

export default function TabLayout() {
  const cartCount = useAppSelector(selectCartItemCount);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: STRINGS.products,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-bag" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: STRINGS.cart,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={ICON_SIZE} color={color} />
          ),
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
    </Tabs>
  );
}

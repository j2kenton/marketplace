import Button from "@/components/Button";
import { CHECK_MARK } from "@/constants/Chars";
import STRINGS from "@/constants/Strings";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function OrderSuccessScreen() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.replace("/");
  };

  return (
    <View>
      <Text>{CHECK_MARK}</Text>
      <Text>Order Confirmed!</Text>
      <Text>Thank you for your purchase.</Text>
      <Button onPress={handleContinueShopping}>
        {STRINGS.continueShopping}
      </Button>
    </View>
  );
}

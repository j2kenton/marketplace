import { CURRENCY_SYMBOL } from "@/constants/Chars";
import { memo } from "react";
import { Text } from "react-native";

const CURRENCY_DECIMALS = 2;

interface CurrencyDisplayProps {
  value: number;
}

const CurrencyDisplay = (props: CurrencyDisplayProps) => {
  const { value } = props;

  return (
    <Text>
      {CURRENCY_SYMBOL}
      {value.toFixed(CURRENCY_DECIMALS)}
    </Text>
  );
};

export default memo(CurrencyDisplay);

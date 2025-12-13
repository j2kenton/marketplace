import { CURRENCY_SYMBOL } from "@/constants/Chars";
import { memo } from "react";
import { Text, TextProps } from "react-native";

const CURRENCY_DECIMALS = 2;

interface CurrencyDisplayProps extends TextProps {
  value: number;
}

const CurrencyDisplay = (props: CurrencyDisplayProps) => {
  const { value, style, ...textProps } = props;

  return (
    <Text {...textProps} style={style}>
      {CURRENCY_SYMBOL}
      {value.toFixed(CURRENCY_DECIMALS)}
    </Text>
  );
};

export default memo(CurrencyDisplay);

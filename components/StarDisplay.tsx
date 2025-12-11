import { EMPTY_STAR, STAR_SYMBOL } from "@/constants/Chars";
import { memo } from "react";
import { Text } from "react-native";

interface StarDisplayProps {
  count: number;
  max: number;
}

const StarDisplay = (props: StarDisplayProps) => {
  const { count, max } = props;

  if (count < 0 || count > max) {
    return null;
  }

  const filledStars = Math.round(count);
  const emptyStars = max - filledStars;
  const stars = STAR_SYMBOL.repeat(filledStars) + EMPTY_STAR.repeat(emptyStars);

  return <Text>{stars}</Text>;
};

export default memo(StarDisplay);

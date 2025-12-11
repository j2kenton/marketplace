import { STAR_SYMBOL } from "@/constants/Chars";
import { memo } from "react";
import { Text } from "react-native";

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

const StarRating = (props: StarRatingProps) => {
  const { rating, reviewCount } = props;
  const reviewCountString = ["(", reviewCount, ")"].join("");

  return (
    <Text>
      {STAR_SYMBOL} {rating} {reviewCountString}
    </Text>
  );
};

export default memo(StarRating);

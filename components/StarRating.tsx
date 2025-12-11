import { memo } from "react";
import { Text, View } from "react-native";
import StarDisplay from "./StarDisplay";

const MAX_RATING = 5;

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

const StarRating = (props: StarRatingProps) => {
  const { rating, reviewCount } = props;
  const isInvalidRating =
    !Number.isFinite(rating) || rating < 0 || rating > MAX_RATING;
  const isInvalidReviewCount =
    typeof reviewCount === "undefined" ||
    !Number.isFinite(reviewCount) ||
    reviewCount <= 0;

  if (isInvalidRating || isInvalidReviewCount) {
    return null;
  }

  const reviewCountString = ["(", reviewCount, ")"].join("");

  return (
    <View>
      <Text>{rating}</Text>
      <StarDisplay count={rating} max={MAX_RATING} />
      <Text> {reviewCountString}</Text>
    </View>
  );
};

export default memo(StarRating);

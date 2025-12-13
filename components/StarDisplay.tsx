import COLORS from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { memo } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const StyledView = styled(View)`
  flex-direction: row;
`;

interface StarDisplayProps {
  count: number;
  max: number;
  size?: number;
  color?: string;
}

const StarDisplay = (props: StarDisplayProps) => {
  const { count, max, size = 16, color = COLORS.warning } = props;

  if (count < 0 || count > max) {
    return null;
  }

  const filledStars = Math.round(count);
  const emptyStars = max - filledStars;

  const stars = [];
  let starIndex = 0;

  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <FontAwesome key={`star-${i}`} name="star" size={size} color={color} />
    );
    starIndex++;
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesome key={`star-${i}`} name="star-o" size={size} color={color} />
    );
    starIndex++;
  }

  return <StyledView>{stars}</StyledView>;
};

export default memo(StarDisplay);

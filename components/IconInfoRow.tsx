import COLORS from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const ICON_SIZE = 16;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

interface IconInfoRowProps {
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  children: ReactNode;
}

const IconInfoRow = ({ iconName, children }: IconInfoRowProps) => (
  <Row>
    <FontAwesome name={iconName} size={ICON_SIZE} color={COLORS.black} />
    {children}
  </Row>
);

export default IconInfoRow;

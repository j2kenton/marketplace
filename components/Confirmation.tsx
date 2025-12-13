import COLORS from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

const ICON_SIZE = 64;
const TITLE_ARIA_LEVEL = 2;

const { height: screenHeight } = Dimensions.get("window");

const Container = styled(ScrollView)`
  flex: 1;
`;

const Content = styled(View)`
  padding: 16px;
  padding-bottom: 32px;
  gap: 24px;
`;

const Hero = styled(View)`
  justify-content: center;
  align-items: center;
  min-height: ${screenHeight * 0.5}px;
  padding-vertical: 24px;
  gap: 8px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Message = styled(Text)`
  font-size: 16px;
  color: #444;
  text-align: center;
`;

const ActionButton = styled(Pressable)`
  align-self: center;
  margin-top: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${COLORS.tint};
`;

const ActionLabel = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

interface ConfirmationProps {
  title: string;
  message?: string;
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  iconColor?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  children?: ReactNode;
}

const Confirmation = ({
  iconName,
  title,
  message,
  iconColor = COLORS.tint,
  actionLabel,
  onActionPress,
  children,
}: ConfirmationProps) => {
  return (
    <Container>
      <Content>
        <Hero>
          <FontAwesome
            name={iconName}
            size={ICON_SIZE}
            color={iconColor}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
            aria-hidden={true}
          />
          <Title accessibilityRole="header" aria-level={TITLE_ARIA_LEVEL}>
            {title}
          </Title>
          {message ? <Message>{message}</Message> : null}
        </Hero>
        {children}
        {actionLabel && onActionPress ? (
          <ActionButton accessibilityRole="button" onPress={onActionPress}>
            <ActionLabel>{actionLabel}</ActionLabel>
          </ActionButton>
        ) : null}
      </Content>
    </Container>
  );
};

export default Confirmation;

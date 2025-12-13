import COLORS from "@/constants/Colors";
import { FontSize, FontWeight } from "@/constants/Text";
import { memo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

const VARIANT_STYLES = {
  [ButtonVariant.PRIMARY]: {
    backgroundColor: COLORS.tint,
    textColor: COLORS.white,
  },
  [ButtonVariant.SECONDARY]: {
    backgroundColor: COLORS.gray200,
    textColor: COLORS.text,
  },
  [ButtonVariant.DANGER]: {
    backgroundColor: COLORS.danger,
    textColor: COLORS.background,
  },
};

const StyledPressable = styled(Pressable)`
  width: 100%;
`;

interface ContentWrapperProps {
  $backgroundColor: string;
  $disabled?: boolean;
}

const ContentWrapper = styled(View)<ContentWrapperProps>`
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  width: 100%;
  background-color: ${({ $backgroundColor }: ContentWrapperProps) =>
    $backgroundColor};
  opacity: ${({ $disabled }: ContentWrapperProps) => ($disabled ? 0.5 : 1)};
`;

interface ButtonTextProps {
  $color: string;
}

const ButtonText = styled(Text)<ButtonTextProps>`
  text-align: center;
  font-weight: ${FontWeight.SEMI_BOLD};
  font-size: ${FontSize.SIZE_16};
  color: ${({ $color }: ButtonTextProps) => $color};
`;

interface ButtonProps {
  onPress: (event?: GestureResponderEvent) => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  transparent?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    onPress,
    children,
    variant = ButtonVariant.PRIMARY,
    loading,
    disabled,
    transparent = false,
  } = props;
  const isPressable = !disabled && !loading;
  const handlePress = (event?: GestureResponderEvent) => {
    if (isPressable) {
      onPress(event);
    }
  };

  const variantStyle = VARIANT_STYLES[variant];

  return (
    <StyledPressable onPress={handlePress} disabled={!isPressable}>
      <ContentWrapper
        $backgroundColor={
          transparent ? COLORS.transparent : variantStyle.backgroundColor
        }
        $disabled={disabled}
      >
        {loading ? (
          <ActivityIndicator color={variantStyle.textColor} />
        ) : (
          <ButtonText $color={variantStyle.textColor}>{children}</ButtonText>
        )}
      </ContentWrapper>
    </StyledPressable>
  );
};

export default memo(Button);

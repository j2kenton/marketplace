import COLORS from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { memo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";

const DEFAULT_BACKGROUND = COLORS.warning;

interface ContainerProps {
  $backgroundColor: string;
}

const Container = styled(View)<ContainerProps>`
  padding: 16px;
  width: 100%;
  background-color: ${({ $backgroundColor }: ContainerProps) =>
    $backgroundColor};
`;

const ButtonPressable = styled(Pressable)`
  width: 100%;
`;

interface ContentProps {
  $dimmed?: boolean;
}

const Content = styled(View)<ContentProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  opacity: ${({ $dimmed }: ContentProps) => ($dimmed ? 0.5 : 1)};
`;

const Label = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: ${COLORS.black};
`;

interface ActionButtonProps {
  onPress: (event?: GestureResponderEvent) => void;
  label: string;
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
}

const ActionButton = (props: ActionButtonProps) => {
  const {
    onPress,
    label,
    iconName,
    loading,
    disabled,
    backgroundColor = DEFAULT_BACKGROUND,
  } = props;
  const isPressable = !disabled && !loading;

  const handlePress = (event?: GestureResponderEvent) => {
    if (isPressable) {
      onPress(event);
    }
  };

  return (
    <Container $backgroundColor={backgroundColor}>
      <ButtonPressable onPress={handlePress} disabled={!isPressable}>
        <Content $dimmed={disabled}>
          {loading ? (
            <ActivityIndicator color={COLORS.black} size="large" />
          ) : (
            <>
              <FontAwesome name={iconName} size={36} color={COLORS.black} />
              <Label>{label}</Label>
            </>
          )}
        </Content>
      </ButtonPressable>
    </Container>
  );
};

export default memo(ActionButton);

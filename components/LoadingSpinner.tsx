import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

const DEFAULT_SIZE = "large";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {
  size?: number | "small" | "large" | undefined;
}

const LoadingSpinner = (props: Props) => {
  const { size = DEFAULT_SIZE } = props;

  return (
    <Container>
      <ActivityIndicator size={size} />
    </Container>
  );
};

export default LoadingSpinner;

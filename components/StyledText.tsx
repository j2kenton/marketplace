import { memo } from "react";
import { Text, TextProps } from "./Themed";

const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
};

export { MonoText };
export default memo(MonoText);

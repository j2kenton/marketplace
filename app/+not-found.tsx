import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontSize } from "@/constants/Text";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: STRINGS.notFoundTitle }} />
      <View style={styles.container}>
        <Text style={styles.title}>{STRINGS.notFoundMessage}</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{STRINGS.notFoundLinkText}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: FontSize.SIZE_20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: FontSize.SIZE_14,
    color: COLORS.link,
  },
});

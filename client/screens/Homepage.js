import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage({ navigation }) {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>ini Homepage</Text>
        {/* <Content /> */}
        {/* <BottomNavbar /> */}
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

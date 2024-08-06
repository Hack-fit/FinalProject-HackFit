import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Homepage({ navigation }) {
  return (
    <>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="contain"
      >
        <View style={styles.container}>
          <Text>ini Homepage</Text>
          {/* <Content /> */}
          {/* <BottomNavbar /> */}
          {/* <StatusBar style="auto" /> */}
        </View>
      </ImageBackground>
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

import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function Explore() {
  return (
    <>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="contain"
      >
        <View style={styles.container}>
          <Text>ini halaman Explore</Text>
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
    // backgroundColor: "#F8EDED"
  },
});

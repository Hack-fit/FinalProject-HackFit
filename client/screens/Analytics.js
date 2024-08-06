import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function Analytics() {
  return (
    <>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="contain"
      >
        <View>
          <Text>ini halaman Analytics</Text>
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

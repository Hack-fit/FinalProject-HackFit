import { StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel"; // Pastikan path ini benar
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Homepage({ navigation }) {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.carousel}>
          <Carousel />
        </View>
        <Text style={styles.text}>ini Homepage</Text>
        {/* <Content /> */}
        {/* <BottomNavbar /> */}
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  carousel: {
    // backgroundColor: "red",
    marginVertical: 10,
    width: Dimensions.get("window").width * 0.9, // Mengatur lebar carousel
    height: Dimensions.get("window").width * 0.45, // Mengatur tinggi carousel
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5, // Menambahkan bayangan untuk efek elevasi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginTop: 20,
  },
});

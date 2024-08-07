import { View, Text, StyleSheet, ImageBackground } from "react-native";
import PaymentButton from "../components/PaymentButton";

export default function Explore() {
  return (
    <>
        <View style={styles.container}>
          <Text>ini halaman Explore</Text>
          <PaymentButton/>
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
    // backgroundColor: "#F8EDED"
  },
});

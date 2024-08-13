import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import BannerSubs from "../components/BannerSubs";

export default function Subscription() {
  const items = [
    { id: 1, image: require("../assets/koin.png"), amount: "+5", price: "Rp 10.000" },
    { id: 2, image: require("../assets/koin.png"), amount: "+15", price: "Rp 25.000" },
    { id: 3, image: require("../assets/koin.png"), amount: "+25", price: "Rp 35.000" },
  ];

  return (
    <View style={styles.container}>
        <BannerSubscription>
          <BannerSubs />
        </BannerSubscription>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.button}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  bannerAiContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.45,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,  // Lebih besar
    height: 60,  // Lebih besar
    marginRight: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
const BannerSubscription = ({ children }) => (
    <View style={styles.bannerAiContainer}>{children}</View>
  );
import React from "react";
import { Link } from "@react-navigation/native";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function UpperNavbar() {
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <Image
          source={require("../assets/logo.png")} // Ganti dengan path ke logo Anda
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60, // Atur tinggi navbar sesuai kebutuhan Anda
    backgroundColor: "#173B45", // Atur warna background navbar sesuai kebutuhan Anda
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Tambahkan bayangan untuk efek elevasi (opsional)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    position: "relative",
  },
  logo: {
    height: 80, // Atur tinggi logo sesuai kebutuhan Anda
  },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     top: "50%",
//     transform: [{ translateY: -12 }],
//   },
});

import React, {useContext} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Authcontext } from "../helper/context";

export default function UpperNavbar() {
  const navigation = useNavigation();
  const navigate = useNavigation();
  const {signedin,setsignin} = useContext(Authcontext)

  const handleHome = async () => {
    navigate.navigate("Home");
  };
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleHome}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#173B45",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    position: "relative",
  },
  logo: {
    height: 80,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

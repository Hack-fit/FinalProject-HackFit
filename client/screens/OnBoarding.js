import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

export default function OnBoarding() {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <ImageBackground
      source={require("../assets/image 3.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wherever You Are,</Text>
          <Text style={styles.title}>Health is Number One</Text>
          <Text style={styles.description}>
            There is no instant way to a healthy life
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 500
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
    textAlign: "center",
  },
  description: {
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:50
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    color: "gray",
  },
  signInLink: {
    fontSize: 14,
    color: "orange",
    fontWeight: "bold",
  },
});
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store'
import { Authcontext } from "../helper/context";
import api from "../helper/axios";
import { showMessage } from "react-native-flash-message";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setloading] = useState(false)
  const {signedin,setsignin} = useContext(Authcontext)

  const navigate = useNavigation();
  const handleLogin = async () => {
    try {
      console.log(username,password)
      setloading(true)
      const {data} = await api({ // use helper axios
        url:'/login',
        method:'POST',
        data:{
          username,
          password
        }
      })

      await SecureStore.setItemAsync("access-token",data?.access_token) //set access-token to securestore,blm di headers

      setloading(false)
      setsignin(true)

    } catch (error) {
      console.log(error)
      showMessage({
        message:"error",
        description: typeof(error.response.data.message) === typeof("String") ? error.response.data.message : "Error",
        type:"danger"
      })
      setloading(false)
    }

  };
  const handleRegist = () => {
    navigate.navigate("Register");
  };

  return (
    <>
      <SafeAreaView>
        <ImageBackground
          source={require("../assets/logo.png")}
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.1 }}
          resizeMode="contain"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {!loading ? 
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Loading...</Text>
            </TouchableOpacity>
              }
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>You don't have an account? </Text>
              <TouchableOpacity onPress={handleRegist}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "#F8EDED",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#173B45",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "gray",
  },
  signUpLink: {
    fontSize: 14,
    color: "#173B45",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

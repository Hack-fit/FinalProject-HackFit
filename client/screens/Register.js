import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import api from "../helper/axios";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from 'react-native-picker-select';


export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setloading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      const {data} = await api({
          url:'/register',
          method:'POST',
          data: {
            name,
            username,
            email,
            password,
            phoneNumber,
            age,
            gender
          }

        })
      // console.log(data)
      // Navigasi ke halaman lain setelah berhasil registrasi, misalnya ke halaman login
      setloading(false)
      showMessage({
        message:"successfully registered",
        type:"success"
      })
      navigation.navigate("Login");
      
    } catch (error) {
      showMessage({
        message:error.response.data.message,
        type:"danger"
      })
      setloading(false)
    }

  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="contain"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <RNPickerSelect
            style={styles.inputselect}
            value={gender}
            onValueChange={(value) => setGender(value)}
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female'},
            ]}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            autoCapitalize="none"
          />


        {loading ? <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Loading...</Text>
        </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>}

        <StatusBar style="auto" />
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity>
            <Link to={'/Login'} style={styles.signInLink}>Sign In</Link>
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputselect: {
    width: "100%",
    height: 50,
  },
  button: {
    backgroundColor: "#173B45",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInLink: {
    fontSize: 14,
    color: "#173B45",
    fontWeight: "bold",
  },
});

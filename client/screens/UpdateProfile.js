import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../helper/axios";
import * as SecureStore from 'expo-secure-store'

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [name,setname] = useState("")
  const [age, setage] = useState("")
  const [height, setheight] = useState("")
  const [weight, setweight] = useState("")
  const [getdata,setgetdata] = useState(0)
  const [loading,setloading] = useState(false)

  const getprofile = async () => {
    const {data} = await api({
      url:'/profile',
      method:'GET',
      headers:{
        'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
      }
    })

    setProfile(data)
    setname(data.name)
    setage(data.age)
    setheight(data.height)
    setweight(data.weight)
    setgetdata(1)
  }

  const handleSubmit = async () => {
    setloading(true)
    try {
      // console.log("Update profile submitted:");
      // console.log(`Name: ${name}`);
      // console.log(`Age: ${age}`);
      // console.log(`Height: ${height}`);
      // console.log(`Weight: ${weight}`);
  
        const {data} = await api({
          url:'/update-user',
          method:"PUT",
          data:{
            name:name,
            age:age,
            height:height,
            weight:weight
          },
          headers:{
            'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
          }
        })
        console.log(data)
        setloading(false)
        Alert.alert(data.message)
        navigation.navigate('Profile')
      
    } catch (error) {
      console.log(error)
      Alert.alert("something is wrong")
      setloading(false)
    }
    
  };

  useEffect(() => {
    getprofile()
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setage(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={height}
          onChangeText={(text) => setheight(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={(text) => setweight(text)}
          keyboardType="numeric"
        />
        {loading ? <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Loading...</Text>
        </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4F8",
  },
  headerContainer: {
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#FF8225",
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FF8225",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UpdateProfile;

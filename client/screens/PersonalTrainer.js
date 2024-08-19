import { useNavigation } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, ActivityIndicator } from "react-native";
import api from "../helper/axios";
import * as SecureStore from 'expo-secure-store'

export default function Personaltrainer({route}) {
  const {id} = route.params
  const [getdata,setgetdata] = useState({})
  const [getid,setgetid] = useState("")
  const [loading,setloading] = useState(false)

  const navigate = useNavigation();

  const getpt = async () => {
    try {
      setloading(true)
      setgetid(id)
      const {data} = await api({
        url:`/trainer-detail/${id}`,
        method:'GET',
        headers:{
          'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
        }
      })
      setgetdata(data)
      setloading(false)
      // console.log(data)
      
    } catch (error) {
      console.log(error)
      setloading(false)
    }

  }

  const handleBookNow = async () => {
    // navigate.navigate("UpdateProfile");
    await Linking.openURL('https://wa.me/+628998882482')
  };


  useEffect(()=>{
    getpt()
  },[id])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: getdata.profile_picture }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{getdata.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{getdata.phone_number}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.info}>{getdata.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.info}>{getdata.height}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.info}>{getdata.weight}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBookNow}>
        <Text style={styles.buttonText}>Book Now!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4F8", // Light background color
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
    // borderWidth: 3,
    // borderColor: "#FF8225", // Border color matching button
  },
  infoContainer: {
    backgroundColor: "#FFF", // White background for info container
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#FF8225", // Primary color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

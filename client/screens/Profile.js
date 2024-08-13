import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { Authcontext } from "../helper/context";
import { Ionicons } from "@expo/vector-icons";
import api from "../helper/axios";

const uridummy = "https://static.vecteezy.com/system/resources/previews/004/991/321/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"

export default function ProfileScreen() {
  const navigate = useNavigation();
  const [user,setprofile] = useState({})
  const [loading,setloading] = useState(false)
  const {signedin,setsignin} = useContext(Authcontext)
  const [get,set] = useState(0)

  // console.log(token)
  const profileuser = async () => {
    setloading(true)
    const {data} = await api({
      url:'/profile',
      method:'GET',
      headers:{
        'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
      }
    })

    setprofile(data)
    // console.log(data)
    setloading(false)
    set(1)
  }

  const handlelogout = async () => {
    await SecureStore.deleteItemAsync('access-token')
    .then(()=>setsignin(false)).finally(()=>setprofile({}))
  }

  const handleEditProfile = () => {
    navigate.navigate("UpdateProfile");
  };

  useFocusEffect(
    React.useCallback(() => {
      profileuser()
    }, [])
  );

  if(loading){
    return(
      <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      <TouchableOpacity onPress={handlelogout} style={styles.buttonLogOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      </View>
      
      
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {user.profilePicture ? <Image source={{ uri: user.profilePicture }} style={styles.avatar} /> : <Image source={{ uri: uridummy }} style={styles.avatar} />}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="person-circle" size={20} color="#555" />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="at" size={20} color="#555" />
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#555" />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#555" />
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#555" />
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.info}>{user.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="resize" size={20} color="#555" />
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.info}>{user.height}cm</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="barbell" size={20} color="#555" />
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.info}>{user.weight}kg</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="logo-bitcoin" size={20} color="#555" />
          <Text style={styles.label}>Token:</Text>
          {user.token ? <Text style={styles.info}>{user.token}</Text> : <Text style={styles.info}>No token</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.buttonEdit} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlelogout} style={styles.buttonLogOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4F8", // Ubah warna latar belakang
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
    // borderWidth: 3, // Tambahkan border
    // borderColor: "#FF8225", // Warna border
  },
  infoContainer: {
    backgroundColor: "#FFF", // Warna latar belakang kontainer informasi
    borderRadius: 15, // Penambahan radius untuk sudut yang lebih lembut
    padding: 20, // Penambahan padding untuk tata letak yang lebih baik
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center", // Align items to center
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 10, // Penambahan margin antara ikon dan label
    flex: 1, // Membuat label menempati ruang yang tersedia
  },
  info: {
    fontSize: 16,
    color: "#333",
    flex: 2, // Membuat info menempati ruang yang lebih banyak
  },
  buttonEdit: {
    backgroundColor: "#173B45",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonLogOut: {
    backgroundColor: "#B43F3F",
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
    color: "#fff", // Ubah warna teks menjadi putih
    fontSize: 16,
    fontWeight: "bold",
  },
});

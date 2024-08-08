import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigate = useNavigation();
  const user = {
    name: "Bayu",
    username: "Bayu_ganteng",
    email: "john.doe@example.com",
    phone: "+1234567890",
    age: "28",
    height: "175 cm",
    weight: "70 kg",
    profilePicture:
      "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  };

  const handleEditProfile = () => {
    navigate.navigate("UpdateProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
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
          <Text style={styles.info}>{user.height}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="barbell" size={20} color="#555" />
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.info}>{user.weight}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonEdit} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogOut}>
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
    backgroundColor: "#FF8225",
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

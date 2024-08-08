import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Personaltrainer() {
  const navigate = useNavigation();
  const user = {
    name: "Bayu",
    phone: "+1234567890",
    age: "28",
    height: "175 cm",
    weight: "70 kg",
    profilePicture: "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  };

  const handleBookNow = () => {
    navigate.navigate("UpdateProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.info}>{user.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.info}>{user.height}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.info}>{user.weight}</Text>
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

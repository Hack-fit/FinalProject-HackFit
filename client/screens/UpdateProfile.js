import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleSubmit = () => {
    console.log("Update profile submitted:");
    console.log(`Name: ${profile.name}`);
    console.log(`Age: ${profile.age}`);
    console.log(`Height: ${profile.height}`);
    console.log(`Weight: ${profile.weight}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={profile.age}
          onChangeText={(text) => setProfile({ ...profile, age: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={profile.height}
          onChangeText={(text) => setProfile({ ...profile, height: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={profile.weight}
          onChangeText={(text) => setProfile({ ...profile, weight: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
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
    backgroundColor: "#173B45",
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

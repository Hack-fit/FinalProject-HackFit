import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const ProfileCard = ({ name, imageUrl }) => {
  const navigate = useNavigation();

  const handlePT = () => {
    navigate.navigate("PersonalTrainer");
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageFrame}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePT}>
          <Text style={styles.buttonText}>Check Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
  },
  imageFrame: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF8225",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileCard;

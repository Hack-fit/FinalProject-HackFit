import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const CardCommunity = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
        />
        <View style={styles.headerTextContainer}>
          <View style={styles.headerTextRow}>
            <Text style={styles.name}>Bayu</Text>
            <Text style={styles.username}>@TestingBayu</Text>
            <Text style={styles.time}>·12.40</Text>
          </View>
        </View>
      </View>
      <Text style={styles.text}>Gym dulu ges biar kuat</Text>
      <Image
        style={styles.imagePost}
        source={{
          uri: "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="comment-o" size={24} color="#808080" />
          <Text style={styles.footerText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Entypo name="heart" size={24} color={liked ? "red" : "#808080"} />
          <Text style={styles.footerText}>5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  name: {
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  username: {
    color: "#555",
    marginRight: 5,
  },
  time: {
    color: "#aaa",
  },
  text: {
    marginVertical: 10,
    color: "black",
  },
  imagePost: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "black",
    marginLeft: 5,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default CardCommunity;

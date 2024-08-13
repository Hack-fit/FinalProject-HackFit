import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BannerAi from "../components/BannerAi";
import { useNavigation } from "@react-navigation/native";

export default function Analytics() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fitAIButton}
          onPress={() => navigation.navigate("Subscription")}
        >
          <Text style={styles.buttonText}>Subscription</Text>
        </TouchableOpacity>
      </View>

import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CardCommunity from "../components/CardCommunity";

export default function Analytics() {

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>HackFit Community</Text>
      <FlatList
        data={[{ id: "1" }]} // Replace with actual data
        keyExtractor={(item) => item.id}
        renderItem={() => <CardCommunity />}
        contentContainerStyle={styles.flatListContent} // Adjust padding or margins if needed
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bannerAiContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.45,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  todoListSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  todoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  todoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#173B45",
  },
  noTodoText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  fitAIButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#173B45",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",

    backgroundColor: "white", // Change background color to white
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark grey color for better readability
    textAlign: "center",
    marginVertical: 16, // Space above and below the text
  },
  flatListContent: {
    paddingBottom: 20, // Adjust as needed
  },
});

const BannerAiContainer = ({ children }) => (
  <View style={styles.bannerAiContainer}>{children}</View>
);

const ToDoListSection = ({ children }) => (
  <View style={styles.todoListSection}>{children}</View>
);

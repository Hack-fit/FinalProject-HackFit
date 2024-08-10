import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import PaymentButton from "../components/PaymentButton";
import BannerAi from "../components/BannerAi";
import CardToDoList from "../components/CardToDoList";
import CardToDo from "../components/CardTodo";
import { useNavigation } from "@react-navigation/native";

export default function Explore() {
  const navigate = useNavigation();
  const todoList = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BannerAiContainer>
          <BannerAi />
        </BannerAiContainer>

        <ToDoListSection>
          <Text style={styles.sectionTitle}>To Do List:</Text>
          <CardToDoList todoList={todoList} />
        </ToDoListSection>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Make Your Training and Meal Plan With Fit-AI!
        </Text>
        <TouchableOpacity
          style={styles.fitAIButton}
          onPress={() => navigate.navigate("Fit Ai")}
        >
          <Text style={styles.buttonText}>Fit-AI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1, // Menggunakan flex untuk mengisi ruang yang tersedia
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  bannerAiContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.45,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  todoListSection: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  footer: {
    width: "100%",
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
  },
});

const BannerAiContainer = ({ children }) => (
  <View style={styles.bannerAiContainer}>{children}</View>
);

const ToDoListSection = ({ children }) => (
  <View style={styles.todoListSection}>{children}</View>
);

const FitAIButton = ({ children }) => (
  <TouchableOpacity
    style={styles.fitAIButton}
    onPress={() => navigate.navigate("Fit Ai")}
  >
    {children}
  </TouchableOpacity>
);

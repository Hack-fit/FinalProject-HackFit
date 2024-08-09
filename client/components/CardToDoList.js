import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function CardToDoList({ todoList }) {
  const renderTodoItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.taskText}>{item.day}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {todoList.length > 0 ? (
        <FlatList
          data={todoList}
          renderItem={renderTodoItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Membuat FlatList bisa digeser secara horizontal
          showsHorizontalScrollIndicator={false} // Menghilangkan scroll indicator
          contentContainerStyle={styles.todoList}
        />
      ) : (
        <Text style={styles.noTodoText}>You don't have any To Do List here</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:"#173B45",
    borderRadius: 10,
    height: 100
  },
  todoList: {
    alignItems: "center", // Menyelaraskan item ke tengah secara vertikal
  },
  card: {
    width: 150, // Ukuran card yang proporsional
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginRight: 15, // Memberi spasi antar card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  repsText: {
    fontSize: 12,
    color: "#666",
  },
  noTodoText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    // justifyContent: "center",
    padding: 25
  },
});

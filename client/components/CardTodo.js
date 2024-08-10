// import React from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";

// export default function CardToDoList({ todoList }) {
//   const renderTodoItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.taskText}>{item.task}</Text>
//       <Text style={styles.repsText}>{item.reps} reps</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {todoList.length > 0 ? (
//         <FlatList
//           data={todoList}
//           renderItem={renderTodoItem}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.todoList}
//         />
//       ) : (
//         <Text style={styles.noTodoText}>You don't have any To Do List here</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   todoList: {
//     alignItems: "center",
//   },
//   card: {
//     width: 150, // Lebar card tetap
//     height: 100, // Tinggi card tetap
//     padding: 15,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     marginRight: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//     justifyContent: "center", // Memusatkan konten secara vertikal
//   },
//   taskText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 5,
//     textAlign: "center", // Memusatkan teks secara horizontal
//   },
//   repsText: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center", // Memusatkan teks secara horizontal
//   },
//   noTodoText: {
//     fontSize: 16,
//     color: "#888",
//     textAlign: "center",
//   },
// });

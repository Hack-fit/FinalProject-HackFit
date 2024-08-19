import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BannerAi from "../components/BannerAi";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../helper/axios";
import * as SecureStore from 'expo-secure-store'
import { showMessage } from "react-native-flash-message";

// const todoLists = [
//     {
//       name: "Lower Strength",
//       todo: [
//         {
//           "Hari": "Senin",
//           "Jenis_Latihan": "Kardio dan Daya Tahan",
//           "Rincian_Latihan": [
//             {
//               "Jenis_Latihan": "Treadmill",
//               "rep": 30,
//               "set": 1,
//               "tipe": "",
//               "link": "https://www.youtube.com/embed/fMKBfvsltAQ?si=wn7as4btpBubMfkR"
//             },
//             {
//               "Jenis_Latihan": "Plank",
//               "rep": 15,
//               "set": 3,
//               "tipe": "plank"
//             }
//           ]
//         },
//         {
//           "Hari": "Selasa",
//           "Jenis_Latihan": "Kekuatan Atas Tubuh",
//           "Rincian_Latihan": [
//             {
//               "Jenis_Latihan": "Bench Press",
//               "rep": 10,
//               "set": 4,
//               "tipe": "bench press"
//             },
//             {
//               "Jenis_Latihan": "Pull-Up",
//               "rep": 8,
//               "set": 3,
//               "tipe": "pull up"
//             }
//           ]
//         },
//         {
//           "Hari": "Kamis",
//           "Jenis_Latihan": "Kardio dan Daya Tahan",
//           "Rincian_Latihan": [
//             {
//               "Jenis_Latihan": "Treadmill",
//               "rep": 30,
//               "set": 1,
//               "tipe": ""
//             },
//             {
//               "Jenis_Latihan": "Lunges",
//               "rep": 12,
//               "set": 3,
//               "tipe": "Lunges"
//             }
//           ]
//         },
//         {
//           "Hari": "Jumat",
//           "Jenis_Latihan": "Kekuatan Bawah Tubuh",
//           "Rincian_Latihan": [
//             {
//               "Jenis_Latihan": "Cable Machine",
//               "rep": 10,
//               "set": 4,
//               "tipe": ""
//             },
//             {
//               "Jenis_Latihan": "Squat",
//               "rep": 10,
//               "set": 3,
//               "tipe": "squat"
//             }
//           ]
//         }
//       ]
//     },
//   ]
export default function Explore() {
  const navigation = useNavigation();
  const [loading,setloading] = React.useState(false)
  const [gettodoLists, setTodoLists] = React.useState([]);

  const fetch_data = async () => {
    try {
      setloading(true)
      const { data } = await api({
        url: "/get-todo",
        method: "GET",
        headers:{
          'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
        }
      });
      // console.log(data);
      setTodoLists(data)
      setloading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetch_data()
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      console.log("delete")
      setloading(true)
      const data = await api({
        url: `/delete-todo/${id}`,
        method: "DELETE",
        headers:{
          'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
        }
      });
      fetch_data()
      setloading(false)
      showMessage({
        message: "Success",
        description: "List has been deleted successfully.",
        type: "success"
      })
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Failed to delete the list.",
        type: "danger",
      })
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BannerAiContainer>
          <BannerAi />
        </BannerAiContainer>

        {gettodoLists.length > 0 ? (
          <ToDoListSection>
            <Text style={styles.sectionTitle}>To-Do Lists:</Text>
            {gettodoLists[0].todo.map((list, index) => (
            <View key={index} style={styles.todoContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DailyTask", { todoList: list.todo,id:list._id })
                }
                style={styles.todoContent}
              >
                <Text style={styles.todoName}>{list.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(list._id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          </ToDoListSection>
        ) : (
          <Text style={styles.noTodoText}>No To-Do List Available</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Make Your Training and Meal Plan With Fit-AI!
        </Text>
        <TouchableOpacity
          style={styles.fitAIButton}
          onPress={() => navigation.navigate("FitAi")}
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
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  todoContent: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5, // Make the button smaller
    borderRadius: 5,
    marginLeft: "auto", // Add some space between the text and the button
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12, // Make the text smaller
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
  },
});

const BannerAiContainer = ({ children }) => (
  <View style={styles.bannerAiContainer}>{children}</View>
);

const ToDoListSection = ({ children }) => (
  <View style={styles.todoListSection}>{children}</View>
);

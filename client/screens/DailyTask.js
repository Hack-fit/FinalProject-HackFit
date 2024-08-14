import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import VideoScreen from "../components/Video";
import api from "../helper/axios";
import { showMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store'

export default function DailyTask({ route }) {
  const { todoList,id } = route.params;
  const [loading, setLoading] = React.useState(false);
  // console.log(route.params)
  // console.log(todoList[0].Rincian_Latihan, ",,,,,,,,,,");

  const handleshare = async () => {
    console.log("share button clicked");
    setLoading(true);
    try {
      await api({
        url:`/share-todo/${id}`,
        method:'POST',
        headers:{
          'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
        }
      })
      
      showMessage({
        message: "Success",
        description: "Task has been shared successfully.",
        type: "success"
      })
      setLoading(false)
    } 
    catch (error) {
      console.log(error)
      showMessage({
        message: "Server error/something went wrong",
        type: "danger",
      })
    }
  }

  return (
    <>
    <ScrollView style={styles.container}>
      {todoList.map((item, index) => (
        <View key={index} style={styles.dayContainer}>
          <View style={styles.headerContainer}>
            <MaterialIcons name="today" size={24} color="#4CAF50" />
            <Text style={styles.dayText}>{item.day}</Text> 
          </View>
          <Text style={styles.typeText}>{item.Jenis_Latihan}</Text> 
          {item.Rincian_Latihan.map((detail, idx) => (
            <View key={idx} style={styles.detailContainer}>
              <View style={styles.exerciseInfo}>
                <MaterialIcons name="fitness-center" size={20} color="#FF9800" />
                <Text style={styles.detailText}>
                  {`${detail.Jenis_Latihan}: ${detail.rep} reps, ${detail.set} sets`} 
                </Text>
              </View>
              {detail.tipe === "" ? (
                <Text style={styles.noVideoText}>-</Text>
              ) : (
                <TouchableOpacity style={styles.videoButton}>
                  <Text style={styles.videoButtonText}>Watch Video</Text>
                </TouchableOpacity>
              )}
              <VideoScreen videoUrl={detail.link}/>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
    <View style={styles.container}>
      {loading ? <TouchableOpacity style={styles.createPlanButton}>
       <Text style={styles.buttonText}>Loading...</Text>
    </TouchableOpacity> : <TouchableOpacity style={styles.createPlanButton} onPress={handleshare}>
       <Text style={styles.buttonText}>Share Task</Text>
    </TouchableOpacity>}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1/6,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  createPlanButton: {
    backgroundColor: "#173B45",
    padding: 4,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
},
  dayContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  typeText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
    color: "#4CAF50",
  },
  detailContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
}, 
  detailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  noVideoText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  videoButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start', // Menyesuaikan lebar tombol sesuai dengan teks
  },
  videoButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

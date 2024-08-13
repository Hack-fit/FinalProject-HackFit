import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import VideoScreen from "../components/Video";

export default function DailyTask({ route }) {
  const { todoList } = route.params;
  // console.log(todoList[0].Rincian_Latihan, ",,,,,,,,,,");
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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

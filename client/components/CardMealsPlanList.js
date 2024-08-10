import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function CardMealsPlanList({ mealsPlan }) {
  const renderMealItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.mealTitle}>{item.meal}</Text>
      <Text style={styles.mealDetails}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {mealsPlan.length > 0 ? (
        <FlatList
          data={mealsPlan}
          renderItem={renderMealItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Membuat FlatList bisa digeser secara horizontal
          showsHorizontalScrollIndicator={false} // Menghilangkan scroll indicator
          contentContainerStyle={styles.mealsList}
        />
      ) : (
        <Text style={styles.noMealsText}>No Meals Plan available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#173B45",
    borderRadius: 10,
    height: 120, // Sesuaikan dengan tinggi card yang lebih besar jika diperlukan
  },
  mealsList: {
    alignItems: "center", // Menyelaraskan item ke tengah secara vertikal
  },
  card: {
    width: 150, // Ukuran card yang proporsional
    height: 100, // Menentukan tinggi card tetap
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
    justifyContent: "center", // Memusatkan konten secara vertikal
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center", // Memusatkan teks secara horizontal
  },
  mealDetails: {
    fontSize: 12,
    color: "#666",
    textAlign: "center", // Memusatkan teks secara horizontal
  },
  noMealsText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 25,
  },
});

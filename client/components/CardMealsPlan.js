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
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
    padding: 20,
  },
  mealsList: {
    alignItems: "center",
  },
  card: {
    width: 150, // Lebar card tetap
    height: 100, // Tinggi card tetap
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginRight: 15,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center", // Memusatkan teks secara horizontal
  },
  mealDetails: {
    fontSize: 14,
    color: "#666",
    textAlign: "center", // Memusatkan teks secara horizontal
  },
  noMealsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

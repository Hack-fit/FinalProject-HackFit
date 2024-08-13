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

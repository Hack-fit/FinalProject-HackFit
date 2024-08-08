import { StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CardList from "../components/CardList";
import { ScrollView } from "react-native";

const Homepage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.carouselContainer}>
        <Carousel />
      </View>
      <View style={styles.trainersSection}>
        <Text style={styles.title}>Personal Trainers:</Text>
        <CardList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  trainersSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  carouselContainer: {
    marginVertical: 20,
    marginHorizontal:20,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.45,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Homepage;

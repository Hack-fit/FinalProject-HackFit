import { StyleSheet, Text, View } from "react-native";
import BottomNavbar from "../components/BottomNavbar";

export default function Homepage({navigation}) {
  return (
    <>
      <View style={styles.container}>
        <Text>ini Homepage</Text>
        {/* <Content /> */}
        {/* <BottomNavbar /> */}
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
  });
  

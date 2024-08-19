import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PaymentButton() {
  return (
    <>

      <TouchableOpacity style={styles.paymentButton}>
        <Text>Book now</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  paymentButton: {
    paddingHorizontal: 20,
    backgroundColor: "#FF8225",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
});

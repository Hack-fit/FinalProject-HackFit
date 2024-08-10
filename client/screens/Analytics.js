import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Analytics() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation();

  const getTransactionToken = async () => {
    setLoading(true);
    const transactionDetails = {
      transaction_details: {
        order_id: `order-${Math.floor(Math.random() * 1000000)}`,
        gross_amount: 10000, // Contoh jumlah pembayaran
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "Budi",
        last_name: "Utomo",
        email: "budi.utomo@example.com",
        phone: "081234567890",
      },
    };
    // console.log(transactionDetails,`-------------222`);

    try {
      const response = await axios.post(
        `https://5f1d-2404-c0-5c40-00-a6-5f56.ngrok-free.app/midtrans`,
        transactionDetails
      );
      console.log(response.data.payment_url, `rerererererererere`);

      setToken(response.data.payment_url);
      setShowWebView(true);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNavigationChange = (state) => {
    // const transactionStatus = url.searchParams.get("transaction_status");
    // console.log(transactionStatus, `----------------`);
    // if (state.url.includes(`http://example.com/`)) {
    if (!state.loading && state.url.includes("example.com")) {
      // Cek apakah halaman sudah tidak dalam status loading
      const url = new URL(state.url);
      const transactionStatus = url.searchParams.get("transaction_status");

      if (transactionStatus === "settlement") {
        alert("Payment Successful!");
        navigation.replace("Homepage")
      } else if (
        transactionStatus === "deny" ||
        transactionStatus === "cancel" ||
        transactionStatus === "expire"
      ) {
        alert("Payment Failed.");
        navigation.navigate("Homepage");
      }
    }
  };

  // console.log(token);

  useEffect(() => {
    if (showWebView && token) {
      setLoading(false);
    }
  }, [showWebView, token]);
  // ("https://app.sandbox.midtrans.com/snap/v4/redirection/");
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!showWebView && (
        <View style={styles.container}>
          <Button title="Start Payment" onPress={getTransactionToken} />
        </View>
      )}
      {showWebView && token && (
        <WebView
          source={{ uri: token }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange} // Add navigation state change handler
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});

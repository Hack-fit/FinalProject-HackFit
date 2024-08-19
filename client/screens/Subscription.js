import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import BannerSubs from "../components/BannerSubs";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview"; // Pastikan WebView diimport
import api from "../helper/axios";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";

export default function Subscription() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation();

  const items = [
    {
      id: 1,
      image: require("../assets/koin.png"),
      amount: "+5",
      price: "Rp 10.000",
      name: "hemat",
    },
    {
      id: 2,
      image: require("../assets/koin.png"),
      amount: "+15",
      price: "Rp 25.000",
      name: "sedang",
    },
    {
      id: 3,
      image: require("../assets/koin.png"),
      amount: "+25",
      price: "Rp 35.000",
      name: "premium",
    },
  ];

  const getTransactionToken = async (packageId) => {
    setLoading(true);
    

    const transactionDetails = {
      paket: packageId,
    };

    try {

      const response = await api({
        url: `/midtrans`,
        method: "POST",
        data: transactionDetails,
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access-token"
          )}`,
        },
      });

      setToken(response.data.payment_url);
      setShowWebView(true);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationChange = (state) => {
    console.log(state);
    
    if (!state.loading && state.url.includes("example.com")) {
      const url = new URL(state.url);
      console.log(url,url.searchParams)
      const transactionStatus = url.searchParams.get("transaction_status");
      if (transactionStatus === "settlement") {
        showMessage({
          message: "Payment Successful!",
          description: "Your payment was successful.",
          type: "success",
          onHide: () => navigation.goBack()
        })
      } else if (transactionStatus === "pending") {
        // Alert.alert(
        //   "Payment Failed",
        //   "Your payment has failed. Please try again.",
        //   [{ text: "OK", onPress: () => navigation.goBack() }]
        // );
        showMessage({
          message: "Payment Failed",
          description: "Your payment has failed. Please try again.",
          type: "danger",
          onHide: () => navigation.goBack()
        })
      }
    }

    
  };

  useEffect(() => {
    if (showWebView && token) {
      console.log("Loading URL:", token, showWebView);
      setLoading(false);
    }
  }, [showWebView, token]);

  return (
    <View style={styles.container}>
      {!showWebView && (<>
      <BannerSubscription>
        <BannerSubs />
      </BannerSubscription>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.button}
          onPress={() => getTransactionToken(item.name)}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      ))}
      </>)}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {showWebView && token ? (
        <View style={{flex:1, width:"100%"}}> 
          <WebView
            source={{ uri: token }}
            style={{ flex:1 }}
            onNavigationStateChange={handleNavigationChange}
            startInLoadingState={true} // Menampilkan loader saat menunggu respons
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
              Alert.alert(
                "Error",
                "WebView failed to load. Please try again later."
              );
            }}
          />
        </View>

      ) : (
        <Text style={styles.errorMessage}>
          Invalid or missing token. Unable to load payment page.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  bannerAiContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.45,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
const BannerSubscription = ({ children }) => (
  <View style={styles.bannerAiContainer}>{children}</View>
);

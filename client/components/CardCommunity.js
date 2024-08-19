import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../helper/axios";
import { showMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store'


const uridummy = "https://static.vecteezy.com/system/resources/previews/004/991/321/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"


const CardCommunity = ({data}) => {
  // console.log(data.trainingid)
  const [liked, setLiked] = useState(false);
  const navigator = useNavigation();

  const handleLike = async () => {
    try {
      await api({
        url: `/like-post/${data._id}`,
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${await SecureStore.getItemAsync('access-token')}`
        }
      })
      showMessage({
        message: "Success",
        description: "Post has been liked successfully.",
        type: "success"
      })      
    } catch (error) {
      console.log(error.response.data)
      showMessage({
        message: error.response.data,
        type:'danger'
      })
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={{uri: data.user[0].imageurl ? data.user[0].imageurl : uridummy}}/>
        <View style={styles.headerTextContainer}>
          <View style={styles.headerTextRow}>
            <Text style={styles.name}>
              {data?.user[0].name ? data.user[0].name : "Anonymous"}
              </Text>
            <Text style={styles.username}>
            @{data?.user[0].username ? data.user[0].username : "Anonymous"}
              </Text>
            {/* <Text style={styles.time}>·12.40</Text> */}
          </View>
        </View>
      </View>
      <Text style={styles.text}>Shared a Training Task: <Text style={{color:'green'}}>{data?.trainingname}</Text></Text>
      
      {/* New button in the center */}
      <View style={styles.centerButtonContainer}>
        <TouchableOpacity 
          style={styles.centerButton} 
          onPress={()=>navigator.navigate('detail',{trainid:data?.trainingid,likes:data.likes,postid:data?._id,train:data?.training,username:data?.user[0]?.username,name:data?.user[0]?.name})}
        >
          <Text style={styles.centerButtonText}>More Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Entypo name="heart" size={24} color={"red"} />
          <Text style={styles.footerText}>{data.likes.length === 0 ? 0 : data.likes.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  name: {
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  username: {
    color: "#555",
    marginRight: 5,
  },
  time: {
    color: "#aaa",
  },
  text: {
    marginVertical: 10,
    color: "black",
  },
  centerButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  centerButton: {
    backgroundColor: '#007BFF',
    padding: 15, // Increased padding for a larger button
    borderRadius: 5,
    width: '80%', // Adjust the width as needed
    alignItems: 'center',
  },
  centerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16, // Increased font size for better readability
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "black",
    marginLeft: 5,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default CardCommunity;

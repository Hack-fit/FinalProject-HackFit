import React,{useEffect,useState} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileCard from "./Card";
import api from "../helper/axios";
import * as SecureStore from 'expo-secure-store'
// import { View } from "react-native-reanimated/lib/typescript/Animated";

const dummyData = [
  {
    id: "1",
    name: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1599577526149-97ab942dd343?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx3b3JraW5nJTIwb3V0fGVufDB8fDB8fHww",
  },
  {
    id: "2",
    name: "Jane Smith",
    imageUrl: "https://images.unsplash.com/photo-1637193165655-6689906cfde8?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHx3b3JraW5nJTIwb3V0fGVufDB8fDB8fHww",
  },
  {
    id: "3",
    name: "Alice Johnson",
    imageUrl: "https://images.unsplash.com/photo-1589860518300-9eac95f784d9?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "4",
    name: "Bob Brown",
    imageUrl: "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "5",
    name: "Charlie Davis",
    imageUrl: "https://images.unsplash.com/photo-1585152968992-851c3a8e1678?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "6",
    name: "Diana Evans",
    imageUrl: "https://images.unsplash.com/photo-1591804671002-b24e17464f9b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "7",
    name: "Eve Foster",
    imageUrl: "https://images.unsplash.com/photo-1639653818737-7e884dc84954?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "8",
    name: "Frank Green",
    imageUrl: "https://images.unsplash.com/photo-1548932813-88dcf75599c6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "9",
    name: "Grace Harris",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "10",
    name: "Henry Irwin",
    imageUrl: "https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvcmtpbmclMjBvdXR8ZW58MHx8MHx8fDA%3D",
  },
];

const CardList = () => {
  const [gettrainers,settrainer] = useState([])
  const [loading,setloading] = useState(false)

  const trainers = async () => {
    setloading(true)
   const {data} =  await api({
      url:'trainers',
      method:'GET',
      headers:{
        'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
      }
    })

    settrainer(data)
    setloading(false)
  }
  
  useEffect(()=>{
    trainers()
  },[])

  if (loading) {
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }


  return (
    <View style={styles.containerList}>
      {gettrainers.map((profile) => (
        <ProfileCard
          key={profile._id}
          name={profile.name}
          ptid={profile._id}
          imageUrl={profile.profile_picture}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    alignItems: "center",
  },
});

export default CardList;

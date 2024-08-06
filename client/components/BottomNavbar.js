import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Pilih ikon yang Anda suka dari library ini

import Homepage from "../screens/Homepage";
import Explore from "../screens/Explore";
import Analytics from "../screens/Analytics";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explore") {
            iconName = "rocket"; 
          } else if (route.name === "Analytics") {
            iconName = "stats-chart";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 }, 
      })}
    >
      <Tab.Screen name="Home" component={Homepage} options={{ headerShown: true }} />
      <Tab.Screen name="Explore" component={Explore} options={{ headerShown: true }} />
      <Tab.Screen name="Analytics" component={Analytics} options={{ headerShown: true }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: true }}/>
    </Tab.Navigator>
  );
}


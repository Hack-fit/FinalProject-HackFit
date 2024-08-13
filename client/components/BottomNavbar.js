import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Pilih ikon yang Anda suka dari library ini

import Homepage from "../screens/Homepage";
import Explore from "../screens/Explore";
import Analytics from "../screens/Analytics";
import ProfileStack from "./ProfileStack";
import UpperNavbar from "./UpperNavbar";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import AnalyticsStack from "./AnalyticStack";

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
        // tabBarBa:"#173B45",
        tabBarActiveTintColor: "#FF8225",
        tabBarInactiveTintColor: "#173B45",
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

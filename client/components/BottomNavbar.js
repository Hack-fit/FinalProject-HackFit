import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Choose icons from this library

import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import AnalyticsStack from "./CommunitycStack";
import ProfileStack from "./ProfileStack";
import Subscription from "../screens/Subscription";
import UpperNavbar from "./UpperNavbar";

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
            iconName = "people-outline";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Subscription") {
            iconName = "card-outline"; // Icon for Subscription
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
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
          name="Subscription" // Add the Subscription screen
          component={Subscription}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
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

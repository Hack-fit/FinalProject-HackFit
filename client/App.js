import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import OnBoarding from "./screens/OnBoarding";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Homepage from "./screens/Homepage";
import MyTabs from "./components/BottomNavbar";
import UpdateProfileForm from "./screens/UpdateProfile";
import UpdateProfile from "./screens/UpdateProfile";

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        {/* <MyTabs /> */}
        <Stack.Navigator>
        {/* <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{ headerShown: false }}
            /> */}
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Homepage"
            component={MyTabs}
            options={{ headerShown: false }}
            
            />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

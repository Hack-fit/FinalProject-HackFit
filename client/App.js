import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import OnBoarding from "./screens/OnBoarding";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MyTabs from "./components/BottomNavbar";
import React, { useState, useEffect } from 'react'
import { SafeAreaContext, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Authcontext } from "./helper/context";
import * as SecureStore from 'expo-secure-store'

const Stack = createNativeStackNavigator();



export default function App() {
  const [signedin,setsignin] = useState(false)// setting untuk login atau belum disini, ganti false jadi true
  const [loading,setloading] = useState(true)

  useEffect(() => {
    async function settoken() {
      const res = await SecureStore.getItemAsync('access-token')
      if (res) {
        console.log(res)
        const headers = {'Authorization':`Bearer ${access-token}`};
        setloading(false)

      }
      else{
        setloading(false)
        return null
      }
      
    }
  
    settoken()
  }, [])

  if (loading) {
    return(<>
    </>)
  }



  return (
    <>
        <NavigationContainer>
          <Authcontext.Provider value={{signedin,setsignin}}>
            {!signedin ? (
              <Stack.Navigator>
              <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
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

            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name="Homepage"
                  component={MyTabs}
                  options={{ headerShown: false }}
                />
                </Stack.Navigator>
            )
          }

          </ Authcontext.Provider >
        </NavigationContainer>
    </>
  );
}

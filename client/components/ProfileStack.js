import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile";
import UpdateProfile from "../screens/UpdateProfile";

const Stack = createNativeStackNavigator();

export default function ProfileStack(){
    return(
        <>
        <Stack.Navigator>
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{ headerShown: false }}
            
            />
        </Stack.Navigator>
        </>
    )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile";
import UpdateProfile from "../screens/UpdateProfile";
import UpperNavbar from "./UpperNavbar";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: true, headerTitleAlign:"center", headerTitle:"Update Profile" }}
        />
      </Stack.Navigator>
    </>
  );
}

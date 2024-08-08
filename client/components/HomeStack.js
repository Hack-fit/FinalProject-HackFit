import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile";
import UpdateProfile from "../screens/UpdateProfile";
import Homepage from "../screens/Homepage";
import Personaltrainer from "../screens/PersonalTrainer";
import UpperNavbar from "./UpperNavbar";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
        />
        <Stack.Screen
          name="PersonalTrainer"
          component={Personaltrainer}
          options={{ headerShown: true, headerTitleAlign:"center", headerTitle:"Personal Trainer" }}
        />
      </Stack.Navigator>
    </>
  );
}

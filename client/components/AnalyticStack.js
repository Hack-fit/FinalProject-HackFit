import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "../screens/Homepage";
import Personaltrainer from "../screens/PersonalTrainer";
import UpperNavbar from "./UpperNavbar";
import Analytics from "../screens/Analytics";
import Subscription from "../screens/Subscription";

const Stack = createNativeStackNavigator();

export default function AnalyticsStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Analytics"
          component={Analytics}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{ headerShown: true, headerTitleAlign:"center", headerTitle:"Subscription" }}
        />
      </Stack.Navigator>
    </>
  );
}

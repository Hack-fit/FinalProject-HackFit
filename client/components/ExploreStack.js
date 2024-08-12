import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DailyTask from "../screens/DailyTask";
import Explore from "../screens/Explore";
import UpperNavbar from "./UpperNavbar";
import FitAi from "../screens/FitAi";

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
        />
        <Stack.Screen
          name="DailyTask"
          component={DailyTask}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: "Daily Task"
          }}
        />
        <Stack.Screen
          name="FitAi"
          component={FitAi}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: "Fit Ai"
          }}
        />
      </Stack.Navigator>
    </>
  );
}

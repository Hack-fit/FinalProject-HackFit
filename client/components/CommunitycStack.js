import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpperNavbar from "./UpperNavbar";
import Subscription from "../screens/Subscription";
import CardCommunity from "./CardCommunity";
import Community from "../screens/Community";
import DetailPost from "../screens/Detailpost";

const Stack = createNativeStackNavigator();

export default function CommunitycStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
        />
        <Stack.Screen
          name='detail' 
          component={DetailPost}
          options={{
            headerShown: true,
            header: (props) => <UpperNavbar {...props} />,
          }}
          />
      </Stack.Navigator>
    </>
  );
}

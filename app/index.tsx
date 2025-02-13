import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/signUp'
import AddAccount from '../screens/addAccount'
import BottomTab from './tabs';

const Stack = createStackNavigator()

export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown : false
      }}
    >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="Home" component={BottomTab} />
    </Stack.Navigator>
  );
}

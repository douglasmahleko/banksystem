import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewTransaction from '../screens/viewTransaction'
import ViewAccount from '../screens/viewAccount'
import MakeTransaction from '../screens/makeTransaction'
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialIcons";
import { View} from "react-native"
import { theme } from "../assets/contents/themes";

const Tab = createBottomTabNavigator()

function BottomTab(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown : false,
            tabBarShowLabel:false,
            style:{
                position: 'absolute',
                bottom:0,
                left:0,
                right:0,
                elevation:0,
                backgroundColor:"transparent"
            }
        }}>
            <Tab.Screen name="ViewTransaction" component={ViewTransaction}
                
                options={{
                    tabBarIcon : ({focused}) => (
                        <Icons name="pageview" size={25} color={ focused ? "coral" : "#0c381f" } />
                    )
                }}
            />
            <Tab.Screen name="MakeTransaction" component={MakeTransaction} 
                options={{
                    tabBarIcon : ({focused}) => (
                        <View style={{height:60,
                            width:60,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:theme.lime,
                            borderColor:"coral",
                            borderWidth:2,
                            borderRadius:30,
                            top:-25,
                            elevation:5}}>
                            <Icon name="send" size={25} color={ focused ? "coral" : "#0c381f" } />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="ViewAccount" component={ViewAccount} 
                options={{
                    tabBarIcon : ({focused}) => (
                        <Icons name="manage-accounts" size={25} color={ focused ? "coral" : "#0c381f" } />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab
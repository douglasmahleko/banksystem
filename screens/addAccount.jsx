import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import { theme } from "../assets/contents/themes"
import { ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import { sizes } from "../assets/contents/sizes"
import { useState } from "react"
import { Formik } from "formik"

function AddAccount({navigation}){
    const [showPassword, setShowPassword] = useState(false)

    function pressHandler(values, url){
        fetch(url, {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((res) => {
            Alert.alert("Data inserted")
            navigation.navigate("SignUp")
        })
        .catch((err) => {
            Alert.alert(err)
        })
    }
    function renderHeader(){
        return(
            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")} style={{
                flexDirection:"row",
                alignItems:"center",
                marginTop: sizes.padding*3,
                paddingHorizontal:sizes.padding*2
            }} >
                <Icon name="arrow-back" size={20} color={theme.white} />
                <Text style={{color:theme.white, fontWeight:"bold", fontSize:20, marginLeft:sizes.padding*1.5}} > 
                Add Account</Text>
            </TouchableOpacity>
        )
    }
    function renderForm(){
        return(
            <ScrollView style={{marginTop:sizes.padding*3, marginHorizontal:sizes.padding*3}}>
                <Formik
                        initialValues={{ fname:'', lname:'', contact:'', email:'', password:'', confirm:'' }}
                        onSubmit={(values, actions) => {
                            actions.resetForm()
                            pressHandler(values, 'http://192.168.0.144/insert.php')
                        }}
                    >
                {
                    (props) => (
                        <View>
                            <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>First Name</Text>
                    <TextInput placeholder="First Name..."
                        selectionColor={theme.white}
                        placeholderTextColor={theme.white}
                        onChangeText={props.handleChange('fname')}
                        value={props.values.fname}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                </View>
                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Last Name</Text>
                    <TextInput placeholder="Last Name..."
                        selectionColor={theme.white}
                        onChangeText={props.handleChange('lname')}
                        value={props.values.lname}
                        placeholderTextColor={theme.white}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                </View>
                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Contact</Text>
                    <TextInput placeholder="Contact..."
                        selectionColor={theme.white}
                        onChangeText={props.handleChange('contact')}
                        value={props.values.contact}
                        keyboardType="numeric"
                        placeholderTextColor={theme.white}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                </View>
                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Email</Text>
                    <TextInput placeholder="Email..."
                        selectionColor={theme.white}
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                        placeholderTextColor={theme.white}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                </View>
                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Password</Text>
                    <TextInput placeholder="Enter Password.."
                        selectionColor={theme.white}
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        placeholderTextColor={theme.white}
                        secureTextEntry={!showPassword}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position:"absolute",
                             right:0, bottom:10, height:30, width:30}}>
                                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.white} />
                        
                     </TouchableOpacity>
                </View>
                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Confirm</Text>
                    <TextInput placeholder="Enter to confirm Password.."
                        selectionColor={theme.white}
                        placeholderTextColor={theme.white}
                        onChangeText={props.handleChange('confirm')}
                        value={props.values.confirm}
                        secureTextEntry={!showPassword}
                        style={{
                            marginVertical: sizes.padding,
                            borderBottomColor: theme.white,
                            borderBottomWidth :1,
                            height:40,
                            color:theme.white,
                            fontSize:14,
                            paddingLeft:3
                        }}
                     />
                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position:"absolute",
                             right:0, bottom:10, height:30, width:30}}>
                                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.white} />
                        
                     </TouchableOpacity>
                </View>
                <View style={{margin:sizes.padding*3}}>
                    <TouchableOpacity onPress={props.handleSubmit}
                    style={{height:60, backgroundColor:theme.black, alignItems:"center", 
                    justifyContent:"center", borderRadius:sizes.radius*1.5
                    }}>
                        <Text style={{color:theme.white,fontSize:20, fontWeight:"bold"}}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                        </View>
                    )
                }
                </Formik>
            </ScrollView>
        )
    }
    return(
        <View
            style={{flex:1}}
        >
            <LinearGradient
                style={{flex:1}}
                colors={[theme.lime, theme.emerald]}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderForm()}
                </ScrollView>
            </LinearGradient>
        </View>
    )
}
export default AddAccount
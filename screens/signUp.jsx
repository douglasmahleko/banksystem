import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import { theme } from "../assets/contents/themes"
import { ScrollView } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import { sizes } from "../assets/contents/sizes"
import { Image } from "react-native"
import { useEffect, useState } from "react"
import { Formik } from "formik"
import axios from "axios"

function SignUp({navigation}){
    const [showPassword, setShowPassword] = useState(false)
    const [found, setfound] = useState(true)
    const [data, setdata] = useState(null)
    useEffect(() => {
        axios.get('http://192.168.0.144/account.php')
        .then(res => {
            setdata(res.data)
        })
        .catch((e) => {
            Alert.alert(err)
        })  
        }, ['http://192.168.0.144/account.php']
       )
    function renderHeader(){
        return(
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginTop: sizes.padding*3,
                paddingHorizontal:sizes.padding*2
            }} >
                <Text style={{color:theme.white, fontWeight:"bold", fontSize:20, marginLeft:sizes.padding*1.5}} > 
                Sign Up</Text>
            </View>
        )
    }
    function pressHandler(values, url){
        if(data){
            data.forEach(element => {
                if(element.email === values.email){
                    if (element.password === values.password){
                        Alert.alert("Welcome to Your Account")
                        setfound(false)
                        navigation.navigate("Home")
                    }   
                }
            });
            if(found){
                Alert.alert("Password and username match not")
            }
        }
    }
    function renderLogo(){
        return(
            <View style={{height:100,alignItems:"center", justifyContent:"center", marginTop:sizes.padding*4}} >
                <Image source={require("../assets/images/logo.jpeg")} resizeMode="contain"
                    style={{width:"60%", borderRadius:40}}
                />
            </View>
        )
    }
    function renderForm(){
        return(
            <ScrollView style={{marginTop:sizes.padding*3, marginHorizontal:sizes.padding*3}}>
                <Formik
                        initialValues={{ email:'', password:''}}
                        onSubmit={(values, actions) => {
                            actions.resetForm()
                            pressHandler(values, 'http://192.168.0.144/account.php')
                        }}
                    >
                    {
                        (props) => (
                            <View>
                                <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>Email</Text>
                    <TextInput placeholder="Email..."
                        selectionColor={theme.white}
                        value={props.values.email}
                        onChangeText={props.handleChange('email')}
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
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
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
                <TouchableOpacity onPress={props.handleSubmit}
                 style={{height:60, backgroundColor:theme.black, alignItems:"center", 
                justifyContent:"center", borderRadius:sizes.radius*1.5
            }}>
                    <Text style={{color:theme.white,fontSize:20, fontWeight:"bold"}}>
                        SignIn
                    </Text>
                </TouchableOpacity>
                            </View>
                        )
                    }
                </Formik>
            </ScrollView>
        )
    }
    function renderButton(){
        return(
            <View style={{margin:sizes.padding*3}}>
                <TouchableOpacity onPress={()=> navigation.navigate("AddAccount")}
                 style={{height:50, backgroundColor:theme.purple, marginTop:sizes.padding, alignItems:"center", 
                justifyContent:"center", borderRadius:sizes.radius*1.5
            }}>
                    <Text style={{color:theme.white,fontSize:20, fontWeight:"bold"}}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
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
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
        </View>
    )
}
export default SignUp
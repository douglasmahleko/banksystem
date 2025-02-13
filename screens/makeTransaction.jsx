import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import { theme } from "../assets/contents/themes"
import { ScrollView } from "react-native"
import { sizes } from "../assets/contents/sizes"
import { Formik } from "formik"

function MakeTransaction({navigation}){
    function renderHeader(){
        return(
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginTop: sizes.padding*3,
                paddingHorizontal:sizes.padding*2
            }} >
                <Text style={{color:theme.white, fontWeight:"bold", fontSize:20, marginLeft:sizes.padding*1.5}} > 
                Make Transaction</Text>
            </View>
        )
    }
    function pressHandler(values, url){
        console.log(values)
        console.log(url)
        fetch(url, {
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((resJ) => {
            Alert.alert(resJ)
            console.log(resJ)
            navigation.navigate("ViewTransaction")
        })
        .catch((err) => {
            Alert.alert(err)
            console.log(err)
        })
    }
    function renderForm(){
        return(
            <ScrollView style={{marginTop:sizes.padding*3, marginHorizontal:sizes.padding*3}}>
                <Formik
                        initialValues={{sender:"", receiver:'', purpose:'', amount:"", transactionTime: new Date()}}
                        onSubmit={(values, actions) => {
                            actions.resetForm()
                            pressHandler(values, 'http://192.168.0.144/transact.php')
                            console.log(values)
                        }}
                    >
                {
                    (props) => (
                        <View>
                            <View style={{marginTop:sizes.padding*3}}>
                    <Text style={{fontSize:16,
                            fontWeight:"bold", color:theme.lightGreen}}>My Account</Text>
                    <TextInput placeholder="Email..."
                        selectionColor={theme.white}
                        placeholderTextColor={theme.white}
                        value={props.values.sender}
                        onChangeText={props.handleChange('sender')}
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
                            fontWeight:"bold", color:theme.lightGreen}}>Receiver Account</Text>
                    <TextInput placeholder="Email..."
                        selectionColor={theme.white}
                        placeholderTextColor={theme.white}
                        value={props.values.receiver}
                        onChangeText={props.handleChange('receiver')}
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
                            fontWeight:"bold", color:theme.lightGreen}}>Purpose</Text>
                    <TextInput placeholder="Purpose..."
                        selectionColor={theme.white}
                        placeholderTextColor={theme.white}
                        value={props.values.purpose}
                        onChangeText={props.handleChange('purpose')}
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
                            fontWeight:"bold", color:theme.lightGreen}}>Receiver Amount</Text>
                    <TextInput placeholder="Amount..."
                        selectionColor={theme.white}
                        keyboardType="numeric"
                        value={props.values.amount}
                        onChangeText={props.handleChange('amount')}
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
                <View style={{margin:sizes.padding*3}}>
                <TouchableOpacity onPress={props.handleSubmit}
                 style={{height:60, backgroundColor:theme.black, alignItems:"center", 
                justifyContent:"center", borderRadius:sizes.radius*1.5
            }}>
                    <Text style={{color:theme.white,fontSize:20, fontWeight:"bold"}}>
                        Send
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
export default MakeTransaction
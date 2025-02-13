import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from "react-native"
import { theme } from "../assets/contents/themes"
import { useEffect, useState } from "react"
import { sizes } from "../assets/contents/sizes"
import Icon from "react-native-vector-icons/MaterialIcons"
import axios from "axios"


function ViewAccount(){
    const [accounts, setaccounts] = useState(null)
    useEffect(() => {
        axios.get('http://192.168.0.144/account.php')
        .then(res => {
            setaccounts(res.data)
        })
        .catch((e) => {
            Alert.alert(err)
        })  
        }, ['http://192.168.0.144/account.php']
       )
    function renderHeader(){
        return(
            <View style={{flexDirection:"row", marginVertical:sizes.padding*2, paddingTop:20}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize:20, fontWeight:"bold"}}>Hello!</Text>
                    <Text style={{fontSize:18, fontWeight:"500", color:theme.gray}}>By Douglas</Text>
                </View>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity style={{height:40, width:40, backgroundColor:theme.lightGray, justifyContent:"center", alignItems:"center"}}>
                        <Icon name="notifications-none" size={20} color={theme.secondary} />
                        <View style={{position:"absolute", top:-5, right:-5, height:10, width:10,borderRadius:5, backgroundColor:theme.red}}>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function renderPromos(){

        const HeaderComponent = () => {
            return(
                <View>
                    {renderHeader()}
                    {renderPromoHead()}
                </View>
            )
        }
        const  renderPromoHead = () => {
            return(
                <View style={{flexDirection:"row", marginBottom:sizes.padding}}>
                    <View style={{flex:1}}>
                        <Text style={{ fontSize:18, fontWeight:"bold"}}>Accounts</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{color:theme.gray, fontSize:14, fontWeight:"500"}}>View All</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const renderItem = ({item}) => {
            return(
                <TouchableOpacity style={{marginVertical:sizes.base, width:sizes.width/1.2}}>
                    <View style={{padding:sizes.padding, backgroundColor:theme.lightGray,
                        borderBottomRightRadius:20, borderBottomLeftRadius:10
                    }}>
                        <Text style={{  fontSize:18, fontWeight:"bold"}}>F.Name : {item.fname} </Text>
                        <Text style={{  fontSize:16}}>L.Name : {item.lname} </Text>
                        <Text style={{  fontSize:16}}>Contact : {item.contact} </Text>
                        <Text style={{  fontSize:16}}>Email : {item.email} </Text>
                        <Text style={{  fontSize:16}}>Balance {item.balance} </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View>
                { accounts ? (<FlatList 
                ListHeaderComponent={HeaderComponent}
                data={accounts}
                renderItem={renderItem}
                contentContainerStyle={{paddingHorizontal:sizes.padding*3}}
                ListFooterComponent={
                    <View style={{marginBottom:80}}>

                    </View>
                }
            />) : (<View style={{flex:1}}>
                <Text style={{fontSize:18, fontWeight:"500", color:theme.gray}}>Loading...</Text>
            </View>)}
            </View>
        )
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:theme.gray}}>
            {renderPromos()}
        </SafeAreaView>
    )
}
export default ViewAccount


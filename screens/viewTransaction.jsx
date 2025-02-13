import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Touchable, Alert } from "react-native"
import { theme } from "../assets/contents/themes"
import { useEffect, useState } from "react"
import { sizes } from "../assets/contents/sizes"
import Icon from "react-native-vector-icons/MaterialIcons"
import axios from "axios"

function ViewTransaction(){
    const [transactions, settransactions] = useState(null)
    useEffect(() => {
        axios.get('http://192.168.0.144/transact.php')
        .then(req => {
            settransactions(req.data)
        })
        .catch((e) => {
            Alert.alert(e)
        })  
        } , ['http://192.168.0.144/transact.php']
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
                        <Text style={{ fontSize:18, fontWeight:"bold"}}>Transaction History</Text>
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
                        <View>
                        <Text style={{  fontSize:18, fontWeight:"bold"}}>ID : {item.id} </Text>
                        <Text style={{  fontSize:18, fontWeight:"bold"}}>Receiver : {item.receiver} </Text>
                        </View>
                        <Text style={{  fontSize:16}}>Amount : {item.amount} </Text>
                        <Text style={{  fontSize:18, fontWeight:"bold"}}> Sender : {item.sender} </Text>
                        <Text style={{  fontSize:16}}> {item.transactionTime} </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View>
                { transactions ? (<FlatList 
                ListHeaderComponent={HeaderComponent}
                data={transactions}
                renderItem={renderItem}
                contentContainerStyle={{paddingHorizontal:sizes.padding*3}}
                ListFooterComponent={
                    <View style={{marginBottom:80}}>

                    </View>
                }
                />) : (<View style={{flex:1}}>
                    <Text style={{fontSize:18, fontWeight:"500", color:theme.gray}}>Loading...</Text>
                </View> )}
            </View>
        )
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:theme.gray}}>
            {renderPromos()}
        </SafeAreaView>
    )
}
export default ViewTransaction


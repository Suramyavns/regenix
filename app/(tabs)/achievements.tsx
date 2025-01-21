import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { general } from "../styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import UserHeader from "../components/UserHeader";
import { colors } from "../colors";
import Octicons from "@expo/vector-icons/Octicons";
import {LinearGradient} from 'expo-linear-gradient'


export default function Home(){
    const width = Dimensions.get('screen').width
    return(
        <View style={general.main}>
            <UserHeader />
            <View style={{
                width:'90%',
                height:'20%',
                borderRadius:16,
                borderWidth:1,
                borderColor:colors.shadow,
                padding:12,
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:8
            }}>
                <View style={{
                    width:'90%',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:16
                }}>
                    <View style={{
                        backgroundColor:'black',
                        height:32,
                        width:32,
                        borderRadius:16,
                        alignContent:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            color:'white',
                            textAlign:'center'
                        }}>
                            2
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'600'
                        }}>Level 2</Text>
                        <Text style={{
                            fontWeight:'200',
                            color:`${colors.black}aa`
                        }}>
                            500 Points to next level
                        </Text>
                    </View>
                </View>
                <View style={{
                    width:'90%',
                    height:28,
                    borderRadius:100,
                    alignItems:'center',
                    justifyContent:'space-between',
                    flexDirection:'row',
                    backgroundColor:'#edb55230'
                }}>
                    <LinearGradient start={[0,0]} end={[1,1]} colors={[
                        '#217b4a',
                        '#47e77c'
                    ]} style={{
                        width:'80%',
                        height:'100%',
                        borderRadius:100,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingRight:12
                    }}>
                        <View style={{
                            width:29,
                            height:29,
                            borderRadius:100,
                            alignContent:'center',
                            justifyContent:'center',
                            backgroundColor:'transparent',
                            borderWidth:2,
                            borderColor:'white'
                        }}>
                            <Text style={{
                                textAlign:'center',
                                fontSize:20,
                                color:'white'
                            }}>2</Text>
                        </View>
                        <Text style={{
                            color:'white',
                            fontSize:16,
                        }}>
                            5500/6000
                        </Text>
                    </LinearGradient>
                    <View style={{
                        height:28,
                        width:28,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#edb552aa',
                        borderRadius:100,
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color:`${colors.black}aa`
                        }}>3</Text>
                    </View>
                </View>
            </View>
            <View style={{
                height:'20%',
                width:'90%',
                marginVertical:16,
            }}>
                <Text style={{
                    fontSize:16,
                }}>MEDALS 53</Text>
                <View style={{
                    width:'100%',
                    height:'90%',
                    flexDirection:'row',
                    paddingVertical:12,
                    justifyContent:'space-between'
                }}>
                    <View style={{
                        width:'30%',
                        aspectRatio:.8,
                        borderWidth:1,
                        borderColor:colors.shadow,
                        borderRadius:18,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <LinearGradient colors={['gold','#edb552cc']} style={{
                            width:28,
                            aspectRatio:1,
                            borderRadius:100,
                            marginVertical:8
                        }} />
                        <Text>Gold</Text>
                        <Text style={{
                            fontSize:18,
                            backgroundColor:'#edb55230',
                            paddingHorizontal:8,
                            color:'#eab021',
                            borderRadius:12,
                            marginVertical:4
                        }}>24</Text>
                    </View>
                    <View style={{
                        width:'30%',
                        aspectRatio:.8,
                        borderWidth:1,
                        borderColor:colors.shadow,
                        borderRadius:18,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <LinearGradient colors={['#c0c0c0','#c0c0c0cc']} style={{
                            width:28,
                            aspectRatio:1,
                            borderRadius:100,
                            marginVertical:8
                        }} />
                        <Text>Silver</Text>
                        <Text style={{
                            fontSize:18,
                            backgroundColor:'#c0c0c030',
                            paddingHorizontal:8,
                            color:'#606060',
                            borderRadius:12,
                            marginVertical:4
                        }}>18</Text>
                    </View>
                    <View style={{
                        width:'30%',
                        aspectRatio:.8,
                        borderWidth:1,
                        borderColor:colors.shadow,
                        borderRadius:18,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <LinearGradient colors={['#cd7f32','#cd7f32cc']} style={{
                            width:28,
                            aspectRatio:1,
                            borderRadius:100,
                            marginVertical:8
                        }} />
                        <Text>Bronze</Text>
                        <Text style={{
                            fontSize:18,
                            backgroundColor:'#cd7f3230',
                            paddingHorizontal:8,
                            color:'#cd7f32',
                            borderRadius:12,
                            marginVertical:4
                        }}>11</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
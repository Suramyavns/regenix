// @ts-nocheck

import { ActivityIndicator, BackHandler, Image, Pressable, Text, View } from "react-native";
import { general } from "../styles";
import { colors } from "../colors";
import UserHeader from "../components/UserHeader";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { getAQI, getAQIColor, getWeather } from "../api/weather";
import Entypo from '@expo/vector-icons/Entypo'
import {getSuggestion} from '../api/nlp'
import { account } from "@/Appwrite";
import { useRouter } from "expo-router";


export default function Home(){
    const [aqiColor,setAQIColor]=useState('yellowgreen')
    const [loading,toggleLoading]=useState<Boolean>(false);
    const [location,setLocation]=useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [weatherData,setWeather]=useState(null);
    const [AQIdata,setAQIdata]=useState(null);
    const [suggestion,setSuggestion]=useState(null)
    const router = useRouter();

    async function getCurrentLocation(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            BackHandler.exitApp();
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    const fetchWeather = async() => {
        const lat = location?.coords.latitude;
        const lon = location?.coords.longitude;
        const data = await getWeather(lat,lon);
        setWeather(data);
    }

    const fetchAQI = async()=>{
        const data = await getAQI();
        setAQIdata(data);
        const aqi = data['data']['aqi']
        const color = getAQIColor(aqi);
        setAQIColor(color);
    }

    const fetchSuggestion = async()=>{
        toggleLoading(true);
        const suggestion = await getSuggestion(weatherData);
        setSuggestion(suggestion)
        toggleLoading(false);
    }

    const fetchUser = async() => {
        const user = await account.get();
        const prefs = await account.getPrefs();
        if(!prefs.avatar){
            router.replace('/createProfile')
        }
    }

    useEffect(()=>{
        fetchUser();
        getCurrentLocation();
        if(location?.coords){
            fetchWeather();
        }
        else{
            setErrorMsg('Unable to fetch location')
        }
        fetchAQI();
        fetchSuggestion();
    },[location?.coords.latitude])

    return(
        <View style={general.main}>
            <UserHeader/>
            {
                !location?
                <View style={{
                    flex:1,
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}>
                    <ActivityIndicator color={colors.blue} size={100} />
                </View>
                :
                <View style={{
                    flexDirection:'column',
                    gap:24,
                    width:'100%',
                    height:'100%',
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}>
                    <View style={{
                        paddingHorizontal:12,
                        flexDirection:'row',
                        borderWidth:1,
                        borderColor:colors.shadow,
                        borderRadius:18,
                        width:'90%',
                        height:'20%',
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        {weatherData && 
                        <>
                        <View style={{
                            width:'45%',
                            flexDirection:"column",
                            alignItems:'center',
                        }}>
                            <Image source={{
                                uri:`https://${weatherData['current']['condition']['icon'].substring(2)}`
                            }} style={{
                                width:'50%',
                                height:'50%',
                            }} />
                            <Text style={{
                                fontSize:18,
                                color:`${colors.black}aa`
                            }}>
                                {weatherData['current']['condition']['text']}
                            </Text>
                        </View>
                        <View style={{
                            padding:12,
                            gap:2
                        }}>
                            <Text style={{
                                fontSize:32,
                                color:colors.black
                            }}>
                                {weatherData['current']['temp_c']}°C
                            </Text>
                            <Text style={{color:`${colors.black}aa`}}>
                                Feels like {weatherData['current']['feelslike_c']}°C
                            </Text>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center'
                            }}>
                                <Entypo name="location-pin" color={`${colors.black}aa`} />
                                <Text style={{color:`${colors.black}aa`}}>
                                    {weatherData['location']['name']},{weatherData['location']['region']}
                                </Text>
                            </View>
                        </View>
                        </>}
                    </View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        width:'90%',
                    }}>
                        <View style={{
                            width:'45%',
                            aspectRatio:1,
                            borderWidth:4,
                            borderRadius:100,
                            borderColor:`${colors.black}aa`,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <Text style={{
                                color:`${colors.black}cc`
                            }}>Your Score</Text>
                            <Text style={{
                                fontSize:56,
                                color:`${colors.black}cc`
                            }}>750</Text>
                        </View>
                        <View style={{
                            width:'45%',
                            aspectRatio:1,
                            borderRadius:100,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:colors.black
                        }}>
                            <Text style={{
                                color:aqiColor
                            }}>AQI</Text>
                            <Text style={{
                                fontSize:56,
                                color:aqiColor
                            }}>
                                {AQIdata && AQIdata['data']['aqi']}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        borderWidth:1,
                        borderRadius:18,
                        borderColor:colors.shadow,
                        paddingVertical:18,
                        paddingHorizontal:12,
                        width:'90%',
                        height:'auto',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            width:'100%',
                            color:'grey',
                            textAlign:'left',
                            fontSize:20
                        }}>
                            Suggestion
                        </Text>
                        {
                            loading?
                            <ActivityIndicator color={colors.black} size={50} />
                            :
                            <>
                            <Text style={{
                                padding:12,
                                fontSize:14
                            }}>
                                {suggestion.content.trim()}
                            </Text>
                            <Pressable style={{
                                backgroundColor:colors.blue,
                                width:'80%',
                                padding:8,
                                borderRadius:24,
                            }}>
                                <Text style={{
                                    width:'100%',
                                    fontSize:16,
                                    textAlign:'center',
                                    color:'white'
                                }}>
                                    Inspect Task
                                </Text>
                            </Pressable>
                            </>
                        }
                    </View>
                </View>
            }
            
        </View>
    )
}
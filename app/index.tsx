import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { general } from "./styles";
import { colors } from "./colors";
import LottieView from 'lottie-react-native'
import { useEffect, useRef, useState } from "react";
import { account } from "@/Appwrite";

export default function Index() {
  const router = useRouter();
  const [loading,setLoading]=useState(true);

  const checkAccount = async() =>{
    if(await account.get()){
      router.replace('/(tabs)/home')
    }
  }

  useEffect(()=>{
    setTimeout(() => {
      checkAccount()
    },200)
    setLoading(false);
  },[])

  const animation = useRef<LottieView>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {
        loading?
        <ActivityIndicator color={colors.green} size={100} />
        :
        <>
        <Image style={{
        margin:48
      }} source={require('../assets/images/logo-transparent.png')} />

      <LottieView 
      autoPlay
      ref={animation}
      style={{
        width: 300,
        height: 300,
      }}
      source={require('../assets/animations/welcome.json')}
      />

      <View style={{
        flexDirection:'column',
        gap:12,
        padding:12
      }}>
        <Link style={[general.btnWide,{
          backgroundColor:colors.blue,
          color:'white',
        }]} href={'/login'}>Login</Link>
        <Link style={[general.btnWide,{
          backgroundColor:colors.darkgreen,
          color:'white',
        }]} href={'/register'}>Create a new account</Link>
      </View>
        </>
      }
    </View>
  );
}

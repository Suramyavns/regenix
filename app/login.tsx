import { Link, Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, Image, Pressable, Text, TextInput, View } from "react-native";
import { general } from "./styles";
import { colors } from "./colors";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { account } from "@/Appwrite";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Index() {
  const [email,setEmail]=useState<string|null>(null)
  const [password,setPassword]=useState<string|null>(null)
  const [seePassword,setSeePassword]=useState(false)
  const [error,setError]=useState<string|null>(null)
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  const signin = async() => {
    setLoading(true)
    if(email && password && password.length>=8){
      try{
        await account.createEmailPasswordSession(email,password);
        if(await account.get()){
          router.replace('/(tabs)/home')
        }
      }
      // @ts-ignore
      catch(e){setError(e.message);
      }
    }
    else if(password && password?.length<8){
      setError('Password must be 8 characters long!');
    }
    else{
      setError('Please fill in all fields!')
    }
    setLoading(false);
  }

  return (
    <View
      style={{
        height:Dimensions.get('screen').height*.95,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text style={{
        fontSize:72,
        color:colors.darkgreen,
        paddingVertical:32,
      }}>Sign-In</Text>
      {
        loading?
        <ActivityIndicator size={100} color={colors.green} />
        :
        <View style={{
          gap:12,
          flexDirection:'column'
        }}>
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>Your E-mail</Text>
          <TextInput onChangeText={setEmail} style={[general.inputWide]} placeholder="example@gmail.com" />
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>Your Password</Text>
          <View style={[{
            width:'90%',
            flexDirection:'row',
            alignItems:'center',
            gap:4,
            justifyContent:'space-between'
          },general.inputWide]}>
            <TextInput
            onChangeText={setPassword}
            secureTextEntry={!seePassword}
            style={{
              width:'90%'
            }} placeholder="********" />
            <Pressable onPress={()=>{setSeePassword(!seePassword)}}>
              {
                seePassword?
                <Entypo size={24} name="eye" />
                :
                <Entypo size={24} name="eye-with-line" />
              }
            </Pressable>
          </View>
          {
              error?
              <View style={{
                backgroundColor:colors.red,
                borderWidth:2,
                borderColor:colors.darkred,
                borderRadius:12,
                padding:12,
                alignItems:'center',
                justifyContent:'space-between',
                flexDirection:'row',
                width:'90%'
              }}>
                <Text style={{
                  fontSize:18,
                  color:'white'
                }}>{error}</Text>
                <Pressable onPress={()=>{setError(null)}}>
                  <AntDesign name="closecircle" size={24} color={'white'} />
                </Pressable>
              </View>
              :
              <></>
            }
          <Pressable onPress={signin} style={[general.btnWide,{
            backgroundColor:colors.green,
          }]}>
            <Text style={{fontSize:24,textAlign:'center',color:'white'}}>
              Sign In Now
            </Text>
          </Pressable>
        </View>
      }

      <Link href={'/register'} style={[general.btnWide,{
          backgroundColor:colors.blue,
          position:'absolute',
          bottom:0,
          margin:12,
        }]}>
          <Text style={{fontSize:24,textAlign:'center',color:'white'}}>
            I don't have an account
          </Text>
        </Link>
    </View>
  );
}

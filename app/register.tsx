import { Link, Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, Image, Pressable, Text, TextInput, View } from "react-native";
import { general } from "./styles";
import { colors } from "./colors";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import {account} from '../Appwrite'
import { ID } from "react-native-appwrite";
import AntDesign from '@expo/vector-icons/AntDesign'

export default function Index() {
  const [seePassword,setSeePassword]=useState(false);
  const [seeConfirmation,setConfirmationPassword]=useState(false);
  const [email, setEmail] = useState<string|null>(null);
  const [name,setName]=useState<string|null>(null);
  const [password, setPassword] = useState<string|null>(null);
  const [confirmation, setConfirmation] = useState<string|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
  }

  const registerUser = async() => {
    if(email && password && password.length>=8 && name){
      try{
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
        const user = await account.get();
        if(user){
          router.replace('/createProfile')
        }
      }
      catch(error){
        console.log(error);      
      }
    }
    else if(!name){
      setError("Please enter your name")
    }
    else if(password?.length){
      setError("Password must be at least 8 characters")
    }
    else{
      setError("Email or Password not provided!");
    }
  }

  const createUser = async() => {
    setLoading(true);
    console.log('registering user');
    if(password===confirmation){
      await registerUser()
    }
    else{
      setError("Passwords do not match!");
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
      }}>Sign-Up</Text>
      
      {
        loading?
        <ActivityIndicator size={100} color={colors.green} />:
        <View style={{
          gap:12,
          flexDirection:'column',
        }}>
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>E-mail</Text>
          <TextInput onChangeText={setEmail} style={[general.inputWide]} placeholder="example@gmail.com" />
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>Password</Text>
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
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>Confirm Password</Text>
          <View style={[{
            width:'90%',
            flexDirection:'row',
            alignItems:'center',
            gap:4,
            justifyContent:'space-between'
          },general.inputWide]}>
            <TextInput
            onChangeText={setConfirmation}
            style={{width:'90%'}}
            secureTextEntry={!seeConfirmation}
            placeholder="********" />
            <Pressable onPress={()=>{setConfirmationPassword(!seeConfirmation)}}>
              {
                seeConfirmation?
                <Entypo size={24} name="eye" />
                :
                <Entypo size={24} name="eye-with-line" />
              }
            </Pressable>
          </View>
          <Text style={{
            fontSize:24,
            color:colors.black
          }}>Name</Text>
          <TextInput onChangeText={setName} style={[general.inputWide]} placeholder="eg. John Doe" />
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
        </View>
      }

      <View style={{
        position:'absolute',
        bottom:0,
        margin:12,
        gap:12,
        flexDirection:'column'
      }}>
        <Pressable onPress={createUser} style={[general.btnWide,{
            backgroundColor:colors.green,
          }]}>
          <Text style={{fontSize:24,textAlign:'center',color:'white'}}>
            Sign Up Now
          </Text>
        </Pressable>

        <Link href={'/login'} style={[general.btnWide,{
            backgroundColor:colors.blue,
          }]}>
          <Text style={{fontSize:24,textAlign:'center',color:'white'}}>
            I already have an account
          </Text>
        </Link>
      </View>
    </View>
  )
}

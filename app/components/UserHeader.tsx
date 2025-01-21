// @ts-nocheck
import { View,Text, Dimensions, ActivityIndicator, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { account, storage } from "@/Appwrite";
import { useEffect, useState } from "react";

export default function UserHeader(){
    const [user,setUser]=useState(null);
    const [profile,setProfile]=useState<string|null>(null);
    const width = Dimensions.get('screen').width

    const fetchUser = async() => {
        const user = await account.get();
        setUser(user);
    }

    const fetchProfile = async() => {        
        const bucketID = process.env.EXPO_PUBLIC_STORAGE_ID
        try{
            const profileID = await account.getPrefs();
            const file = await storage.getFileDownload(bucketID,profileID.avatar)
            setProfile(file.toString())
        }
        catch(e){console.log(e);
        }
    }

    useEffect(()=>{
        fetchUser();
        fetchProfile();
    },[])
    return(
        <View style={{
            paddingVertical:18,
            alignItems:'center',
            flexDirection:'column',
            justifyContent:'center'
        }}>
            {
                user?
                <>
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    borderWidth:1,
                    width:80,
                    aspectRatio:1,
                    borderRadius:100,
                }}>
                    {
                        profile?
                        <Image style={{
                            width:'100%',
                            height:'100%',
                            borderRadius:100,
                        }} source={{uri:profile}} />
                        :
                        <FontAwesome5 style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }} size={width*.1} name='user' />
                    }
                </View>
                <Text style={{
                    paddingVertical:16,
                    fontSize:24,
                    fontWeight:'bold'
                }}>
                    {user.name}
                </Text>
                </>
                :
                <ActivityIndicator size={50} />
            }
        </View>
    )
}
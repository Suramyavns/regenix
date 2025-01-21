import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { general } from "../styles";
import { colors } from "../colors";
import { account } from "@/Appwrite";
import { useRouter } from "expo-router";
import { useState } from "react";
import UserHeader from "../components/UserHeader";

export default function Home(){
    const router = useRouter();
    const [loading,setLoading]=useState(false);

    return(
        <View style={general.main}>
            {
                loading?
                <ActivityIndicator size={100} color={colors.green} />
                :
                <>
                <UserHeader />
                <Pressable
                onPress={async()=>{
                    setLoading(true);
                    await account.deleteSession('current');
                    router.replace('/')
                }}
                style={[general.btnWide,{
                    backgroundColor:colors.black
                }]}>
                    <Text 
                    style={{
                        fontSize:18,
                        textAlign:'center',
                        color:'white'
                    }}>Log Out</Text>
                </Pressable>
                </>
            }
        </View>
    )
}
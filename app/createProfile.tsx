// @ts-nocheck
import { View,Text, Pressable } from "react-native";
import ImageInput from "./components/ImageInput";
import { useEffect, useState } from "react";
import { account, storage } from "@/Appwrite";
import { general } from "./styles";
import { colors } from "./colors";
import { useRouter } from "expo-router";
import { ID } from "react-native-appwrite";

export default function CreateProfile(){
    const router = useRouter();

    const [user,setUser]=useState({})
    const [image,setImage]=useState<string|null>(null);

    const fetchUser = async() => {
        const user = await account.get();
        setUser(user);
    }

    const uploadImageToBucket = async(id,file)=>{
        const bucketID = process.env.EXPO_PUBLIC_STORAGE_ID
        try{
            const uploaded = await storage.createFile(bucketID,id,file);
            const fileID = uploaded.$id;
            await account.updatePrefs({avatar:fileID});
            router.replace('/(tabs)/home')
        }
        catch(e){
            console.log(e);
        }        
        return;
    }

    const uploadImage = async () =>{
        if(image){
            const response = await fetch(image)
            const blob = await response.blob()
            const file = {
                name:`avatar_${user.$id}.jpg`,
                size:blob.size,
                type:blob.type,
                uri:image
            }
            const result = await uploadImageToBucket(ID.unique(),file)
            return result
        }
        else{
            return null;
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])

    return(
        <View style={{
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'center',
            paddingVertical:24,
        }}>
            <Text style={{
                textAlign:'left',
                width:'90%',
                fontSize:24,
            }}>
                Welcome, {user.name}
            </Text>
            <ImageInput value={image} setter={setImage} />
            <Pressable onPress={uploadImage} style={{
                ...general.btnWide,
                position:'absolute',
                bottom:0,
                margin:12,
                backgroundColor:colors.green
            }}>
                <Text style={{
                    fontSize:20,
                    color:'white',
                    textAlign:'center'
                }}>
                    Upload and Finish
                </Text>
            </Pressable>
        </View>
    )
}
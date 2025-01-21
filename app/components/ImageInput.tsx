// @ts-nocheck
import Entypo from "@expo/vector-icons/Entypo";
import { Pressable, View, Text, BackHandler, Image, Dimensions } from "react-native";
import { colors } from "../colors";
import { general } from "../styles";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default function ImageInput({styles={
    size:48
},
setter,
value}){
    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:['images'],
            allowsEditing:false,
            aspect:[1,1],
            quality:1
        })

        console.log(result);
        

        if(!result.canceled){
            setter(result.assets[0].uri)
        }
        else{
            BackHandler.exitApp();
        }
    }
    return(
        <View style={{
            alignItems:'center'
        }}>
            <>
            <View style={{
                width:150,
                aspectRatio:1,
                margin:24,
                borderWidth:1,
                borderRadius:100,
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                {
                    value?
                    <Image style={{
                        width:'100%',
                        height:'100%',
                        borderRadius:100
                    }} source={{uri:value}} />
                    :
                    <Entypo
                    color={`${colors.black}`}
                    style={{
                        ...styles,
                        opacity:.6
                    }}
                    size={styles.size}
                    name="user" />
                }
            </View>
            <Pressable
            onPress={pickImage}
            style={{
                ...general.btnWide,
                width:150,
                alignItems:'center',
                backgroundColor:colors.lightblue
            }}>
                <Text style={{
                    color:'white',
                    fontSize:18,
                }}>
                    Set a Profile
                </Text>
            </Pressable>
            </>
        </View>
    )
}
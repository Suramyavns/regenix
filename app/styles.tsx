import { Dimensions, StyleSheet } from "react-native";

export const general = StyleSheet.create({
    main:{
        padding:12,
        flex:1,
        backgroundColor:'#f0f0f0',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    btnWide:{
        width:Dimensions.get('screen').width*.9,
        height:'auto',
        borderRadius:12,
        padding:12,
        textAlign:'center',
        fontSize:28,
        fontWeight:'500'
    },
    inputWide:{
        width:Dimensions.get('screen').width*.9,
        height:50,
        paddingHorizontal:12,
        borderWidth:1,
        borderRadius:12,
        fontSize:20
    }
})
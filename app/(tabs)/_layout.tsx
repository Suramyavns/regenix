import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

export default function MainLayout(){
    return(
        <Tabs screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{
                height:70
            },
            tabBarIconStyle:{
                width:'auto',
                height:60
            },
            tabBarActiveTintColor:'#1b59f8',
        }}>
            <Tabs.Screen name="tasks" options={{
                tabBarIcon:({color})=>(<Octicons size={28} name="tasklist" color={color} />)
            }}/>
            <Tabs.Screen name="achievements" options={{
                tabBarIcon:({color})=>(<FontAwesome5 size={28} name="medal" color={color} />)
            }}/>
            <Tabs.Screen name="home" options={{
                tabBarIcon:({color})=>(<MaterialCommunityIcons size={48} name="lightning-bolt-circle" color={color} />)
            }}/>
            <Tabs.Screen name="notifications" options={{
                tabBarIcon:({color})=>(<Feather size={28} name="bell" color={color} />)
            }}/>
            <Tabs.Screen name="profile" options={{
                tabBarIcon:({color})=>(<Feather size={28} name="user" color={color} />)
            }}/>
        </Tabs>
    )
}
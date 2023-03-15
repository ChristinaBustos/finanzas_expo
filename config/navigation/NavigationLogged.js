import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import ProfileStack from '../stack/ProfileStack'
import AboutStack from '../stack/AboutStack'

const Tab = createBottomTabNavigator();
export default function NavigationLogged() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName='login'
            screenOptions={({route})=>({
                tabBarIcon:({color}) => screenOptions(route,color),
                tabBarActiveTintColor:"tomato",
                tabBarInactiveTintColor:"gray"
            })}
        >
            <Tab.Screen
                name='about'
                component={ProfileStack}
                options={{title:'Bienvenido'}}
            />
            <Tab.Screen
                name='profile'
                component={AboutStack}
                options={{title:'Perfil'}}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

const screenOptions = (route, color) =>{
    let iconName;
    switch(route.name){
        case 'about':
            iconName = 'information-outline';
            break;
        case 'profile':
            iconName = 'account-circle-outline';
            break;
    }
    return (<Icon type='material-community' name={iconName} size={22} color={color} />)
}
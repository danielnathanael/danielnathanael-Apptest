import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/home/Home'
import Contact from './views/contact/Contact'
import Form from './views/form/Form'

const Stack = createNativeStackNavigator()
const Routes = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Contact'
                component={Contact}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Form'
                component={Form}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes
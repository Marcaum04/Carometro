import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();

import Perfil from './Perfil'
import Consultas from './Consultas'
import Login from './login';
import Logout from './Logout'

export default class Main extends Component {
    render() {
        return (
            <View style={styles.main}>
                    <bottomTab.Navigator
                        initialRouteName='Perfil'
                        screenOptions={({ route }) => ({
                            tabBarIcon: () => {
                                if (route.name === 'Perfil') {
                                    return (
                                        <Image
                                            source={require('../../assets/img/retrato-de-modo.png')}
                                            style={styles.tabBarIcon}
                                        />
                                    )
                                }
                                // if (route.name === 'Consultas') {
                                //     return (
                                //         <Image
                                //             source={require('../../assets/img/verificacao-de-lista.png')}
                                //             style={styles.tabBarIcon}
                                //         />
                                //     )
                                // }
                                // if (route.name === 'Login') {
                                //     return (
                                //         <Image
                                //             source={require('../../assets/img/sign-out-free-icon-font.png')}
                                //             style={styles.tabBarIcon}
                                //         />
                                //     )
                                // }
                                if (route.name === 'Logout') {
                                    return (
                                        <Image
                                            source={require('../../assets/img/sign-out-free-icon-font.png')}
                                            style={styles.tabBarIcon}
                                        />
                                    )
                                }
                            },

                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarActiveBackgroundColor: '#C65454',
                            tabBarInactiveBackgroundColor: '#000000',
                            tabBarStyle: {
                                height: 60,
                                borderTopWidth: 0,
                                opacity: 0.9,
                                position: 'absolute',
                                blurRadius: 3,
                            }
                        })}
                    >
                        <bottomTab.Screen name="Perfil" component={Perfil} />
                        <bottomTab.Screen name="Logout" component={Logout} />
                    </bottomTab.Navigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

    bgMain: {
        flex: 1,
    },

    tabBarIcon: {
        width: 35,
        height: 35
    }
});
import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Logout extends Component {


    realizarLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');

  
                this.props.navigation.navigate('Login');
                console.warn('Logout realizado!');
            
        } catch {
            console.warn('Logout não foi possivel.')
        }
    };

    render() {
        return (
            <View style={styles.Login}>
                
                <Text style={styles.logoutTexto}>Tem certeza que quer encerrar a sessão?</Text>
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.realizarLogout}>
                    <Text style={styles.btnLoginText}>Deslogar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({


    Login: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C78989',
    },

    logoutTexto: {
        alignItems: 'center',
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 24,
        color: '#000000',
    },

    btnLogin: {
        width: 200,
        height: 80,
        backgroundColor: '#D94646',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',  
        marginTop: 45,
    },

    btnLoginText: {
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 24,
        color: '#000000',
    }
});
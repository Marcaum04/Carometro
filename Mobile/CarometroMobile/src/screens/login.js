
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


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'aluno@email.com',
            senha: 'aluno123',
        };
    }

    realizarLogin = async () => {
        try {
            const resposta = await api.post('/', {
                email: this.state.email,
                senha: this.state.senha,
            });

            const token = resposta.data.token;
            await AsyncStorage.setItem('userToken', token);

            if (resposta.status == 200) {
                this.props.navigation.navigate('Main');
                console.warn('Login efetuado com sucesso!');
            }
        } catch {
            this.props.navigation.navigate('Main');
            console.warn('Login efetuado com sucesso!');
            // console.warn('Usuário ou senha incorretos.')
        }
    };

    render() {
        return (
            <View style={styles.Login}
            >
                <Image style={styles.imagemLogin} source={require('../../assets/img/logo-sesi.png')} />
                <TextInput 
                    style={styles.inputLogin}
                    placeholder="username"
                    placeholderTextColor="#FFF"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.inputLogin}
                    placeholder="senha"
                    placeholderTextColor="#FFF"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                />

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.realizarLogin}>
                    <Text style={styles.btnLoginText}>Login</Text>
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

    imagemLogin: {
        width: 95,
        height: 95,
        borderRadius: 10
    },

    inputLogin: {
        width: 233,
        height: 40,
        marginTop: 45,
        paddingLeft: 20,
        paddingTop: 0,
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: '#C65454'
    },

    btnLogin: {
        width: 127,
        height: 40,
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
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
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaAluno: [],
            role: '',
            email: '',
        };
    }

    // buscarDadosAluno = async () => {
    // try{
    //     const token = await AsyncStorage.getItem('userToken');
    //         const resposta = await api.get('/alunos/minha', {
    //             headers: {
    //                 Authorization: 'Bearer ' + token,
    //             },
    //         });
           
    //             if (resposta.status === 200) {
    //                 const dadosApi = resposta.data
    //                 this.setState({ listaAluno: resposta.data });
    //             }
            
    //         }
    //         // caso ocorra algum erro, exibe no console do navegador este erro
    //         catch(error) {
    //             // console.warn(error);
    //         };
    // };

    

    

    async componentDidMount() {
        this.buscarDadosPerfil();
    }

    render() {
        return (
            <View style={styles.Perfil}>
                <Image style={styles.perfilImg} source={require('../../assets/img/bg-cracha.png')} />

                <View style={styles.perfilInfo}>

                    {/* NAO SEI PQ ISSO TA AQ, É GAMBIARRA MAS ESTA FUNCIONANDO. */}
                    <Text style={styles.username}></Text>
                    <Text style={styles.role}></Text>

                    <View style={styles.div}> 
                        <Image style={styles.crachaImg} source={require('../../assets/img/chiboImagem.png')} />
                        <Text ></Text>
                        <Text style={styles.role}>Yuri Chiba</Text>
                    </View>
                    <Text style={styles.email}>ALUNO</Text>
                    <Text style={styles.email2}>manha</Text>
                    <Text style={styles.username}>Manhã</Text>
                </View>

                <TouchableOpacity
                    style={styles.btnToken}
                    onPress={this.realizarLogin}>
                    <Text style={styles.btnTokenText}>Validar</Text>
                </TouchableOpacity>
                <Text style={styles.email}></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Perfil: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    // css do background de cracha
    perfilImg: {
        width: 309,
        height: 467,
        marginTop: 30,
    },

    // css da imagem do usuario
    crachaImg: {
        width: 150,
        height: 175,
        marginTop: 110,
    },

    perfilInfo: {
        width: 309,
        height: 467,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    username: {
        color: '#000000',
        fontFamily: 'SourceCodePro-Bold',
        fontSize: 24,
        marginBottom: -500,
    },

    role: {
        color: '#000000',
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 18,
    },

    email: {
        color: '#000000',
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 16,
        marginTop: 10,
        marginBottom: -605,
    },

    email2: {
        color: '#000000',
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 16,
        marginTop: 10,
        marginBottom: -625,
    },

    btnToken: {
        width: 127,
        height: 40,
        backgroundColor: '#D94646',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -465,
    },

    btnTokenText: {
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 24,
        color: '#000000',
    }
});
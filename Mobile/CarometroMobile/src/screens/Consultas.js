import React, { Component } from 'react';
import {
    FlatList,
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

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default class Consultas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            email: ''
        };
    }

    buscarConsultas = async () => {
        try {
            var token = await AsyncStorage.getItem('userToken')
            var resposta = await api.get('/consultas', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
            );


            if (resposta.status == 200) {
                const dadosDaApi = resposta.data;
                this.setState({ listaConsultas: dadosDaApi });
            }
        } catch (error) {
            console.warn(error);
        }
    };

    buscarConsultasMedico = async () => {
        try {
            var token = await AsyncStorage.getItem('userToken')
            var resposta = await api.get(`/consultas/med/${this.state.email}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
            );


            if (resposta.status == 200) {
                const dadosDaApi = resposta.data;
                this.setState({ listaConsultas: dadosDaApi });
            }

        } catch (error) {
            console.warn(error);
        }
    };

    buscarConsultasPaciente = async () => {
        try {
            var token = await AsyncStorage.getItem('userToken');
            var resposta = await api.get(`/consultas/pac/${this.state.email}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
            );


            if (resposta.status == 200) {
                const dadosDaApi = resposta.data;
                this.setState({ listaConsultas: dadosDaApi });
            }

        } catch (error) {
            console.warn(error);
        }
    };

    situacaoImg(situacao) {
        switch (situacao) {
            case 'Realizada':
                return (
                    <Image
                        source={
                            require('../../assets/img/realizada.png')
                        }
                        style={styles.situacao}
                    />
                )

            case 'Agendada':
                return (
                    <Image
                        source={
                            require('../../assets/img/agendada.png')
                        }
                        style={styles.situacao}
                    />
                )

            default:
                return (
                    <Image
                        source={
                            require('../../assets/img/cancelada.png')
                        }
                        style={styles.situacao}
                    />
                )
        }
    }

    async componentDidMount() {
        var token = await AsyncStorage.getItem('userToken');
        var resposta = jwtDecode(token);

        this.setState({
            email: resposta.email
        });

        switch (resposta.role) {
            case 'MED':
                this.buscarConsultasMedico();
                break;

            case 'PAC':
                this.buscarConsultasPaciente();
                break;

            default:
                this.buscarConsultas();
                break;
        }
    }

    render() {
        return (
            <View style={styles.consultas}>

                <Text style={styles.titleConsultas}>Consultas</Text>

                <FlatList
                    contentContainerStyle={styles.listaConsultas}
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}
                />

            </View>
        )
    }

    ///falta arrumar a listagem da especialidade

    renderItem = ({ item }) => (
        <View style={styles.consulta}>
            <View style={styles.nomes}>
                <Text style={styles.nomeMed}>Dr. {item.idMedicoNavigation.nomeMed}</Text>
                <Text style={styles.nomePac}>{item.idPacienteNavigation.nomePac} {item.idMedicoNavigation.idEspecialidadeNavigation.idEspecialidade}</Text> 
            </View>

            <View style={styles.preco}>
                <Text style={styles.situacaoStyle}>{item.situacao}</Text>
                <Text style={styles.valor}>
                    <Text style={styles.valorCifra}>R$</Text >{item.valor}
                </Text>
            </View>

            <View style={styles.horario}>
                <Text style={styles.hora}>{Intl.DateTimeFormat("pt-BR", { hour: 'numeric', minute: 'numeric' }).format(new Date(item.dataConsulta))}</Text>
                <Text style={styles.data}>{Intl.DateTimeFormat("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(item.dataConsulta))}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    consultas: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4DC0E0'
    },

    titleConsultas: {
        marginTop: 28,
        marginBottom: 10,
        fontFamily: 'SourceCodePro-Bold',
        fontSize: 32,
        color: '#FFFFFF'
    },

    listaConsultas: {
        height: 500,
    },

    consulta: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 350,
        borderBottomWidth: 3,
        borderBottomColor: '#FFFFFF',
        height: 60,
        marginBottom: 10,
    },

    nomes: {
        width: 200,
    },

    nomeMed: {
        fontFamily: 'SourceCodePro-Bold',
        height: 25,
        fontSize: 18,
        color: '#FFFFFF'
    },

    nomePac: {
        fontFamily: 'SourceCodePro-Regular',
        height: 15,
        fontSize: 10,
        color: '#FFFFFF'
    },

    preco: {
        alignItems: 'flex-end',
    },

    situacaoStyle: {
        color: '#FFFFFF',
    },

    situacao: {
        height: 25,
        width: 25,
        marginTop: 2,
    },

    valor: {
        fontFamily: 'Souliyo-Regular',
        fontSize: 12,
        color: '#FFFFFF'
    },
    
    valorCifra: {
        fontSize: 9,
    },
    
    horario: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    

    hora: {
        fontFamily: 'SourceCodePro-Regular',
        width: 60,
        textAlign: 'center',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: -5
    },

    data: {
        fontFamily: 'SourceCodePro-Regular',
        fontSize: 11,
        color: '#FFFFFF',
        marginTop: 0
    }
});
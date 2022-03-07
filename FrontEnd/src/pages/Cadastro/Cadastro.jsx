import React, { Component } from 'react';
import Header from '../../components/header/header';
import api from '../../services/api';
import user from '../../assets/img/user.png'

import '../../assets/css/Cadastro.css'

export default class Cadastro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            idTipoUsuario: 0,
            idInstituicao: 0,
            nomeUsuario: '',
            rg: '',
            email: '',
            senha: '',
            Imagem: '',
            arquivo: '',
            idUsuario: 0
        };
    };

    cadastrarUsuario = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true })

        let usuario = {
            idTipoUsuario: 2,
            idInstituicao: 1,
            nomeUsuario: this.state.nomeUsuario,
            rg: this.state.rg,
            email: this.state.email,
            senha: this.state.senha
        };

        api.post('/usuarios', usuario, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false })
                }
            })
            .catch((resposta) => console.log(resposta),
                this.setState({ isLoading: false })
            )
            .then(() => {
                api.get(`/usuarios/email/${this.state.email}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-token'),
                    },
                }).then((reposta) => {
                    this.setState({ idUsuario: reposta.data.idUsuario })
                    console.log(this.state.idUsuario)
                    this.enviarArquivo()
                })
            })
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log([campo.target.name] + ' : ' + campo.target.value)
    }

    enviarArquivo = () => {
        console.log('envio');
        if (this.state.arquivo !== '' && this.state.arquivo !== null) {
            const formData = new FormData();

            formData.append(
                'foto',
                this.state.arquivo,
            );

            api.post(`/Imagens/${this.state.idUsuario}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
                },
            })
                .then(console.log('Upload Realizado'))
                .catch((erro) => console.log(erro))
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    limparCampos = () => {
        this.setState({
            nomeUsuario: '',
            rg: '',
            email: '',
            senha: '',
            Imagem: '',
            arquivo: '',
            base64img: '',
        })
    };

    render() {
        return (
            <>
                <Header />

                <div className="container_titulo">
                    <div className="color">
                        <h1>Cadastro</h1>
                    </div>
                </div>
                <div className="fundo3">
                    <form onSubmit={this.cadastrarUsuario}>
                        <div className="box-cadastro">
                            <div className="box-cadastro-inputs" >
                                <input
                                    className="input-cadastro"
                                    name='nomeUsuario'
                                    onChange={this.atualizaStateCampo}
                                    value={this.state.nomeUsuario}
                                    placeholder='Nome'
                                    type="text" />

                                <input
                                    className="input-cadastro"
                                    name='rg'
                                    onChange={this.atualizaStateCampo}
                                    value={this.state.rg}
                                    placeholder='RG'
                                    type="text" />

                                <input
                                    className="input-cadastro"
                                    name='email'
                                    onChange={this.atualizaStateCampo}
                                    value={this.state.email}
                                    placeholder='Email'
                                    type="text" />

                                <input
                                    className="input-cadastro"
                                    name='senha'
                                    onChange={this.atualizaStateCampo}
                                    value={this.state.senha} placeholder='Senha'
                                    type="password" />

                                <input
                                    className="input-cadastro"
                                    name='arquivo'
                                    onChange={this.atualizaStateCampo}
                                    value={this.state.arquivo}
                                    placeholder='Selecione a Imagem'
                                    type="file" />

                            </div>
                            <div className="box-cadastro-imagem">
                                <img className="box-cadastro-img" src={user} alt="" />
                                <button type='submit' className="botao-cadastro">Cadastrar</button>
                                <span></span>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
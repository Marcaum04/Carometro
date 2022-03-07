import React, { Component } from 'react';
import Header from '../../components/header/header';
import api from '../../services/api';
import '../../assets/css/Listar.css'

export default class Listar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaAlunos: [],
            base64img: '',
            perido: ''
        };
    }

    buscarDados() {

        api.get('/alunos/viewmodel', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaAlunos: resposta.data });
                }
            })
            .catch(erro => console.log(erro));
    };

    componentDidMount() {
        this.buscarDados();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container containerListar">
                    <h1>Carômetro</h1>

                    {
                        this.state.listaAlunos.map((itens) => {
                            return (
                                <div key={itens.idAluno}>
                                    <section className="card-aluno" >
                                        <img className="card-aluno-imagem" src={`data:image;base64,${itens.imagem}`} alt="" />
                                        <div className="card-aluno-box-texto">
                                            <h2>{itens.nomeAluno}</h2>
                                            <div>
                                                <p className="card-aluno-texto">{itens.turma}</p>
                                                <p className="card-aluno-texto">{itens.periodo}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )
                        })
                    }
                </div>
            </div >

        );
    }
}

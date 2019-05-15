import React, { Component } from 'react';
import { Form, Button, Alert } from 'reactstrap';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import Categoria from '../Componentes/Categoria';
import SelecionarPaciente from '../Componentes/SelecionarPaciente';
import { setFontesInformacao } from '../state';
import { isEmpty } from 'lodash';
import server from '../server';
import './Avaliacao.css';

class AvaliacaoForm extends Component {
    constructor(props) {
        super(props);
        this.setRespostas = this.setRespostas.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            coreSet: {
                categorias: []
            },
            loading: true,
            temPaciente: false,
        };
        this.avaliacao = {
            categorias: [],
            paciente: null
        };
    }

    setRespostas(categoriasRespostas) {
        this.avaliacao.categorias.forEach((c, i) => {
            if (c.categoria === categoriasRespostas.categoria) {
                this.avaliacao.categorias.splice(i, 1);
            }
        });
        this.avaliacao.categorias.push(categoriasRespostas);
    }

    setPaciente = (paciente) => {
        this.avaliacao.paciente = paciente;
        this.setState(state => {
            state.temPaciente = true;
            return state;
        })
    }

    validarCategorias() {
        let todasValidas = true;
        this.state.coreSet.categorias.forEach(categoria => {
            let resposta = this.avaliacao.categorias.find(
                x => x.categoria === categoria.id);
            if (!resposta) {
                todasValidas = false;
            } else {
                if (!resposta.valido) {
                    todasValidas = false;
                }
            }

        });
        return todasValidas;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validarCategorias()) {
            toast.error("Preencha todas as categorias", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        this.toastId = toast.info("Registrando avaliação", {
            autoClose: false,
            position: toast.POSITION.TOP_CENTER
        });
        let msg;
        this.avaliacao.coreSet = this.state.coreSet.id;
        server.post('/avaliar/', this.avaliacao)
            .then(res => {
                msg = "Avaliação registrada com sucesso!"
                toast.update(this.toastId, {
                    render: msg,
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
                let id = res.data.avaliacao.id;
                let path = "/avaliacoes/" + id + "/ver/";
                this.props.history.push(path);
            })
            .catch(error => {
                if (!error.response.data) {
                    msg = "Ocorreu um erro interno."
                } else {
                    if (Array.isArray(error.response.data)) {
                        error.response.data.forEach((data, key) => {
                            msg = data + '\n';
                        });
                    } else {
                        msg = error.response.data['detail'];
                    }
                }

                toast.update(this.toastId, {
                    render: msg,
                    type: toast.TYPE.ERROR,
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    componentDidMount() {
        server.get('/core-sets/1/')
            .then(res => {
                this.setState(state => {
                    state.coreSet = res.data;
                    state.loading = false;
                    return state;
                });
            }).catch(err => {
                switch (err.response.status) {
                    case 401:
                        toast.error("Ação permitida apenas para usuários logados.", {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER
                        });
                        break;

                    default:
                        toast.error("Ocorreu um erro interno. Tente novamente mais tarde.", {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER
                        });
                        break;
                }
                this.setState(state => {
                    state.loading = false;
                    return state;
                });
            });
        server.get('/fontes-informacao')
            .then(res => {
                setFontesInformacao(res.data);
            })
    }

    render() {
        return (
            <div>
                <h2>Nova Avaliação</h2>
                <Loading loading={this.state.loading} />
                {!this.state.loading ? (
                    <Form onSubmit={this.handleSubmit}>
                        {!this.state.temPaciente ? (
                            <SelecionarPaciente onChange={this.setPaciente} />
                        ) : (
                                !isEmpty(this.state.coreSet.categorias) ? (
                                    <div>
                                        <SelecionarPaciente disabled={true} value={this.avaliacao.paciente} />
                                        {this.state.coreSet.categorias.map((categoria, i) => {
                                            return (
                                                <Categoria
                                                    key={i}
                                                    dados={categoria}
                                                    onResponder={this.setRespostas} />
                                            );
                                        })}
                                        <Button
                                            type="submit"
                                            className="submitButton"
                                            color="primary">Concluir</Button>
                                    </div>
                                ) : (
                                        <Alert color="info">Nenhuma categoria encontrada</Alert>
                                    ))}
                    </Form>
                ) : null}
            </div>
        );
    }
}

export default AvaliacaoForm;
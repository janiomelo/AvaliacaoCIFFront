import React, { Component } from 'react';
import {
    Form, Button
} from 'reactstrap';
import axios from 'axios';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import Categoria from '../Componentes/Categoria';
import url from '../server';
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
        };
        this.avaliacao = {
            categorias: []
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
        axios.post(url + '/avaliar/', this.avaliacao)
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
        axios.get(url + '/core-sets/1/')
            .then(res => {
                this.setState(state => ({
                    coreSet: res.data,
                    loading: false
                }));
            })
    }

    render() {
        return (
            <div>
                <h2>Nova Avaliação</h2>
                <Loading loading={this.state.loading} />
                <Form onSubmit={this.handleSubmit}>
                    {this.state.coreSet.categorias ? (
                        this.state.coreSet.categorias.map((categoria, i) => {
                            return (
                                <Categoria
                                    key={i}
                                    dados={categoria}
                                    onResponder={this.setRespostas} />
                            );
                        })
                    ) : null}
                    <div style={{ display: this.state.loading ? 'none' : 'block' }}>
                        <Button
                            type="submit"
                            className="submitButton"
                            color="primary">Concluir</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AvaliacaoForm;
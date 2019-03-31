import React, { Component } from 'react';
import {
    Form, Button
} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Categoria from '../Componentes/Categoria';
import './Avaliacao.css';

class AvaliacaoForm extends Component {
    constructor(props) {
        super(props);
        this.setRespostas = this.setRespostas.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            categorias: []
        };
        this.avaliacao = {
            respostas: []
        };
    }

    setRespostas(respostas) {
        this.avaliacao.respostas.forEach((r, i) => {
            if (r.categoria === respostas.categoria) {
                this.avaliacao.respostas.splice(i, 1);
            }
        });
        this.avaliacao.respostas.push(respostas);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.toastId = toast.info("Registrando avaliação", {
            autoClose: false,
            position: toast.POSITION.TOP_CENTER
        });
        let msg;
        this.avaliacao.coreSet = this.state.id;
        axios.post('http://127.0.0.1:8000/avaliar/', this.avaliacao)
            .then(res => {
                msg = "Avaliação registrada com sucesso!"
                toast.update(this.toastId, {
                    render: msg,
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
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
        axios.get('http://127.0.0.1:8000/core-sets/1/')
            .then(res => {
                this.setState(res.data);
            })
    }

    render() {
        return (
            <div>
                <h2>Nova Avaliação</h2>
                <Form onSubmit={this.handleSubmit}>
                    {this.state.categorias ? (
                        this.state.categorias.map((categoria, i) => {
                            return (
                                <Categoria
                                    key={i}
                                    dados={categoria}
                                    onResponder={this.setRespostas} />
                            );
                        })
                    ) : null}
                    <div>
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
import React, { Component } from 'react';
import {
    Card, Button, CardBody, CardTitle, CardText, Row, Col,
    Alert, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './Componentes/Loading';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import server from './server';

export class MeuPerfil extends Component {
    state = {
        dados: {}
    }
    componentDidMount() {
        server.get('/usuario/').then(response => {
            this.setState(state => {
                state.dados = response.data;
                state.dados.nome = state.dados.first_name + " " + state.dados.last_name;
                return state;
            })
        })
    }
    onChange = (e) => {
        let newDados = this.state.dados;
        newDados[e.target.name] = e.target.value;
        this.setState(state => {
            state.dados = newDados;
            return state;
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let dados = this.state.dados;
        dados['first_name'] = this.state.dados.nome.split(' ')[0]
        dados['last_name'] = this.state.dados.nome.split(' ')[1]
        server.post("/atualizar-usuario/", dados)
            .then(response => {
                if (response.data.id) {
                    toast.update(this.toastId, {
                        render: "Dados atualizados com sucesso!",
                        type: toast.TYPE.SUCCESS,
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    toast.update(this.toastId, {
                        render: "Ocorreu um erro interno.",
                        type: toast.TYPE.ERROR,
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            })
            .catch(error => {
                let msg;
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
    render() {
        return <section>
            <header>
                <Link to="/">Home</Link>{" / Meu Perfil"}
            </header>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Nome:</Label>
                    <Input name="nome" defaultValue={this.state.dados.nome} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>E-mail:</Label>
                    <Input name="email" defaultValue={this.state.dados.email} onChange={this.onChange} />
                </FormGroup>
                <Button color="primary" type="submit" className="submitButton">Salvar Alterações</Button>
            </Form>
        </section>
    }
}

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {
    Form, Input, FormGroup, Label, Button, Row, Col
} from 'reactstrap';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { setUsuario } from '../state';
import server from '../server';
import auth from '../auth';

export const verificaLogin = () => {
    if (auth.possuiToken()) {
        server.get("/usuario").then(response => {
            if (isEmpty(response.data)) return;
            setUsuario(response.data);
        }).catch(err => {
            setUsuario({});
        })
    }
}


export class CadastrarForm extends Component {
    state = {
        loading: false,
        dados: {}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(() => ({
            loading: true,
        }))
        server.post("/novo-usuario/", this.state.dados).then(response => {
            if (isEmpty(response.data)) return toast.error("Impossível realizar cadastro. Tente novamente.");
            toast.update(this.toastId, {
                render: "Cadastro realizado com sucesso! Entre com seu login e senha",
                type: toast.TYPE.SUCCESS,
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            this.props.history.push("/login");
        }).catch(err => {
            for (var key in err.response.data) {
                let msg = "";
                err.response.data[key].forEach(v => {
                    msg += v + " "
                });

                if (key !== "non_field_errors") {
                    msg = key + ": " + msg;
                }
                toast.error(msg);
            }
            this.setState(() => ({
                loading: false,
            }))
        })
    }

    onChange = (e) => {
        let newDados = this.state.dados;
        newDados[e.target.name] = e.target.value;
        this.setState(state => {
            state.dadosLogin = newDados;
            return state;
        })
    }

    render() {
        return (
            <Row>
                <Col sm={{ size: 4, offset: 4 }}>
                    <h2>Digite seus dados</h2>
                    <Loading loading={this.state.loading} />
                    {!this.state.loading ? (
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Nome</Label>
                                <Input type="text" name="nome" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>E-mail</Label>
                                <Input type="email" name="email" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Senha</Label>
                                <Input type="password" name="password" onChange={this.onChange} />
                            </FormGroup>
                            <Button size="sm" className="float-right" color="primary" type="submit">Cadastrar</Button>
                        </Form>
                    ) : null}
                </Col>
            </Row>
        );
    }
}

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading: false,
            dadosLogin: {}
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(() => ({
            loading: true,
        }))
        server.post("/api-token-auth/", this.state.dadosLogin).then(response => {
            if (isEmpty(response.data)) return toast.error("Impossível realizar login. Tente novamente.");
            auth.authenticate(response.data.token);
            this.props.history.push("/");
            window.location.reload();
        }).catch(err => {
            for (var key in err.response.data) {
                let msg = "";
                err.response.data[key].forEach(v => {
                    msg += v + " "
                });

                if (key !== "non_field_errors") {
                    msg = key + ": " + msg;
                }
                toast.error(msg);
            }
            this.setState(() => ({
                loading: false,
            }))
        })
    }

    onChange = (e) => {
        let newDadosLogin = this.state.dadosLogin;
        newDadosLogin[e.target.name] = e.target.value;
        this.setState(state => {
            state.dadosLogin = newDadosLogin;
            return state;
        })
    }

    render() {
        return (
            <Row>
                <Col sm={{ size: 4, offset: 4 }}>
                    <h2>Entre com suas credenciais</h2>
                    <Loading loading={this.state.loading} />
                    {!this.state.loading ? (
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Usuário</Label>
                                <Input type="text" name="username" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Senha</Label>
                                <Input type="password" name="password" onChange={this.onChange} />
                            </FormGroup>
                            <Button size="sm" color="primary" type="submit">Entrar</Button>
                            <Button size="sm" className="float-right" onClick={() => { this.props.history.push("/cadastre-se") }}>Cadastre-se</Button>
                        </Form>
                    ) : null}
                </Col>
            </Row>
        );
    }
}
import React, { Component } from 'react';
import {
    Card, Button, CardBody, CardTitle, CardText, Row, Col,
    Alert, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import server from '../server';

export class PacienteEdit extends Component {
    state = {
        paciente: {}
    }
    componentDidMount() {
        const { id } = this.props.match.params
        server.get('/pacientes/' + id).then(response => {
            this.setState(state => {
                state.paciente = response.data;
                return state;
            })
        })
    }
    onChange = (e) => {
        let newPaciente = this.state.paciente;
        newPaciente[e.target.name] = e.target.value;
        this.setState(state => {
            state.paciente = newPaciente;
            return state;
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { id } = this.props.match.params
        server.put("/pacientes/" + id + "/", this.state.paciente)
            .then(response => {
                toast.update(this.toastId, {
                    render: "Paciente registrado com sucesso!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
                let id = response.data.id;
                let path = "/pacientes/" + id + "/ver/";
                this.props.history.push(path);
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
                <Link to="/">Home</Link>{" / "}
                <Link to="/pacientes">Pacientes</Link>{` / Paciente: ${this.state.paciente.nome}`}
            </header>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Nome:</Label>
                    <Input name="nome" defaultValue={this.state.paciente.nome} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>E-mail:</Label>
                    <Input name="email" defaultValue={this.state.paciente.email} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>CPF:</Label>
                    <Input name="cpf" defaultValue={this.state.paciente.cpf} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Data de Nascimento:</Label>
                    <Input name="nascimento" type="date" defaultValue={this.state.paciente.nascimento} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Sexo:</Label>
                    <Input name="sexo" type="select" value={this.state.paciente.sexo} onChange={this.onChange}>
                        <option value="">-- Selecione --</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Telefone:</Label>
                    <Input name="telefone" defaultValue={this.state.paciente.telefone} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço:</Label>
                    <Input name="endereco" defaultValue={this.state.paciente.endereco} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Bairro:</Label>
                    <Input name="bairro" defaultValue={this.state.paciente.bairro} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Cidade:</Label>
                    <Input name="cidade" defaultValue={this.state.paciente.cidade} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Estado:</Label>
                    <Input name="estado" type="select" value={this.state.paciente.estado} onChange={this.onChange} >
                        <option value="">-- Selecione --</option>
                        <option value='AC'>Acre</option>
                        <option value='AL'>Alagoas</option>
                        <option value='AP'>Amapá</option>
                        <option value='AM'>Amazonas</option>
                        <option value='BA'>Bahia</option>
                        <option value='CE'>Ceará</option>
                        <option value='DF'>Distrito Federal</option>
                        <option value='ES'>Espírito Santo</option>
                        <option value='GO'>Goiás</option>
                        <option value='MA'>Maranhão</option>
                        <option value='MT'>Mato Grosso</option>
                        <option value='MS'>Mato Grosso do Sul</option>
                        <option value='MG'>Minas Gerais</option>
                        <option value='PA'>Pará</option>
                        <option value='PB'>Paraíba</option>
                        <option value='PR'>Paraná</option>
                        <option value='PE'>Pernambuco</option>
                        <option value='PI'>Piauí</option>
                        <option value='RJ'>Rio de Janeiro</option>
                        <option value='RN'>Rio Grande do Norte</option>
                        <option value='RS'>Rio Grande do Sul (*)</option>
                        <option value='RO'>Rondônia</option>
                        <option value='RR'>Roraima</option>
                        <option value='SC'>Santa Catarina</option>
                        <option value='SP'>São Paulo</option>
                        <option value='SE'>Sergipe</option>
                        <option value='TO'>Tocantins</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Observações:</Label>
                    <Input name="observacoes" type="textarea" value={this.state.paciente.observacoes} onChange={this.onChange} />
                </FormGroup>
                <Button color="primary" type="submit" className="submitButton">Salvar Alterações</Button>
            </Form>
        </section>
    }
}

export class PacienteAdd extends Component {
    state = {
        paciente: {}
    }
    onChange = (e) => {
        let newPaciente = this.state.paciente;
        newPaciente[e.target.name] = e.target.value;
        this.setState(state => {
            state.paciente = newPaciente;
            return state;
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { id } = this.props.match.params
        server.post("/pacientes/", this.state.paciente)
            .then(response => {
                toast.update(this.toastId, {
                    render: "Paciente criado com sucesso!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
                let id = response.data.id;
                if (id) {
                    let path = "/pacientes/" + id + "/ver/";
                    this.props.history.push(path);
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
                <Link to="/">Home</Link>{" / "}
                <Link to="/pacientes">Pacientes</Link>{" / Novo Paciente"}
            </header>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Nome:</Label>
                    <Input name="nome" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>E-mail:</Label>
                    <Input name="email" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>CPF:</Label>
                    <Input name="cpf" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Data de Nascimento:</Label>
                    <Input name="nascimento" type="date" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Sexo:</Label>
                    <Input name="sexo" type="select" onChange={this.onChange}>
                        <option value="">-- Selecione --</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Telefone:</Label>
                    <Input name="telefone" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço:</Label>
                    <Input name="endereco" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Bairro:</Label>
                    <Input name="bairro" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Cidade:</Label>
                    <Input name="cidade" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Estado:</Label>
                    <Input name="estado" type="select" onChange={this.onChange} >
                        <option value="">-- Selecione --</option>
                        <option value='AC'>Acre</option>
                        <option value='AL'>Alagoas</option>
                        <option value='AP'>Amapá</option>
                        <option value='AM'>Amazonas</option>
                        <option value='BA'>Bahia</option>
                        <option value='CE'>Ceará</option>
                        <option value='DF'>Distrito Federal</option>
                        <option value='ES'>Espírito Santo</option>
                        <option value='GO'>Goiás</option>
                        <option value='MA'>Maranhão</option>
                        <option value='MT'>Mato Grosso</option>
                        <option value='MS'>Mato Grosso do Sul</option>
                        <option value='MG'>Minas Gerais</option>
                        <option value='PA'>Pará</option>
                        <option value='PB'>Paraíba</option>
                        <option value='PR'>Paraná</option>
                        <option value='PE'>Pernambuco</option>
                        <option value='PI'>Piauí</option>
                        <option value='RJ'>Rio de Janeiro</option>
                        <option value='RN'>Rio Grande do Norte</option>
                        <option value='RS'>Rio Grande do Sul (*)</option>
                        <option value='RO'>Rondônia</option>
                        <option value='RR'>Roraima</option>
                        <option value='SC'>Santa Catarina</option>
                        <option value='SP'>São Paulo</option>
                        <option value='SE'>Sergipe</option>
                        <option value='TO'>Tocantins</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Observações:</Label>
                    <Input name="observacoes" type="textarea" onChange={this.onChange} />
                </FormGroup>
                <Button color="primary" type="submit" className="submitButton">Salvar Paciente</Button>
            </Form>
        </section>
    }
}

export class PacienteList extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        server.get('/pacientes/')
            .then(res => {
                this.setState(state => ({
                    pacientes: res.data,
                    loading: false
                }));
            }).catch(err => {
                if (err.response.data instanceof String) toast.error("Ocorreu um erro interno. Tente novamente mais tarde.");
                for (var key in err.response.data) {
                    let msg = "";
                    if (Array.isArray(err.response.data[key])) {
                        err.response.data[key].forEach(v => {
                            msg += v + " "
                        });
                    } else {
                        msg = err.response.data[key];
                    }
                    if (key !== "non_field_errors" && key !== "detail") {
                        msg = key + ": " + msg;
                    }
                    toast.error(msg);
                }
                this.setState(state => {
                    state.loading = false;
                    return state;
                });
            })
    }

    routeChange(event) {
        let id = event.target.attributes.getNamedItem('data-id').value;
        let path = "/pacientes/" + id + "/ver/";
        this.props.history.push(path);
    }

    render() {
        return (
            <section>
                <header>
                    <Link to="/">Home</Link>{" / Pacientes"}
                </header>
                <div className="clearfix">
                    <Button size="sm" className="float-right" onClick={() => { this.props.history.push("/pacientes/novo") }}>
                        Novo Paciente
                </Button>
                </div>
                <Loading loading={this.state.loading} />
                {!this.state.loading ? (!isEmpty(this.state.pacientes) ? (
                    this.state.pacientes.map((paciente, i) => {
                        return (
                            <Card className="avaliacaoCardList" key={i}>
                                <CardBody>
                                    <Row>
                                        <Col sm="11">
                                            <CardTitle>
                                                Paciente: {paciente.nome}
                                            </CardTitle>
                                            <CardText>

                                            </CardText>
                                        </Col>
                                        <Col sm="1">
                                            <Button
                                                size="sm"
                                                data-id={paciente.id}
                                                onClick={this.routeChange}
                                                className="verButton">Ver</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        );
                    })
                ) : (
                        <Alert color="info">Nenhum paciente encontrado</Alert>
                    )) : null}
            </section>
        );
    }
}
import React, { Component } from 'react';
import {
    Card, Button, CardBody, CardTitle, CardText, Row, Col,
    Alert
} from 'reactstrap';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import server from '../server';

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
            <div>
                <h2>Pacientes</h2>
                <Loading loading={this.state.loading} />
                {!isEmpty(this.state.pacientes) ? (
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
                    )}
            </div>
        );
    }
}
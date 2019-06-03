import React, { Component } from 'react';
import {
    Card, Button, CardBody, CardTitle, CardText, Row, Col,
    Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { isEmpty } from 'lodash';
import server from '../server';
import './Avaliacao.css';

class AvaliacaoList extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        server.get('/avaliacoes/')
            .then(res => {
                this.setState(state => ({
                    avaliacoes: res.data,
                    loading: false
                }));
            }).catch(err => {
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
        let path = "/avaliacoes/" + id + "/ver/";
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <header>
                    <Link to="/">Home</Link>{" / Avaliações"}
                </header>
                <Loading loading={this.state.loading} />
                {!this.state.loading ? (!isEmpty(this.state.avaliacoes) ? (
                    this.state.avaliacoes.map((avaliacao, i) => {
                        return (
                            <Card className="avaliacaoCardList" key={i}>
                                <CardBody>
                                    <Row>
                                        <Col sm="11">
                                            <CardTitle>
                                                Paciente: {avaliacao.paciente.nome}
                                            </CardTitle>
                                            <CardText>
                                                Avaliação realizada dia {' '}
                                                <Moment format="DD/MM/YYYY HH:mm">
                                                    {avaliacao.data}
                                                </Moment>
                                            </CardText>
                                        </Col>
                                        <Col sm="1">
                                            <Button
                                                data-id={avaliacao.id}
                                                onClick={this.routeChange}
                                                className="verButton">Ver</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        );
                    })
                ) : (
                        <Alert color="info">Nenhuma avaliação encontrada</Alert>
                    )) : null}
            </div>
        );
    }
}

export default AvaliacaoList;
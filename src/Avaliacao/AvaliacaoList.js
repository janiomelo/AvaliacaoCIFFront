import React, { Component } from 'react';
import {
    Card, Button, CardBody, CardTitle, CardText, Row, Col
} from 'reactstrap';
import axios from 'axios';
import Moment from 'react-moment';
import url from '../server';
import './Avaliacao.css';

class AvaliacaoList extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {};
    }

    componentDidMount() {
        axios.get(url + '/avaliacoes/')
            .then(res => {
                this.setState(state => ({
                    avaliacoes: res.data
                }));
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
                <h2>Avaliações</h2>
                {this.state.avaliacoes ? (
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
                ) : null}
            </div>
        );
    }
}

export default AvaliacaoList;
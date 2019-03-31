import React, { Component } from 'react';
import {
    CardHeader, Col, Row, Container, Button
} from 'reactstrap';
import Moment from 'react-moment';
import './Avaliacao.css';

class AvaliacaoHeader extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {};
    }
    routeChange = () => {
        let path = "/avaliacoes/";
        this.props.history.push(path);
    }
    render() {
        return (
            <CardHeader className="avaliacaoHeader">
                <Container fluid>
                    <Row>
                        <Col lg="10">
                            <p>
                                Paciente: {this.props.avaliacao.paciente.nome}
                            </p>
                            <p>
                                Terapeuta: {this.props.avaliacao.terapeuta.nome}
                            </p>
                            <p>
                                Data: {' '}
                                <Moment format="DD/MM/YYYY">
                                    {this.props.avaliacao.data}
                                </Moment>
                            </p>
                        </Col>
                        <Col lg="2">
                            <Button
                                onClick={this.routeChange}
                                className="verButton">Voltar</Button>
                        </Col>
                    </Row>
                </Container>
            </CardHeader>
        );
    }
}

export default AvaliacaoHeader;
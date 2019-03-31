import React, { Component } from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import AvaliacaoQualiGrafico from './AvaliacaoQualiGrafico';
import './Avaliacao.css';

class AvaliacaoQualificador extends Component {
    render() {
        return (
            <Container fluid>
                {this.props.qualificadores ? (
                    this.props.qualificadores.map((respQuali, k) => {
                        return (
                            <Row key={k} className="align-items-center">
                                <Col lg="5">
                                    {respQuali.qualificador.descricao}
                                </Col>
                                <Col lg="7">
                                    <AvaliacaoQualiGrafico
                                        classificacoes={this.props.classificacoes}
                                        nivel={respQuali.classificacao.nivel} />
                                </Col>
                            </Row>
                        );
                    })
                ) : null}
            </Container>
        );
    }
}

export default AvaliacaoQualificador;
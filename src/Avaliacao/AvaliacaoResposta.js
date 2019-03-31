import React, { Component } from 'react';
import {
    Row, Col, Container
} from 'reactstrap';
import AvaliacaoQualificador from './AvaliacaoQualificador';
import './Avaliacao.css';

class AvaliacaoResposta extends Component {
    render() {
        return (
            <Container fluid>
                {this.props.respostas ? (
                    this.props.respostas.map((resposta, j) => {
                        return (
                            <Row className="avaliacaoResposta align-items-center" key={j}>
                                <Col lg="8">
                                    {resposta.pergunta.codigo}
                                    {' - '}
                                    {resposta.pergunta.titulo}
                                </Col>
                                <Col lg="4">
                                    <AvaliacaoQualificador
                                        classificacoes={this.props.classificacoes}
                                        qualificadores={resposta.qualificadores} />
                                </Col>
                            </Row>
                        );
                    })
                ) : null}
            </Container>
        );
    }
}

export default AvaliacaoResposta;
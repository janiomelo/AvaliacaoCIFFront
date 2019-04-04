import React, { Component } from 'react';
import {
    FormGroup, Label, Input, FormText, Row, Col
} from 'reactstrap';
import Qualificador from '../Qualificador';
import FonteInformacao from '../FonteInformacao';
import './Pergunta.css';

const TituloPergunta = (props) => <span>{props.pergunta.codigo} - {props.pergunta.titulo}</span>;

class Pergunta extends Component {
    constructor(props) {
        super(props);
        this.changeQualificador = this.changeQualificador.bind(this);
        this.changeFonteInformacao = this.changeFonteInformacao.bind(this);
        this.changeDescricao = this.changeDescricao.bind(this);
        this.resposta = {
            pergunta: this.props.dados.id,
            qualificadores: [],
            fonteInformacao: null,
            descricao: null
        };
    }

    setResposta(resposta) {
        this.resposta = resposta;
        this.props.onResponder(resposta);
    }

    setQualificador(obj) {
        let respostaTemp = this.resposta;
        respostaTemp.qualificadores.forEach((q, i) => {
            if (q.qualificador === obj.qualificador) {
                respostaTemp.qualificadores.splice(i, 1);
            }
        });
        respostaTemp.qualificadores.push(obj);
        this.setResposta(respostaTemp);
    }

    changeQualificador(selecionado) {
        this.setQualificador(selecionado);
    }

    changeDescricao(event) {
        let resposta = this.resposta;
        resposta.descricao = event.target.value;
        this.setResposta(resposta);
    }

    changeFonteInformacao(selecionado) {
        let respostaTemp = this.resposta;
        respostaTemp.fonteInformacao = selecionado;
        this.setResposta(respostaTemp);
    }

    render() {
        const { descricao, id } = this.props.dados;
        return (
            <FormGroup tag="fieldset">
                <legend>
                    <TituloPergunta pergunta={this.props.dados} />
                </legend>
                <FormText>
                    <div dangerouslySetInnerHTML={{ __html: descricao }} />
                </FormText>
                <Row className="qualificadores">
                    <Col lg={{ size: 7, offset: 5 }}>
                        {this.props.qualificadores ? (
                            this.props.qualificadores.map((qualificador, i) => {
                                return (
                                    <Qualificador
                                        key={i}
                                        dados={qualificador}
                                        perguntaId={id}
                                        classificacoes={this.props.classificacoes}
                                        onChange={this.changeQualificador} />
                                )
                            })
                        ) : null}
                    </Col>
                </Row>
                <FonteInformacao perguntaId={id} onChange={this.changeFonteInformacao} />
                <FormGroup>
                    <Label>Descrição do problema</Label>
                    <Input
                        type="textarea"
                        name="text"
                        id="descricao"
                        onChange={this.changeDescricao} />
                </FormGroup>
            </FormGroup>
        );
    }
}

export default Pergunta;
import React, { Component } from 'react';
import {
    FormGroup, Label, Input, FormText
} from 'reactstrap';
import Qualificador from '../Qualificador';
import FonteInformacao from '../FonteInformacao';
import './Pergunta.css';


class Pergunta extends Component {
    constructor(props) {
        super(props);
        this.changeQualificador = this.changeQualificador.bind(this);
        this.changeFonteInformacao = this.changeFonteInformacao.bind(this);
        this.resposta = {
            pergunta: this.props.dados.id,
            qualificadores: [],
            fonteInformacao: null
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
                respostaTemp.qualificadores.slice(i, 1);
            }
        });
        respostaTemp.qualificadores.push(obj);
        this.setResposta(respostaTemp);
    }

    changeQualificador(selecionado) {
        this.setQualificador(selecionado);
    }

    changeFonteInformacao(selecionado) {
        let respostaTemp = this.resposta;
        respostaTemp.fonteInformacao = selecionado;
        this.setResposta(respostaTemp);
    }

    render() {
        const { titulo, descricao, id } = this.props.dados;
        return (
            <FormGroup tag="fieldset">
                <legend>{titulo}</legend>
                <FormText>{descricao}</FormText>
                <div className="qualificadores offset-md-3 col-md-9">
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
                </div>
                <FonteInformacao perguntaId={id} onChange={this.changeFonteInformacao} />
                <FormGroup>
                    <Label>Comentário</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
            </FormGroup>
        );
    }
}

export default Pergunta;
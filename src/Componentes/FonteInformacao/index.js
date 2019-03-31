import React, { Component } from 'react';
import {
    CustomInput
} from 'reactstrap';
import axios from 'axios';
import './FonteInformacao.css';


class RadioInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { descricao, id } = this.props.dados;
        let pergunta = this.props.pergunta;
        const inputId = "fonte-informacao-" + pergunta + "-" + descricao;
        const name = "classificacao-" + pergunta;
        return (
            <CustomInput
                className="float-left"
                type="radio"
                id={inputId}
                value={id}
                name={name}
                label={descricao}
                onChange={this.props.onChange} />
        );
    }
}

class FonteInformacao extends Component {
    constructor(props) {
        super(props);
        this.changeRadioInput = this.changeRadioInput.bind(this);
        this.state = {};
    }

    changeRadioInput(event) {
        this.props.onChange(event.target.value);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/fontes-informacao')
            .then(res => {
                this.setState(state => ({
                    fontesInformacao: res.data
                }));
            })
    }
    render() {
        const { perguntaId } = this.props;
        return (
            <div className="fontesInformacao bg-light clearfix">
                <span className="labelFonteInformacao">
                    Fonte da Informação
                </span>
                <div className="clearfix">
                    {this.state.fontesInformacao ? (
                        this.state.fontesInformacao.map((fonte, i) => {
                            return (
                                <RadioInput
                                    key={i}
                                    dados={fonte}
                                    pergunta={perguntaId}
                                    onChange={this.changeRadioInput} />
                            );
                        })
                    ) : null}
                </div>
            </div>
        );
    }
}

export default FonteInformacao;
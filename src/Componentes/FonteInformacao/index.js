import React, { Component } from 'react';
import {
    CustomInput
} from 'reactstrap';
import server from '../../server';
import { useGlobalState } from '../../state';
import { isEmpty } from 'lodash';
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
const Fontes = (props) => {
    const [value] = useGlobalState('fontesInformacao');
    return (
        <div className="clearfix">
            {value ? (
                value.map((fonte, i) => {
                    return (
                        <RadioInput
                            key={i}
                            dados={fonte}
                            pergunta={props.perguntaId}
                            onChange={props.onChange} />
                    );
                })
            ) : null}
        </div>
    )
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

    render() {
        const { perguntaId } = this.props;
        return (
            <div className="fontesInformacao bg-light clearfix">
                <span className="labelFonteInformacao">
                    Fonte da Informação
                </span>
                <Fontes perguntaId={perguntaId} onChange={this.changeRadioInput} />
            </div>
        );
    }
}

export default FonteInformacao;
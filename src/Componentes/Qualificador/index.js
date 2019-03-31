import React, { Component } from 'react';
import {
    CustomInput, Tooltip
} from 'reactstrap';
import './Qualificador.css';


class Classificacao extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        const { nivel, descricao, id } = this.props.dados;
        let qualificador = this.props.qualificador;
        let pergunta = this.props.pergunta;
        const inputId = "classificacao-" + pergunta + "-" + qualificador + "-" + nivel;
        const name = "classificacao-" + pergunta + "-" + qualificador;
        return (
            <div>
                <CustomInput
                    className="float-left text-dark"
                    type="radio"
                    id={inputId}
                    name={name}
                    value={id}
                    label={nivel}
                    onChange={this.props.onChange} />
                <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipOpen}
                    autohide={false}
                    target={inputId}
                    toggle={this.toggle}>
                    {descricao}
                </Tooltip>
            </div>
        );
    }
}

class Qualificador extends Component {
    constructor(props) {
        super(props);
        this.changeClassificacao = this.changeClassificacao.bind(this);
        this.state = {
            qualificador: null,
            classificacao: null,
        };
    }

    changeClassificacao(event) {
        this.props.onChange({
            qualificador: this.props.dados.id,
            classificacao: event.target.value
        });
    }

    render() {
        const { descricao, id } = this.props.dados;
        return (
            <div className="checkGroup bg-secondary clearfix">
                <span className="text-dark descricaoQualificador">
                    {descricao}
                </span>
                <div className="clearfix">
                    {this.props.classificacoes ? (
                        this.props.classificacoes.map((classificacao, i) => {
                            return (
                                <Classificacao
                                    key={i}
                                    dados={classificacao}
                                    qualificador={id}
                                    pergunta={this.props.perguntaId}
                                    onChange={this.changeClassificacao} />
                            )
                        })
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Qualificador;
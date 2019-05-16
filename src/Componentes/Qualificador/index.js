import React, { Component } from 'react';
import {
    CustomInput, Tooltip, Row, Col
} from 'reactstrap';
import { uniqueId } from 'lodash';
import './Qualificador.css';


class Classificacao extends Component {
    constructor(props) {
        super(props);
        this.idInput = uniqueId('classificacao_');
        this.name = "qualificador_" + this.props.pergunta + "_" + this.props.qualificador;

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
        const { nivel, descricao, prefixo, id } = this.props.dados;
        let nivelExibicao = `${prefixo || ''}${nivel}`
        const idCampo = "id-" + this.idInput;
        return (
            <div id={this.idInput} className="float-left ml-2">
                <CustomInput
                    type="radio"
                    id={idCampo}
                    name={this.name}
                    value={id}
                    label={nivelExibicao}
                    onChange={this.props.onChange} />
                <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipOpen}
                    autohide={false}
                    target={this.idInput}
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
            <Row className="checkGroup bg-secondary mt-2 p-1">
                <Col lg={3} className="text-right">
                    {descricao}
                </Col>
                <Col className="clearfix" lg={9}>
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
                </Col>
            </Row>
        );
    }
}

export default Qualificador;
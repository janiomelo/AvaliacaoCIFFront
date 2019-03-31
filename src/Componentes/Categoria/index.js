import React, { Component } from 'react';
import {
    Collapse, Button, CardBody, Card, CardHeader,
    Tooltip
} from 'reactstrap';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pergunta from '../Pergunta';
import './Categoria.css';

class IconeCompleto extends Component {
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
        const { categoriaId, ok } = this.props;
        const id = "icone-" + categoriaId;
        const icone = ok ? faCheckCircle : faBan;
        const cor = ok ? "green" : "red";
        const texto = ok ? "Categoria preenchida corretamente" :
            "Preencha todas as perguntas";
        return (
            <div>
                <FontAwesomeIcon icon={icone} color={cor} id={id} />
                <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipOpen}
                    autohide={false}
                    target={id}
                    toggle={this.toggle}>
                    {texto}
                </Tooltip>
            </div>
        );
    }
}


const CategoriaButton = (props) => {
    return (
        <Button
            color="light"
            onClick={props.toggleFunction}
            className="categoriaButton">
            <div className="row">
                <div className="col-md-11">
                    {props.label}
                </div>
                <div className="col-md-1">
                    <IconeCompleto categoriaId={props.categoriaId} />
                </div>
            </div>
        </Button>
    );
};

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.respostasCategoria = {
            categoria: this.props.dados.id,
            respostas: []
        };
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    setResposta = (resposta) => {
        this.respostasCategoria.respostas.forEach((p, i) => {
            if (p.pergunta === resposta.pergunta) {
                this.respostasCategoria.respostas.slice(i, 1);
            }
        });
        this.respostasCategoria.respostas.push(resposta);
        this.props.onResponder(this.respostasCategoria);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        const {
            id, titulo, descricao, perguntas, classificacoes, qualificadores
        } = this.props.dados;
        return (
            <div>
                <CategoriaButton
                    categoriaId={id}
                    label={titulo}
                    toggleFunction={this.toggle}
                    ok={false} />
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardHeader>
                            {descricao}
                        </CardHeader>
                        <CardBody>
                            {perguntas ? (
                                perguntas.map((pergunta, i) => {
                                    return (
                                        <Pergunta
                                            key={i}
                                            dados={pergunta}
                                            classificacoes={classificacoes}
                                            qualificadores={qualificadores}
                                            onResponder={this.setResposta} />
                                    )
                                })
                            ) : null}

                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default Categoria;
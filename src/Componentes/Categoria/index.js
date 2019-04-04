import React, { Component } from 'react';
import {
    Collapse, Button, CardBody, Card, CardHeader
} from 'reactstrap';
import IconeCompleto from '../Icone/IconeCompleto';
import IconeAberto from '../Icone/IconeAberto';
import Pergunta from '../Pergunta';
import './Categoria.css';


class CategoriaButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aberto: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(state => ({ aberto: !state.aberto }));
        this.props.toggleFunction();
    }
    render() {
        return (
            <Button
                color="light"
                onClick={this.toggle}
                className="categoriaButton">
                <div className="clearfix">
                    <IconeAberto
                        className="float-left mr-3"
                        aberto={this.state.aberto} />
                    <div className="float-left">
                        {this.props.label}
                    </div>
                    <IconeCompleto
                        className="float-right mr-3"
                        ok={this.props.respostasOk}
                        categoriaId={this.props.categoriaId} />
                </div>
            </Button>
        );
    }
};

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            respostasOk: false
        };
        this.respostasCategoria = {
            categoria: this.props.dados.id,
            valido: false,
            respostas: []
        };
        this.toggle = this.toggle.bind(this);
    }

    setResposta = (resposta) => {
        this.respostasCategoria.respostas.forEach((p, i) => {
            if (p.pergunta === resposta.pergunta) {
                this.respostasCategoria.respostas.splice(i, 1);
            }
        });
        this.respostasCategoria.respostas.push(resposta);
        this.atualizaRespostasOk();
        this.props.onResponder(this.respostasCategoria);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    atualizaRespostasOk() {
        this.respostasCategoria.valido = false;
        let respostasCategoria = this.respostasCategoria.respostas;
        let faltaResposta = false;
        this.props.dados.perguntas.forEach(pergunta => {
            if (!respostasCategoria.find(x => x.pergunta === pergunta.id)) {
                faltaResposta = true;
            }
        });

        let faltaFonte = false;
        respostasCategoria.forEach(resposta => {
            if (!resposta.fonteInformacao) {
                faltaFonte = true;
            }
        });

        let faltaQualificador = false;
        this.props.dados.qualificadores.forEach(qualificador => {
            respostasCategoria.forEach(resposta => {
                if (!resposta.qualificadores.find(x => x.qualificador === qualificador.id)) {
                    faltaQualificador = true;
                }
            })
        })

        if (!faltaResposta && !faltaQualificador && !faltaFonte) {
            this.respostasCategoria.valido = true;
            this.setState(state => ({
                respostasOk: true
            }))
        }
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
                    respostasOk={this.state.respostasOk} />
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardHeader>
                            <small>
                                <div dangerouslySetInnerHTML={{ __html: descricao }} />
                            </small>
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
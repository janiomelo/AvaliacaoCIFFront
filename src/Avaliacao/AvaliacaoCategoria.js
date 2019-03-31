import React, { Component } from 'react';
import AvaliacaoResposta from './AvaliacaoResposta';
import './Avaliacao.css';

class AvaliacaoCategoria extends Component {
    render() {
        return (
            <div>
                {this.props.categorias ? (
                    this.props.categorias.map((categoria, i) => {
                        return (
                            <div className="avaliacaoCategoria" key={i}>
                                <h2 className="text-white bg-secondary">{categoria.titulo}</h2>
                                <AvaliacaoResposta
                                    classificacoes={categoria.classificacoes}
                                    respostas={categoria.respostas} />
                            </div>
                        );
                    })
                ) : null}
            </div>
        );
    }
}

export default AvaliacaoCategoria;
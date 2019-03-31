import React, { Component } from 'react';
import {
    Card, CardBody
} from 'reactstrap';
import axios from 'axios';
import AvaliacaoFooter from './AvaliacaoFooter';
import AvaliacaoCategoria from './AvaliacaoCategoria';
import AvaliacaoHeader from './AvaliacaoHeader';
import './Avaliacao.css';

class AvaliacaoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get('http://127.0.0.1:8000/avaliacoes/' + id)
            .then(res => {
                this.setState(state => ({
                    avaliacao: res.data
                }));
            })
    }

    render() {
        return (
            <div>
                <h2>Detalhes da Avaliação</h2>
                {this.state.avaliacao ? (
                    <Card>
                        <AvaliacaoHeader history={this.props.history} avaliacao={this.state.avaliacao} />
                        <CardBody>
                            <AvaliacaoCategoria categorias={this.state.avaliacao.categorias} />
                        </CardBody>
                        <AvaliacaoFooter avaliacao={this.state.avaliacao} />
                    </Card>
                ) : null}
            </div>
        );
    }
}

export default AvaliacaoDetail;
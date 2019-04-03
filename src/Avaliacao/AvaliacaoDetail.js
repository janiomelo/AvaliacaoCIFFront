import React, { Component } from 'react';
import {
    Card, CardBody
} from 'reactstrap';
import axios from 'axios';
import Loading from '../Componentes/Loading';
import AvaliacaoFooter from './AvaliacaoFooter';
import AvaliacaoCategoria from './AvaliacaoCategoria';
import AvaliacaoHeader from './AvaliacaoHeader';
import url from '../server';
import './Avaliacao.css';

class AvaliacaoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get(url + '/avaliacoes/' + id)
            .then(res => {
                this.setState(state => ({
                    avaliacao: res.data,
                    loading: false
                }));
            })
    }

    render() {
        return (
            <div>
                <h2>Detalhes da Avaliação</h2>
                <Loading loading={this.state.loading} />
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
import React, { Component } from 'react';
import {
    Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Loading from '../Componentes/Loading';
import AvaliacaoFooter from './AvaliacaoFooter';
import AvaliacaoCategoria from './AvaliacaoCategoria';
import AvaliacaoHeader from './AvaliacaoHeader';
import server from '../server';
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
        server.get('/avaliacoes/' + id)
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
                <header>
                    <Link to="/">Home</Link>{" / "}
                    <Link to="/avaliacoes">Avaliações</Link>{" / Detalhes da avaliação"}
                </header>
                <Loading loading={this.state.loading} />
                {!isEmpty(this.state.avaliacao) ? (
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
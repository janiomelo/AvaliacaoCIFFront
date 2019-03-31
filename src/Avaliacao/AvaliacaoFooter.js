import React, { Component } from 'react';
import {
    CardFooter
} from 'reactstrap';
import Moment from 'react-moment';
import './Avaliacao.css';

class AvaliacaoFooter extends Component {
    render() {
        return (
            <CardFooter>
                <small>
                    Registrado dia: {' '}
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                        {this.props.avaliacao.data}
                    </Moment>
                </small>
            </CardFooter>
        );
    }
}

export default AvaliacaoFooter;
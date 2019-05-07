import React, { Component } from 'react';
import {
    Tooltip
} from 'reactstrap';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons/faAngleDoubleUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniqueId } from 'lodash';

class IconeAberto extends Component {
    constructor(props) {
        super(props);
        this.id = uniqueId('classificacao_');
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
        const { aberto } = this.props;
        const icone = aberto ? faAngleDoubleUp : faAngleDoubleDown;
        const texto = aberto ? "Fechar categoria" : "Abrir categoria";
        return (
            <div className={this.props.className}>
                <FontAwesomeIcon icon={icone} id={this.id} />
                <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipOpen}
                    autohide={false}
                    target={this.id}
                    toggle={this.toggle}>
                    {texto}
                </Tooltip>
            </div>
        );
    }
}

export default IconeAberto;
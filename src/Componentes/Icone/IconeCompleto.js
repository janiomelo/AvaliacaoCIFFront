import React, { Component } from 'react';
import {
    Tooltip
} from 'reactstrap';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <div className={this.props.className}>
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

export default IconeCompleto;
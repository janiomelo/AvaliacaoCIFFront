import React, { Component } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import { isEmpty } from 'lodash';
import server from '../../server';

class SelecionarPaciente extends Component {
    state = {
        pacientes: []
    }
    componentDidMount() {
        server.get('/pacientes').then(response => {
            this.setState(state => {
                state.pacientes = response.data;
                return state;
            })
        }).catch(err => {

        });
    }
    onChange = (e) => {
        this.props.onChange(e.target.value);
    }
    render() {
        return (
            <FormGroup>
                <Label>Paciente</Label>
                <Input
                    type="select"
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    value={this.props.value}>
                    <option>Selecione um paciente...</option>
                    {!isEmpty(this.state.pacientes) ? (
                        this.state.pacientes.map((paciente, i) => {
                            return <option key={i} value={paciente.id}>{paciente.nome}</option>
                        })
                    ) : null}
                </Input>
            </FormGroup>
        )
    }
}
export default SelecionarPaciente;
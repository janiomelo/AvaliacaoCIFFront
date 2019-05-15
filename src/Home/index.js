import React, { Component } from 'react';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons/faClipboardList';
import { faListAlt } from '@fortawesome/free-solid-svg-icons/faListAlt';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons/faIdBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { useGlobalState } from '../state';
import { isEmpty } from 'lodash';
import Loading from '../Componentes/Loading';
import './Home.css';

const BotaoAcao = ({ cor, texto, onClick, icon }) => (
    <Button color={cor} onClick={onClick}>
        {icon ? <div><FontAwesomeIcon icon={icon} /></div> : null}
        {texto}
    </Button>
)

const Botoes = ({ onClick }) => {
    const [value] = useGlobalState('usuario');
    return (
        !isEmpty(value) ? (
            <div>
                {value.is_staff ? (
                    <BotaoAcao
                        cor="primary"
                        onClick={() => onClick("/avaliacoes/novo")}
                        texto="Nova avaliação"
                        icon={faClipboardList} />
                ) : null}

                {!value.is_staff ? (
                    <BotaoAcao
                        cor="primary"
                        onClick={() => onClick("/avaliacoes")}
                        texto="Minhas Avaliações"
                        icon={faListAlt} />
                ) : null}

                {value.is_staff ? (
                    <BotaoAcao
                        cor="secondary"
                        onClick={() => onClick("/pacientes")}
                        texto="Pacientes cadastrados"
                        icon={faUsers} />
                ) : null}

                {value.is_staff ? (
                    <BotaoAcao
                        cor="secondary"
                        onClick={() => onClick("/avaliacoes")}
                        texto="Avaliações anteriores"
                        icon={faListAlt} />
                ) : null}

                <BotaoAcao
                    cor="secondary"
                    onClick={() => onClick("/meu-perfil")}
                    texto="Meu perfil"
                    icon={faIdBadge} />
            </div>
        ) : (
                <Loading loading={isEmpty(value)} />
            )
    )
}

class Home extends Component {
    redirectTo = (to) => {
        this.props.history.push(to);
    };
    render() {
        return (
            <div className="home">
                <h2>Home</h2>
                <Botoes onClick={this.redirectTo} />
            </div>
        );
    }
}
export default Home;

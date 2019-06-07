import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Alert } from 'reactstrap';
import Home from './Home';
import { AvaliacaoForm, AvaliacaoList, AvaliacaoDetail } from './Avaliacao';
import { PacienteList, PacienteEdit, PacienteAdd } from './Paciente';
import { MeuPerfil } from './MeuPerfil';
import Navegacao from './Componentes/Navegacao';
import { LoginForm, verificaLogin, CadastrarForm } from './Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import auth from './auth';
import { GlobalStateProvider } from './state';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.possuiToken() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

const NaoImplementado = (props) => {
  return (
    <div>
      <h2>Não disponível</h2>
      <Alert color="warning">Esta funcionalidade ainda não foi implementada.</Alert>
    </div>
  )
}

class App extends Component {
  render() {
    verificaLogin()
    return (
      <GlobalStateProvider>
        <Router>
          <Navegacao />
          <Container fluid>
            <ToastContainer />
            <Route path="/login" component={LoginForm} />
            <Route path="/cadastre-se" component={CadastrarForm} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/avaliacoes/novo" component={AvaliacaoForm} />
            <PrivateRoute exact path="/avaliacoes" component={AvaliacaoList} />
            <PrivateRoute exact path="/avaliacoes/:id/ver" component={AvaliacaoDetail} />
            <PrivateRoute exact path="/pacientes" component={PacienteList} />
            <PrivateRoute exact path="/pacientes/:id/ver" component={PacienteEdit} />
            <PrivateRoute exact path="/pacientes/novo" component={PacienteAdd} />
            <PrivateRoute exact path="/meu-perfil" component={MeuPerfil} />
          </Container>
        </Router>
      </GlobalStateProvider>
    );
  }
}

export default App;

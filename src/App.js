import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'reactstrap';
import Home from './Home';
import { AvaliacaoForm, AvaliacaoList, AvaliacaoDetail } from './Avaliacao';
import Navegacao from './Componentes/Navegacao';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navegacao />
        <Container fluid>
          <ToastContainer />
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/avaliacoes/novo" component={AvaliacaoForm} />
            <Route exact path="/avaliacoes" component={AvaliacaoList} />
            <Route exact path="/avaliacoes/:id/ver" component={AvaliacaoDetail} />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import cadastroConsulta from './pages/cadastroConsulta';
import cadastroMedico from './pages/cadastroMedico';
import ListarPaciente from './pages/ListarPaciente';
import cadastroUsuario from './pages/cadastroUsuario';
import consulta from './pages/consulta';
import consultaMedico from './pages/consultaMedico';
import consultasCliente from './pages/consultasCliente';
import Login from './pages/login';
import telaADM from './pages/telaADM';
import reportWebVitals from './reportWebVitals';

const rotas = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/consulta" component={consulta} />
      <Route path="/ListarPaciente" component={ListarPaciente} />
      <Route path="/cadastroMedico" component={cadastroMedico} />
      <Route path="/cadastroConsulta" component={cadastroConsulta} />
      <Route path="/cadastroClinica" component={ListarPaciente}/>
      <Route path="/cadastroUsuario" component={cadastroUsuario}/>
      <Route path="/adm" component={telaADM} />
      <Route path="/consultaMedico" component={consultaMedico} />
      <Route path="/consultaCliente" component={consultasCliente} />
    </Switch>
  </Router>
)

ReactDOM.render(rotas, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

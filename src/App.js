import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import api from './services/api';
import {AlertCatch} from './components/AlertasDefaultSistema'

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

function App() {
  
  const setPerfilUser = async () => {
    try {
      const token = localStorage.userToken
      if(token) {
        const retornoApi = await api.post('/buscarPerfilAcessoUsuario', {}, {headers: { auth: token } })
        localStorage.perfil = retornoApi.data //salvar no redux
      }
    } catch (error) {
      AlertCatch('Ocorreu um erro na autenticação.')
    }
  }   
  setPerfilUser()

  return (
    <BrowserRouter>
      <Header />
        <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

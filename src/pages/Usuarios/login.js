import React, { useState, useEffect, useCallback } from 'react';
import {withRouter} from 'react-router-dom';

import api from '../../services/api';
import {validaToken, autenticado}  from '../../services/auth';

import { AlertCatch } from '../../components/AlertasDefaultSistema';

function Login({history}) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState([])

    //Para não permitir que usuarios logados acessem essa página, só lembrando que isso funciona com o method ComponentDidMount()
    useEffect(
        () => {
            async function fetchData() {
                const userAuth = await autenticado()
                const token = await validaToken()

                if( userAuth || token) {
                    token === true ? history.replace('/') : window.location.reload()
                }
            }
            fetchData()
        },
        [history]//inicialmente era [], não sei se não vai estragar algo, coloquei o history para tirar os warning do console
    ) 

    useEffect(
        () => {
            setErros([])
        },
        [email, senha]
    )

    const handleLogin = useCallback(
        e => {
            e.preventDefault()

            async function login(e){
                try {
                    const dados = {
                        st_email: email,
                        st_senha: senha
                    }
                    
                    //Verficar na API se o email e senha estão corretos
                    const retornoApi = await api.post('/usuarios/login', dados, {validateStatus: status => status < 500});
                    const validacao = retornoApi.data
                    
                    if(validacao.success !== 0) {
                        localStorage.userToken = validacao.token
                        localStorage.userActive = JSON.stringify(validacao.usuario)
                        localStorage.userNameDebus = validacao.usuario.st_nome.toLowerCase()
                        window.location.href ='/';
                        
                    } else {
                        setErros([validacao.msg])
                    }  

                } catch (error) {
                    AlertCatch('Hovem algum problema tente novamente mais tarde. Servidor com Erro 500')
                }
            }

            login()
        },
        [email, senha]
    )    

    return (
        <div className="container-fluid h-100 mt-5">   
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-4 offset-md-3 offset-sm-3">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Login</h3>
                        </div>
                        <div className="card-body">
                            { erros.length !== 0 &&
                                <div className="alert alert-danger p-2 pb-3">
                                    <h6>Falha no Login!</h6>
                                    <ul>
                                        { 
                                            erros.map( 
                                                erro => (
                                                    <li key={erro}>{erro}</li>
                                                )
                                            ) 
                                        }
                                    </ul>
                                </div>
                            }     
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} placeholder="Informe Email" type="text" />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input className="form-control form-control-lg" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Informe a Senha" type="password" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-lg btn-block">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
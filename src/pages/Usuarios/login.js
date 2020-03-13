import React, { useState, useEffect, useCallback } from 'react';
import {withRouter} from 'react-router-dom';

import api from '../../services/api';
import {validaToken, autenticado}  from '../../services/auth';

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
        []
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
                    window.location.href ='/';
                    
                } else {
                    setErros([validacao.msg])
                }   
            }

            login()
        },
        [erros, email, senha]
    )    

    return (
        <div className="container-fluid h-100 mt-5">   
            { erros.length !== 0 &&
                <div className="row justify-content-center align-items-center h-100">
                    <div className="alert alert-danger col col-sm-6 col-md-6 col-lg-4 col-xl-3">
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
                </div>
            }     
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
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
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
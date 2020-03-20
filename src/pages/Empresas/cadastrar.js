import React, { useState, useCallback, useEffect } from 'react';
import {withRouter} from 'react-router-dom';

import {validaToken} from '../../services/auth';
import api from '../../services/api';

function Cadastrar() {

    const [nome, setNome] = useState('')
    const [recefi, setRecefi] = useState('')
    const [celular, setCelular] = useState('')


    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 
            }
            fetchData()
        },
        []
    )


    const handleSubmitCadastrar = useCallback(
        e => {
            e.preventDefault()

            async function cadastrar() {
                const empresa = {
                    st_nome: nome,
                    st_recefi: recefi,
                    st_cel: celular
                }

                try {
                    //Cadastra na API
                    const retornoApi = await api.post('/empresas', empresa, {validateStatus: status => status < 500});
                    console.log(retornoApi);
                    //Continuar depois que ajustar a API para o toque ver validado


                } catch (error) {
                    alert('Hovem algum problema tente novamente mais tarde. Servidor com Erro 500')
                }
            }

            cadastrar()
        }, 
        [nome, recefi, celular]
    )

    return (
        <div className="container-fluid h-100 mt-5">
                         
            {/* {formErrors.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={formErrors} objeto="Usuários" acao="Cadastrado" />                   
                    </div>
                </div>    
            }  */}
 
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form onSubmit={ handleSubmitCadastrar }>
                        <div className="form-group">
                            <label>Razão Social</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                onKeyPress ={() => {}} 
                                placeholder="Informe o Nome da Empresa" 
                            />
                        </div>
                        <div className="form-group">
                            <label>RECEFI</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={recefi}
                                onChange={e => setRecefi(e.target.value)} 
                                onKeyPress ={() => {}} 
                                placeholder="Informe o RECEFI" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={celular} 
                                onChange={e => setCelular(e.target.value)} 
                                onKeyPress ={() => {}} 
                                placeholder="Informe o Celular"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Cadastrar);
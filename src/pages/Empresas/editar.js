import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import * as yup from 'yup';

import {validaToken} from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import AlertasResultados from '../../components/AlertasResultados';
import validacaoDefinicao from '../../config/validacaoDefinicao';

function Editar(props) {
    const [nome, setNome] = useState('')
    const [recefi, setRecefi] = useState('')
    const [celular, setCelular] = useState('')
    const [resultado, setResultado] = useState([])


    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try { 
                    const id_empresa = props.match.params.id;
                    const retornoApi = await api.get(`empresas/${id_empresa}`, { headers: { 'auth': localStorage.userToken}}, {validateStatus: status => status < 500})
                    setNome(retornoApi.data.st_nome)
                    setRecefi(retornoApi.data.st_recefi)
                    setCelular(retornoApi.data.st_cel)

                } catch (error) {
                    AlertCatch('Hovem algum problema ao buscar a empresa tente novamente mais tarde. Servidor com Erro 500')
                    props.history.push('/empresas/listar')
                }
            }
            fetchData()
        },
        []
    )


    const handleSubmitEditar = useCallback(
        e => {
            e.preventDefault()
            setResultado([])

            async function cadastrar() {

                //Validando os dados INICIO
                let EmpresaParaValidacao = {
                    Nome: nome,
                    Recefi: recefi,
                    Celular: celular
                }
        
                yup.setLocale(validacaoDefinicao);
                const addressSchema = yup.object().shape({
                    Nome: yup
                        .string()
                        .max(50)
                        .required(),
                        
                    Recefi: yup
                        .string()
                        .max(50)
                        .required(),
                        
                    Celular: yup    
                        .string()
                        .max(50)
                        .required()
                })

                const errosValidados = await addressSchema.validate(EmpresaParaValidacao, { abortEarly: false })
                    .then( () =>  [{ success: 1, msg:"formOk"}] )                    
                    .catch( err => {
                        let errosValidados =  [{success: 0, msg: 'formError'}]
                        err.errors.map( err => {
                            errosValidados = [...errosValidados, { msg: err}];
                        })
                        
                        return errosValidados;
                })
                //Validando os dados FINAL

                try {
                    if(errosValidados[0].success === 1) {
                        const empresa = {
                            st_nome: nome,
                            st_recefi: recefi,
                            st_cel: celular
                        }

                        //Cadastra na API
                        const id_empresa = props.match.params.id;
                        const retornoApi = await api.put(`/empresas/${id_empresa}`, empresa, { headers: {'auth': localStorage.userToken } }, {validateStatus: status => status < 500});
                        setResultado(retornoApi.data)

                    } else {
                        setResultado(errosValidados)
                    }    
                    
                } catch (error) {
                    AlertCatch('Hovem algum problema tente novamente mais tarde. Servidor com Erro 500')
                }
            }

            cadastrar()
        }, 
        [nome, recefi, celular]
    )

    const handleLimparResultado = useCallback(
        () => {
            setResultado([])
        },
        [resultado]
    )

    return (
        <div className="container-fluid h-100 mt-5">        
            {resultado.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={resultado} objeto="Empresa" acao="Cadastrada" />                   
                    </div>
                </div>    
            } 
 
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form onSubmit={ handleSubmitEditar }>
                        <div className="form-group">
                            <label>Razão Social</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                onKeyPress ={handleLimparResultado} 
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
                                onKeyPress ={handleLimparResultado} 
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
                                onKeyPress ={handleLimparResultado} 
                                placeholder="Informe o Celular"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Salvar</button>
                            <Link className="btn btn-primary btn-lg btn-block" to="../listar">Voltar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Editar);
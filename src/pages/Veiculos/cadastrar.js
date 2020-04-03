import React, { useState, useCallback, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';

import { AlertCatch } from '../../components/AlertasDefaultSistema';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import AlertasResultados from '../../components/AlertasResultados';
import validacaoDefinicao from '../../config/validacaoDefinicao';

function Cadastrar() {
    const [resultado, setResultado] = useState([])
    const [placa, setPlaca] = useState('')
    const [id_empresa, setIdEmpresa] = useState()
    const [lugares, setLugares] = useState()
    const [empresasUsuario, setEmpresasUsuario] = useState([])

    //Simple, faz a validação do token
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try {
                    const retornoApi = await api.get('/empresas/buscarDoUsuario', { headers:{'auth': localStorage.userToken}}, {validateStatus: status => status < 500});    
                    setEmpresasUsuario(retornoApi.data)

                } catch (error) {
                    AlertCatch('Erro ao buscar as empresas do usuario. Tente novamente!')
                }
            }
            fetchData()
        },
        []
    )

    const handleLimparMsg = useCallback(
        () => {
            setResultado([])
        },
        [resultado]
    )    

    const handleCadastrar = useCallback(
        e => {
            e.preventDefault()
            async function cadastrar() {
                const veiculoParaValidacao = {
                    Placa: placa,
                    Empresa: id_empresa,
                    Lugares: lugares
                }

                yup.setLocale(validacaoDefinicao)
                const addressSchema = yup.object().shape({
                    Placa: yup
                        .string()
                        .min(8)
                        .max(8)
                        .required(),
                        
                    Empresa: yup
                        .number()
                        .moreThan(0)
                        .required(),
                        
                    Lugares: yup    
                        .number()
                        .moreThan(0)
                        .required()
                })
                const errosValidados = await addressSchema.validate(veiculoParaValidacao, { abortEarly: false })
                    .then( () =>  [{ success: 1, msg:"formOk"}] )                    
                    .catch( err => {
                        let errosValidados =  [{success: 0, msg: 'formError'}]
                        err.errors.map( err => {
                            errosValidados = [...errosValidados, { msg: err}];
                        })
                        
                        return errosValidados;
                })

                try {
                    if(errosValidados[0].success === 1) {
                        //Vai acessar a API e cadastrar o veiculo
                        setResultado([{success: 1, msg: 'ok'}])

                    } else {
                        setResultado(errosValidados)
                    }
                    
                } catch (error) {
                   AlertCatch('Ocorreu um erro ao cadastrar o veículo. Tente novamente.') 
                }
            }
            cadastrar()
        },
        [placa, lugares, id_empresa]
    )

    return(
        <div className="container-fluid h-100 mt-5">   
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-4 offset-md-3 offset-sm-3">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0" align="center">Cadastrar Veículos</h3>
                        </div>
                        <div className="card-body">
                            { resultado.length !== 0 &&
                                <div onClick={handleLimparMsg}>
                                    <AlertasResultados resultado={resultado} objeto="Veiculo" acao="Cadastrado" />                   
                                </div>
                            }     
                            <form onSubmit={handleCadastrar}>
                                <div className="form-group">
                                    <label>Empresa</label>
                                    <select className="form-control form-control-lg" value={id_empresa} onChange={e => {setIdEmpresa(e.target.value); handleLimparMsg()}}>
                                        <option value="">Selecine Empresa</option>
                                        {empresasUsuario.map( empresa => (
                                            <option value={empresa.id}>{empresa.st_nome}</option>       
                                        ))}
                                    </select>    
                                </div>
                                <div className="form-group">
                                    <label>Placa</label>
                                    <input className="form-control form-control-lg" value={placa} onChange={e => {setPlaca(e.target.value); handleLimparMsg()}} placeholder="Informe Placa" type="text" />
                                </div>
                                <div className="form-group">
                                    <label>Lugares</label>
                                    <input className="form-control form-control-lg" value={lugares} onChange={e => {setLugares(e.target.value); handleLimparMsg()}} placeholder="Informe lugares" type="text" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-lg btn-block">Cadastrar</button>
                                    <Link className="btn btn-primary btn-lg btn-block" to="listar">Voltar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Cadastrar);
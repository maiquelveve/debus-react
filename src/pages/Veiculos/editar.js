import React, { useState, useCallback, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';
import * as yup from 'yup';

import { AlertCatch } from '../../components/AlertasDefaultSistema';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import AlertasResultados from '../../components/AlertasResultados';
import validacaoDefinicao from '../../config/validacaoDefinicao';

function Editar(props) {
    const [resultado, setResultado] = useState([])
    const [placa, setPlaca] = useState('')
    const [id_empresa, setIdEmpresa] = useState()
    const [lugares, setLugares] = useState()//deixando assim a primeira vez que eh setado um valor no campo lugares da um erro no console pq o javascript se perde no trocar dos valores pq eh usado o onChange, e não tem valor inicial
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
                    const retornoApi = await api.get('/empresas/buscarDoUsuario', { headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500 })    
                    setEmpresasUsuario(retornoApi.data)

                    const id = props.match.params.id
                    const retornoApiVeiculo = await api.get(`/veiculos/${id}`, { headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500 })
                    setPlaca(retornoApiVeiculo.data.st_placa)
                    setIdEmpresa(retornoApiVeiculo.data.id_empresa.toString())
                    setLugares(retornoApiVeiculo.data.nr_lugares)

                } catch (error) {
                    AlertCatch('Hovem algum problema ao buscar o veículo ou as empresas do usuario tente novamente mais tarde. Servidor com Erro 500')
                    props.history.push('/veiculos/listar')
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

    const handleEditar = useCallback(
        e => {
            e.preventDefault()
            setResultado([])

            async function editar() {
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
                        const veiculo = {
                            st_placa: placa,
                            nr_lugares: lugares,
                            id_empresa: id_empresa
                        }
                        
                        const id = props.match.params.id
                        const retornoApi = await api.put(`/veiculos/${id}`, veiculo, { headers: { auth: localStorage.userToken }, validateStatus: status => status < 500} )
                        console.log(retornoApi)
                        setResultado(retornoApi.data)

                    } else {
                        setResultado(errosValidados)
                    }
                    
                } catch (error) {
                   AlertCatch('Ocorreu um erro ao Editar o veículo. Tente novamente.') 
                }
            }
            editar()
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
                            <h3 className="mb-0" align="center">Editar Veículos</h3>
                        </div>
                        <div className="card-body">
                            { resultado.length !== 0 &&
                                <div onClick={handleLimparMsg}>
                                    <AlertasResultados resultado={resultado} objeto="Veiculo" acao="Editado" />                   
                                </div>
                            }     
                            <form onSubmit={handleEditar}>
                                <div className="form-group">
                                    <label>Empresa</label>
                                    <select className="form-control form-control-lg" value={id_empresa} onChange={e => {setIdEmpresa(e.target.value); handleLimparMsg()}}>
                                        <option value="">Selecine Empresa</option>
                                        {empresasUsuario.map( empresa => (
                                            <option key={empresa.id} value={empresa.id}>{empresa.st_nome}</option>       
                                        ))}
                                    </select>    
                                </div>
                                <div className="form-group">
                                    <label>Placa</label>
                                    <InputMask 
                                            className="form-control mr-sm-4" 
                                            value={placa} 
                                            placeholder="Informe Placa"
                                            onChange={e => {setPlaca(e.target.value.toUpperCase()); handleLimparMsg()}}
                                            mask="aaa-9*99"
                                            maskChar= '_' 
                                            alwaysShowMask={false}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Lugares</label>
                                    <input className="form-control form-control-lg" value={lugares} onChange={e => {setLugares(e.target.value); handleLimparMsg()}} placeholder="Informe lugares" type="text" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-lg btn-block">Salvar</button>
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

export default withRouter(Editar);
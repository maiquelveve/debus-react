import React, {useState, useEffect} from 'react'
import InputMask from 'react-input-mask';

import api from '../../../../services/api';
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

function VeiculoVisualizar({id}) {
    const [placa, setPlaca] = useState('')
    const [lugares, setLugares] = useState('')
    const [empresa, setEmpresa] = useState('')


    useEffect(
        () => {
            async function fetchData() {
                try { 
                    const retornoApi = await api.get(`veiculos/visualizar/${id}`, { headers: { 'auth': localStorage.userToken}, validateStatus: status => status < 500})
                    setPlaca(retornoApi.data.st_placa)
                    setLugares(retornoApi.data.nr_lugares)
                    setEmpresa(retornoApi.data.st_nome)

                } catch (error) {
                    AlertCatch('Hovem algum problema ao buscar a empresa tente novamente mais tarde. Servidor com Erro 500')
                }
            }
            fetchData()
        },
        [id]
    )

    return (
        <div className="container-fluid h-100 mt-5">   
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-4 offset-md-3 offset-sm-3">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0" align="center">Visualizar Veículos</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Empresa</label>
                                    <input
                                        className="form-control mr-sm-4" 
                                        value={empresa} 
                                        placeholder="Informe Placa"
                                        disabled={true}
                                    />   
                                </div>
                                <div className="form-group">
                                    <label>Placa</label>
                                    <InputMask 
                                        className="form-control mr-sm-4" 
                                        value={placa} 
                                        placeholder="Informe Placa"
                                        mask="aaa-9*99"
                                        maskChar= '_' 
                                        alwaysShowMask={false}
                                        disabled={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Lugares</label>
                                    <input 
                                        className="form-control form-control-lg" 
                                        value={lugares} 
                                        placeholder="Informe lugares" 
                                        type="text"
                                        disabled={true}
                                     />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VeiculoVisualizar
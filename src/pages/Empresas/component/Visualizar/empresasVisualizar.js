import React, {useState, useEffect} from 'react'

import api from '../../../../services/api';
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

function EmpresaVisualizar({id}) {
    const [nome, setNome] = useState('')
    const [recefi, setRecefi] = useState('')
    const [celular, setCelular] = useState('')

    useEffect(
        () => {
            async function fetchData() {
                try { 
                    const retornoApi = await api.get(`empresas/visualizar/${id}`, { headers: { 'auth': localStorage.userToken}, validateStatus: status => status < 500})
                    setNome(retornoApi.data.st_nome)
                    setRecefi(retornoApi.data.st_recefi)
                    setCelular(retornoApi.data.st_cel)

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
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <h2 className="mb-5">Visualizar Empresa</h2>
                    <form>
                        <div className="form-group">
                            <label>Razão Social</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                placeholder="Informe o Nome da Empresa" 
                                disabled={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>RECEFI</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={recefi}
                                onChange={e => setRecefi(e.target.value)} 
                                placeholder="Informe o RECEFI" 
                                disabled={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={celular} 
                                onChange={e => setCelular(e.target.value)} 
                                placeholder="Informe o Celular"
                                disabled={true}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmpresaVisualizar
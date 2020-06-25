import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import ProcurarViagens from '../Viagens/component/ProcurarViagens';
import ListagemViagensHome from './component/ListagemViagensHome';
import { FacebookProgressPesquisa } from '../../components/Loading';

function Home() {
    const [viagens, setViagens] = useState([])
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(true)

    useEffect(
        () => {
            async function fetchData() {
                if( localStorage.userToken ) {
                    const token = await validaToken()
                    if(!token) {
                        window.location.reload('/')
                    }
                }

                try {
                    const retornoApi = await api.get('/viagens/buscarViagensHome');
                    setViagens(retornoApi.data)
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Houveram alguns erros ao carregar as viagens. Tente novamente mais tarde.')
                }
            }
            fetchData()
        },
        []
    )  

    return (
        <div className="container">
            <header className="jumbotron my-4">
                <h1 className="display-3">Não encontrou o que procura!</h1>
                <p className="lead">Melhore sua pesqusia clicando no botão a baixo.</p>
                <div className="text-center">
                    <Link className="btn btn-primary btn-lg" to="" onClick={() => setOpen(true) }>Procurar Viagens</Link>
                </div>
            </header>

            {load ? 
                <div className='text-center mt-5'>
                    <FacebookProgressPesquisa size={80} /> 
                </div>
            : 
                <ListagemViagensHome viagens={viagens} />
            }
            

            <ProcurarViagens open={open} setOpen={setOpen} setRetornoPesquisa={setViagens} setExibirLoading={setLoad}/>
        </div>
    );
}

export default Home;
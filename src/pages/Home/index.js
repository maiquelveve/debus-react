import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';
import { ajusteValorFront } from '../../services/ajustesDados';
import { validaToken } from '../../services/auth';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import ProcurarViagens from '../Viagens/component/ProcurarViagens';

function Home() {
    const [viagens, setViagens] = useState([])
    const [open, setOpen] = useState(false);

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

            <div className="row">
                {viagens.length > 0 ?
                    viagens.map( viagem => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={viagem.id}>
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="card-title"><strong>Origem:</strong> {`${viagem.cidade_origem}/${viagem.estado_sigla_origem}`}</h5>
                                    <h5 className="card-title"><strong>Destino:</strong> {`${viagem.cidade_destino}/${viagem.estado_sigla_destino}`}</h5>
                                </div>
                                <div className="card-body text-center">
                                    <p className="card-text"><strong>Empresa:</strong> {viagem.st_nome}</p>
                                    <p className="card-text"><strong>Data:</strong> { viagem.dt_data.split('-').reverse().join('/') }</p>
                                    <p className="card-text"><strong>Hora:</strong> { viagem.hh_horario.substring(0,5) } </p>
                                    <p className="card-text"><strong>Valor:</strong> { ajusteValorFront(viagem.vl_valor) } </p>
                                </div>
                                <BtnResevas viagem={viagem} />
                            </div>
                        </div>
                    ))
                :   
                    <p> Não foram encontradas viagens.</p>
                }                        
            </div>

            <ProcurarViagens open={open} setOpen={setOpen} setRetornoPesquisa={setViagens}/>
        </div>
    );
}

function BtnResevas({viagem}) {
    const [qtPassageirosViagem, setQtPassageirosViagem] = useState(0)

    useEffect(
        () => {
            async function fetchData(id_viagem) {
                try {
                    const retornoApi = await api.get('/viagens_passageiros', { params: { id_viagem } });
                    setQtPassageirosViagem(retornoApi.data.qt_passageiros_viagem)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar a quantidade de vagas ocupadas no banco. Tente novamente mais tarde.')
                }
            }
            fetchData(viagem.id)
        },
        [viagem.id]
    )

    if(viagem.vagas - qtPassageirosViagem <= 0) {
        return(
            <div className="card-footer text-center">
                <Link className="btn-lg btn btn-danger disabled" to={""} >Esgotada</Link>
            </div>
        )    
    }

    return(
        <div className="card-footer text-center">
            <Link className="btn-lg btn btn-primary" to={`/viagens/reservar/${viagem.id}`}>Reservar</Link>
        </div>
    )
}

export default Home;
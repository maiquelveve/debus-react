import React from 'react';

function InformacoesViagens(props) {
    return(
        <div className="container-fluid mt-2">
            <div className="card">
                <div className="card-header text-center">
                    <div className="row">
                        <p  className="col-lg-5 col-sm-12"><strong>ORIGEM:</strong> Canoas - RS</p>
                        <p className="col-lg-2 col-sm-12">-></p>
                        <p className="col-lg-5 col-sm-12"><strong>DESTINO:</strong> Quintão - RS</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p><strong>Vagas Disponíveis:</strong> 4</p>
                        </div>
                    </div>    
                </div>
                <div className="card-body">
                    <div className="row  text-center">
                        <div className="col-sm-4">
                            <p>Origem: Canoas - RS</p>
                        </div>
                        <div className="col-sm-4">
                            <p>Destino: Quintão - RS</p>
                        </div>
                        <div className="col-sm-2">
                            <p>Data: 25/05/2020</p>
                        </div>
                        <div className="col-sm-2">
                            <p>Hora: 14:30</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2  text-center">
                            <p>Empresa: Fran Turs</p>
                        </div>
                        <div className="col-sm-2  text-center">
                            <p>Placa: iqy-3336</p>
                        </div>
                        <div className="col-sm-4 text-center">
                            <p>Valor: R$ 15,00</p>
                        </div>
                        <div className="col-sm-4 text-center">
                            <p>Situação: Viagem Confirmada </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformacoesViagens;
import React from 'react';

function InformacoesViagens(props) {    
    return(
        <div className="card">
            <div className="card-header text-center">
                <div className="row mb-3 mt-4">
                    <h5 className="col-lg-5 col-sm-12"><strong>ORIGEM:</strong> Canoas - RS</h5>
                    <h5 className="col-lg-2 col-sm-12">-></h5>
                    <h5 className="col-lg-5 col-sm-12"><strong>DESTINO:</strong> Quintão - RS</h5>
                </div>  
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-6 text-center text-lg-left">
                        <p><strong>Empresa:</strong> Fran Turs</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-center">
                        <p><strong>Placa:</strong> IQY-3336</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-right">
                        <p><strong>Situação:</strong> Viagem Confirmada </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-left">
                        <p><strong>Data:</strong> 25/05/2020</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-center">
                        <p><strong>Hora:</strong> 14:30</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-right">
                        <p><strong>Valor:</strong> R$ 15,00</p>
                    </div>
                </div>
            </div>
            <div className="card-footer text-center">
                <div className="row">
                    <div className="col-sm-12">
                        <h3><strong>Vagas Disponíveis: </strong> 4</h3>
                    </div>
                </div>  
            </div>
        </div> 
    )
}

export default InformacoesViagens;
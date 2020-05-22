import React from 'react';

function InformacoesViagens(props) {
    return(
        <div className="container-fluid mt-2">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Reservar Viagem</h4>
                    <p>Vagas: 4</p>
                </div>
                <div class="card-body">
                    <div class="row  text-center">
                        <div class="col-sm-4">
                            <p>Origem: Canoas - RS</p>
                        </div>
                        <div class="col-sm-4">
                            <p>Destino: Quintão - RS</p>
                        </div>
                        <div class="col-sm-2">
                            <p>Data: 25/05/2020</p>
                        </div>
                        <div class="col-sm-2">
                            <p>Hora: 14:30</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2  text-center">
                            <p>Empresa: Fran Turs</p>
                        </div>
                        <div class="col-sm-2  text-center">
                            <p>Placa: iqy-3336</p>
                        </div>
                        <div class="col-sm-4 text-center">
                            <p>Valor: R$ 15,00</p>
                        </div>
                        <div class="col-sm-4 text-center">
                            <p>Situação: Viagem Confirmada </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformacoesViagens;
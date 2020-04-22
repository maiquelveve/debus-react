import api from '../../../../services/api';
import swal from 'sweetalert';
import './styleAlerts.css'
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

export const AlertDesativarVeiculo = (veiculo, callbackAtivacaoOuDesativacao) => {
    swal({   
        title: "Desativar Veículo?", 
        text: `Deseja realmente DESATIVAR o veículo ${veiculo.st_placa}`,
        buttons: {
            cancel: {
                text: "NÃO",
                value: null,
                visible: true,
                className: "",
                closeModal: true,
                },
                confirm: {
                text: "SIM",
                value: true,
                visible: true,
                className: "",
                closeModal: true
                }
        },
        icon: "warning",
        dangerMode: true,
        className: "",
        closeOnClickOutside: false,
        closeOnEsc: false,

    }).then( async value => {
        if(value) {
            try {
                //Mandar para a API
                await api.put(`/veiculos/desativar/${veiculo.id}`)
                
                swal({
                    title: "Veículo Desativado!", 
                    text: `O Veículo ${veiculo.st_placa} foi desativado com sucesso`, 
                    icon: "success",
                    buttons: {
                                confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btnConfirmAtivarVeiculo",
                                closeModal: true
                            }
                    },
                }).then( () => { callbackAtivacaoOuDesativacao() });
            } catch (error) {
                throw(error)    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Desativar p Veículo. Tente novamente mais tarde!')
    }); 
}

export const AlertAtivarVeiculo = (veiculo, callbackAtivacaoOuDesativacao) => {
    swal({   title: "Ativar Veículo?", 
            text: `Deseja realmente ATIVAR o veículo ${veiculo.st_placa}`,
            buttons: {
                cancel: {
                    text: "NÃO",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
                  confirm: {
                    text: "SIM",
                    value: true,
                    visible: true,
                    className: "btnConfirmAtivarVeiculo",
                    closeModal: true
                  }
            },
            icon: "warning",
            dangerMode: false,
            className: "",
            closeOnClickOutside: false,
            closeOnEsc: false,
        }
    ).then( async value => {
        if(value) {
            try {
                //Mandar para a API
                await api.put(`/veiculos/ativar/${veiculo.id}`)
                
                swal({
                    title: "Veículo Ativad0!", 
                    text: `O Veículo ${veiculo.st_placa} foi ativado com sucesso`, 
                    icon: "success",
                    buttons: {
                                confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btnConfirmAtivarVeiculo",
                                closeModal: true
                            }
                    },
                }).then( () => { callbackAtivacaoOuDesativacao() });

            } catch (error) {
                throw(error)  
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Ativar o Veículo. Tente novamente mais tarde!')
    });
}


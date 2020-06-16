import api from '../../../../services/api';
import swal from 'sweetalert';
import './styleAlerts.css'
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

export const AlertConfirmarViagem = (viagem, callbackRetornoAcoes) => {
    swal({   
        title: "Confirmar Viagem?", 
        text: `Deseja realmente CONFIRMAR a viagem ${viagem.id}`,
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
                className: "btnConfirm",
                closeModal: true
            }
        },
        icon: "info",
        dangerMode: true,
        className: "",
        closeOnClickOutside: false,
        closeOnEsc: false,

    }).then( async value => {
        if(value) {
            try {
                //Mandar para a API
                await api.put(`/viagens/confirmar/${viagem.id}`)
                
                swal({
                    title: "Viagem Confirmada!", 
                    text: `A Viagem ${viagem.id} foi confirmada com sucesso`, 
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btnConfirm",
                            closeModal: true
                        }
                    },
                }).then( () => { callbackRetornoAcoes() });
            } catch (error) {
                throw(error)    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Confirmar a viagem. Tente novamente mais tarde!')
    }); 
}

export const AlertCancelarViagem = (viagem, callbackRetornoAcoes) => {
    swal({   
        title: "Cancelar Viagem?", 
        text: `Deseja realmente CANCELAR a viagem ${viagem.id}`,
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
                await api.put(`/viagens/cancelar/${viagem.id}`)

                swal({
                    title: "Viagem Cancelada!", 
                    text: `A Viagem ${viagem.id} foi cancelada com sucesso`, 
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btnConfirm",
                            closeModal: true
                        }
                    },
                }).then( () => { callbackRetornoAcoes() });
            } catch (error) {
                throw(error)    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Cancelar a viagem. Tente novamente mais tarde!')
    }); 
}

export const AlertDeletarViagem = (viagem, callbackRetornoAcoes) => {
    swal({   
        title: "Cancelar Viagem?", 
        text: `Deseja realmente CANCELAR a viagem ${viagem.id}`,
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
                const params = { id_viagem: viagem.id}
                await api.delete(`/viagens_passageiros`, { params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500 })
                
                swal({
                    title: "Viagem Cancelada!", 
                    text: `A Viagem ${viagem.id} foi cancelada com sucesso`, 
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btnConfirm",
                            closeModal: true
                        }
                    },
                }).then( () => { callbackRetornoAcoes() });
            } catch (error) {
                throw(error)    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Cancelar a viagem. Tente novamente mais tarde!')
    }); 
}


export const AlertReativarViagem = (viagem, callbackRetornoAcoes) => {
    swal({   
        title: "Reativar Viagem?", 
        text: `Deseja realmente REATIVAR a viagem ${viagem.id}`,
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
                className: "btnConfirm",
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
                await api.put(`/viagens/reativar/${viagem.id}`)
                
                swal({
                    title: "Viagem Reativada!", 
                    text: `A Viagem ${viagem.id} foi reativada com sucesso`, 
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btnConfirm",
                            closeModal: true
                        }
                    },
                }).then( () => { callbackRetornoAcoes() });
            } catch (error) {
                throw(error)    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Reativar a viagem. Tente novamente mais tarde!')
    }); 
}
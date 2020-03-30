import api from '../../../../services/api';
import swal from 'sweetalert';
import './styleAlerts.css'
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

export const AlertDesativarEmpresa = empresa => {
    swal({   
        title: "Desativar Empresa?", 
        text: `Deseja realmente DESATIVAR a empresa ${empresa.st_nome}`,
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
                const retornoApi = await api.put(`/empresas/desativar/${empresa.id}`)
                
                swal({
                    title: "Empresa Desativada!", 
                    text: `A Empresa ${empresa.st_nome} foi desativada com sucesso`, 
                    icon: "success",
                    buttons: {
                                confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btnConfirmAtivarEmpresa",
                                closeModal: true
                            }
                    },
                });
            } catch (error) {
                throw('Erro API')    
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Desativar a Empresa. Tente novamente mais tarde!')
    }); 
}

export const AlertAtivarEmpresa = empresa => {
    swal({   title: "Ativar Empresa?", 
            text: `Deseja realmente ATIVAR a empresa ${empresa.st_nome}`,
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
                    className: "btnConfirmAtivarEmpresa",
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
                const retornoApi = await api.put(`/empresas/ativar/${empresa.id}`)
                
                swal({
                    title: "Empresa Ativada!", 
                    text: `A Empresa ${empresa.st_nome} foi ativada com sucesso`, 
                    icon: "success",
                    buttons: {
                                confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btnConfirmAtivarEmpresa",
                                closeModal: true
                            }
                    },
                });
            } catch (error) {
                throw('Erro API')  
            }
        }        
    }).catch(err => {
        AlertCatch('Ocorreu um erro ao Ativar a Empresa. Tente novamente mais tarde!')
    });
}


import api from '../../../../services/api';
import swal from 'sweetalert';
import './styleAlerts.css'
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

export const AlertCancelarLocalReferencia = (localReferencia, callbackRetornoAcoes) => {
    swal({   
        title: "Cancelar Local de Referência?", 
        text: `Deseja realmente CANCELAR o local de referência ${localReferencia.st_dsc}`,
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
                await api.put(`/locaisReferencias/cancelar/${localReferencia.id}`)

                swal({
                    title: "Local de Referência Cancelado!", 
                    text: `O Local de Referência ${localReferencia.st_dsc} foi cancelado com sucesso`, 
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
        AlertCatch('Ocorreu um erro ao Cancelar o Local de Referência. Tente novamente mais tarde!')
    }); 
}
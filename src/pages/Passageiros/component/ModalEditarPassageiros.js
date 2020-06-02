import React, { useCallback, useState, useEffect } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from '../../../services/api';
import { AlertCatch } from '../../../components/AlertasDefaultSistema';
import { CpfMask } from '../../../components/MaskInputs';
import { validacao } from '../validacoes';

function ModalEditarPassageiros({open, setOpen, id_viagem, refazerBuscaDosPassageiros, passageiro, setOpenAlertSuccess, setOpenAlertError, setResultado}) {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    
    useEffect(
        () => {
            setNome(passageiro.st_nome)
            setCpf(passageiro.st_cpf)
        },
        [passageiro]  
    )

    const handleClose = useCallback(
        () => {
            setOpen(false);
        },
        [setOpen]
    )

    const handleEditarPassageiros = useCallback(
        () => {
            async function editarPassageiro() {
                try {
                    const newPassageiro = await validacao({ nome, cpf, id_viagem })
                    
                    if(newPassageiro.length > 0) {
                        setOpenAlertError(true)
                        setResultado(newPassageiro)
                    } else {
                        const retornoApi = await api.put(`passageiros/${passageiro.id}`, newPassageiro, { headers: { auth: localStorage.userToken }, validateStatus: status => status < 500 })
                        if(retornoApi.data.success === 1) {
                            window.scrollTo(0, 5000)
                            setOpen(false);
                            setNome('')
                            setCpf('')
                            setOpenAlertSuccess(true)
                        } else {
                            setOpenAlertError(true)
                            setResultado(retornoApi.data)
                        }
                    }

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao editar os dados no banco. Tente novamente mais tarde.') 
                } finally {
                    refazerBuscaDosPassageiros()
                }
            }
            editarPassageiro()

        },
        [refazerBuscaDosPassageiros, setOpen, nome, cpf, passageiro, setOpenAlertSuccess, setOpenAlertError, setResultado, id_viagem]
    )

    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Novo Passageirto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cadastre o passageiro para essa viagem.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    value={nome}
                    onChange={ e => setNome(e.target.value) }
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="cpf"
                    label="CPF"
                    type="text"
                    onChange={ e => setCpf(e.target.value) }
                    value={cpf}
                    fullWidth
                    InputProps={{
                        inputComponent: CpfMask,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
                <Button onClick={handleEditarPassageiros} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalEditarPassageiros;
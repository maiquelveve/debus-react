import React, { useCallback, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ModalAddPassageiros({open, setOpen, setPassageiros, passageiros}) {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')

    const handleClose = useCallback(
        () => {
            setOpen(false);
            setNome('')
            setCpf('')
        },
        [setOpen]
    )

    const handleAddPassageiros = useCallback(
        () => {
            setPassageiros([...passageiros, {nome, cpf}])
            setOpen(false);
            setNome('')
            setCpf('')
            window.scrollTo(0, 5000)

        },
        [setOpen, setPassageiros, passageiros, nome, cpf]
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
                <Button onClick={handleAddPassageiros} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalAddPassageiros;
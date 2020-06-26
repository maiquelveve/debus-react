import React, {useState, useCallback} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SearchSharpIcon from '@material-ui/icons/SearchSharp'

import { makeStyles } from '@material-ui/core/styles';

import DestinoProcurarViagem from '../DestinoProcurarViagem';
import api from '../../../../services/api';
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor: '#007bff'
    },
    title: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
}));

function ProcurarViagens({open, setOpen, setRetornoPesquisa, setExibirLoading}) {

    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [empresa, setEmpresa] = useState('')

    const[idPaisOrigem, setIdPaisOrigem] = useState(0)
    const[idEstadoOrigem, setIdEstadoOrigem] = useState(0)
    const[idCidadeOrigem, setIdCidadeOrigem] = useState(0)

    const[idPaisDestino, setIdPaisDestino] = useState(0)
    const[idEstadoDestino, setIdEstadoDestino] = useState(0)
    const[idCidadeDestino, setIdCidadeDestino] = useState(0)

    const handleClose = useCallback(
        () => {
            setOpen(false);
            setExibirLoading(false)
        },
        [setOpen, setExibirLoading]
    )

    const classes = useStyles();

    const handleProcurarViagem = useCallback(
        () => {
            setExibirLoading(true)
            async function procurarViagem() {
                try {
                    const params = { 
                        dt_data_inicial: dataInicial, 
                        dt_data_final: dataFinal, 
                        st_nome: empresa,
                        idCidadeOrigem,
                        idCidadeDestino
                    }
                    const retornoApi = await api.get('/viagens/procurar', { params }) 
                    setRetornoPesquisa(retornoApi.data)

                } catch (error) {
                    await AlertCatch('Ocorreu um erro ao procurar a viangem. Tente novamente mais tarde!')
                } finally {
                    handleClose()
                }
            }
            procurarViagem()
        },
        [dataInicial, dataFinal, empresa, idCidadeOrigem, idCidadeDestino, setRetornoPesquisa, handleClose, setExibirLoading]
    )

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'xl'}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <DialogTitle id="form-dialog-title"> <SearchSharpIcon /> Procurar Viagens</DialogTitle>
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form className={`text-center mt-5`} noValidate autoComplete="off">
                        <div className="form-row">
                            <div className="form-group col-6">
                                <TextField
                                    className="form-control" 
                                    margin="dense"
                                    id="name"
                                    label="Nome Empresa"
                                    type="email"
                                    value={empresa}
                                    onChange={e => setEmpresa(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-3">
                                <TextField
                                    id="dateInicial"
                                    label="Data Inical"
                                    type="date"
                                    value={dataInicial}
                                    onChange={e => setDataInicial(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="form-group col-3">
                                <TextField
                                    id="dateFinal"
                                    label="Data Final"
                                    type="date"
                                    value={dataFinal}
                                    onChange={e => setDataFinal(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>    
                        </div> 
                        <div className="form-row mt-2">
                            <div className="form-group col-12">
                                <DestinoProcurarViagem 
                                    setIdPais = {setIdPaisOrigem}
                                    idPais = {idPaisOrigem}
                                    setIdEstado = {setIdEstadoOrigem}
                                    idEstado = {idEstadoOrigem}
                                    setIdCidade = {setIdCidadeOrigem}   
                                    idCidade = {idCidadeOrigem} 
                                    deslocamento = "Origem"                                                  
                                />
                            </div>    
                        </div>
                    
                        <div className="form-row">
                            <div className="form-group col-12">
                                <DestinoProcurarViagem 
                                    setIdPais = {setIdPaisDestino}
                                    idPais = {idPaisDestino}
                                    setIdEstado = {setIdEstadoDestino}
                                    idEstado = {idEstadoDestino}
                                    setIdCidade = {setIdCidadeDestino}   
                                    idCidade = {idCidadeDestino} 
                                    deslocamento = "Destino"                                                  
                                />
                            </div>    
                        </div>  
                    </form>    
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleProcurarViagem} size="medium">
                        PESQUISAR
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div>
  );
}

export default ProcurarViagens
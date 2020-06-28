import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FaUserEdit} from 'react-icons/fa';

import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';
import api from '../../services/api';
import { FacebookProgressSimple } from '../../components/Loading';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import { AlertSuccess, AlertError } from '../../components/AlertasMaterialUi';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#007bff',
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loading: {
        margin: theme.spacing(5),
    }
}));

export default function Perfil() {
    const classes = useStyles();

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [formErrors, setFormErrors] = useState([]);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)
    const [load, setLoad] = useState(true)

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const retornoApi = await api.get('/usuarios', { headers:{auth: localStorage.userToken}, validateStatus: status => status < 500 })
                    setNome(retornoApi.data.st_nome)
                    setEmail(retornoApi.data.st_email)
                    setLoad(false)
                    
                } catch (error) {
                    AlertCatch('Ocorreu algum erro ao buscar os dados do usuario no banco de dados. Tente novamente mais tarde!')
                }
            }
            fetchData()
        },
        []
    )

    const handleAtualizarPerfil = useCallback(
        e => {
            e.preventDefault()
            async function atualizarPerfil() {
                try {
                    //Validando os dados INICIO
                    let usuarioParaValidacao = {
                        Nome: nome,
                        Email: email,
                    }
            
                    yup.setLocale(validacaoDefinicao);
                    const addressSchema = yup.object().shape({
                        Nome: yup
                            .string()
                            .max(50)
                            .required(),
                            
                        Email: yup
                            .string()
                            .max(50)
                            .email()
                            .required(),
                    })

                    const errosValidados = await addressSchema.validate(usuarioParaValidacao, { abortEarly: false })
                        .then( () =>  [{ success: 1, msg:"formOk"}] )                    
                        .catch( err => {
                            let errosValidados =  [{success: 0, msg: 'formError'}]
                            err.errors.map( err => {
                                errosValidados = [...errosValidados, { msg: err}];
                                return true
                            })
                            
                            return errosValidados;
                    })
                    //Validando os dados FINAL

                    if(errosValidados[0].success !== 0) {
                        const data ={
                            st_nome: nome,
                            st_email: email
                        }
                        const retornoApi = await api.put('/usuarios', data, { headers:{auth: localStorage.userToken}, validateStatus: status => status < 500 })
                        
                        if(retornoApi.data[0].success !== 0) {
                            setOpenAlertSuccess(true)
                            
                        } else {
                            errosValidados[0].success = 0;
                            errosValidados[0].msg = retornoApi.data[0].msg
                            setFormErrors(errosValidados)
                            setOpenAlertError(true)
                        }
                    } else {
                        setFormErrors(errosValidados)
                        setOpenAlertError(true)
                    }

                } catch (error) {
                    AlertCatch('Ocorreu algum erro ao editar o perfil do usuario no banco de dados. Tente novamente mais tarde!')
                }

            } 
            atualizarPerfil()
        },
        [nome, email]
    )

    if(load) {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaUserEdit size={45} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {localStorage.userNameDebus}
                    </Typography>
                    <div className={classes.loading}>
                        <FacebookProgressSimple size={55} />
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FaUserEdit size={45} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {localStorage.userNameDebus}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="nome"
                                name="nome"
                                variant="outlined"
                                fullWidth
                                id="nome"
                                label="Nome"
                                value={nome}
                                onChange={ e => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={ e => setEmail(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                        onClick={handleAtualizarPerfil}
                    >
                        Salvar
                    </Button>
                </form>
            </div>
            <AlertError 
                open={openAlertError} 
                setOpen={setOpenAlertError} 
                messages={formErrors} 
                messageShowPosition={{vertical: 'top', horizontal: 'center'}}
            />
            <AlertSuccess 
                open={openAlertSuccess} 
                setOpen={setOpenAlertSuccess}
                messages={'Usuário Salvo!'}
                messageShowPosition={{vertical: 'top', horizontal: 'center'}}
            />
        </Container>
    );
}
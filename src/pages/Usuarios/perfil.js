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

import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

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
}));

export default function Perfil() {
    const classes = useStyles();

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const retornoApi = await api.get('usuarios/buscar_por_token', { headers:{auth: localStorage.userToken}, validateStatus: status => status < 500 })
                    setNome(retornoApi.data.st_nome)
                    setEmail(retornoApi.data.st_email)
                    
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
                const data ={
                    st_nome: nome,
                    st_email: email
                }
                console.log(data)
            } 
            atualizarPerfil()
        },
        [nome, email]
    )

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
        </Container>
    );
    }
import React, { useState, useEffect, useCallback } from 'react';
import { autenticado } from '../../services/auth';
import * as yup from 'yup';
import api from '../../services/api';

import AlertasResultados from '../../components/AlertasResultados';
import validacaoDefinicao from '../../config/validacaoDefinicao';

function Cadastrar(props) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [formErrors, setFormErrors] = useState([]);

    //Para não permitir que usuarios logados acessem essa página, só lembrando que isso funciona com o method ComponentDidMount()
    useEffect(
        () => {
            if(autenticado()) {
                props.history.replace('/')
            }
        },
        []
    )

    const handleCadastrar = useCallback(
        (e) => {
            e.preventDefault()
            setFormErrors([])
            
            async function cadastrar(){
                //Validando os dados INICIO
                let usuarioParaValidacao = {
                    Nome: nome,
                    Email: email,
                    Senha: senha
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
                        
                    Senha: yup    
                        .string()
                        .max(50)
                        .required()
                })

                const errosValidados = await addressSchema.validate(usuarioParaValidacao, { abortEarly: false })
                    .then( () =>  [{ success: 1, msg:"formOk"}] )                    
                    .catch( err => {
                        let errosValidados =  [{success: 0, msg: 'formError'}]
                        err.errors.map( err => {
                            errosValidados = [...errosValidados, { msg: err}];
                        })
                        
                        return errosValidados;
                })
                //Validando os dados FINAL

                try {
                    let usuario = {
                        st_nome: nome,
                        st_email: email,
                        st_senha: senha
                    }

                    if(errosValidados[0].success !== 0) {
                        //Sem a function validateStatus se a requisição não for status 200 cai no catch, agora só cai no catch se for status 500
                        const retornoApi = await api.post('/usuarios/cadastrar', usuario, {validateStatus: status => status < 500})
                        
                        if(retornoApi.data[0].success !== 0) {
                            setNome('')
                            setEmail('')
                            setSenha('')
                        } else {
                            errosValidados[0].success = 0;
                            errosValidados[0].msg = retornoApi.data[0].msg
                        }
                    }
                    
                    setFormErrors(errosValidados)

                } catch (error) {
                    alert('Hovem algum problema tente novamente mais tarde. Servidor com Erro 500')
                }
            }

            cadastrar()
        },
        [nome,email, senha, formErrors]
    )    

    const handleLimparFormErrosKeyPress = useCallback(
        () => {
            function limparFormErrosKeyPress() {
                if(formErrors.length !== 0) {
                    setFormErrors([])
                }
            }

            limparFormErrosKeyPress()
        },
        [formErrors]
    )
    

    return (
        <div className="container-fluid h-100 mt-5">
                         
            {formErrors.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={formErrors} objeto="Usuários" acao="Cadastrado" />                   
                    </div>
                </div>    
            } 
 
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form onSubmit={handleCadastrar}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={nome}
                                onChange={e => setNome(e.target.value)} 
                                onKeyPress ={handleLimparFormErrosKeyPress} 
                                placeholder="Informe o Nome" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                onKeyPress ={handleLimparFormErrosKeyPress} 
                                placeholder="Informe o Email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                value={senha} 
                                onChange={e => setSenha(e.target.value)} 
                                onKeyPress ={handleLimparFormErrosKeyPress} 
                                placeholder="Informe a Senha" 
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastrar;
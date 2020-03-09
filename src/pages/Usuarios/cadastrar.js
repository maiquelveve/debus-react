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
    const [resultado, setResultado] = useState([]);//morre
    const [formErrors, setFormErros] = useState([]);

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

            async function cadastrar(){
                let usuarioParaValidacao = {
                    Nome: nome,
                    Email: email,
                    Senha: senha
                }
        
                //validando os dados
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
                        .required()    
                })

                const erros = await addressSchema.validate(usuarioParaValidacao, { abortEarly: false }).catch( err => {
                   return err.errors;
                })

                setFormErros(erros)
                
                let usuario = {
                    st_nome: nome,
                    st_mail: email,
                    st_enha: senha
                }

                //Zerando as States para não ficar aparecendo as duas mensagens
                setResultado([])
                //pesnar em como resolver a treta do erro validacao aqui
                try {
                    if(formErrors.length !== 0){
                        let retornoApi = await api.post('/usuarios/cadastrar', usuario)
            
                        if(retornoApi.data[0].success >= 1) {
                            setNome('')
                            setEmail('')
                            setSenha('')
                        }              
                    } else {
                        console.log(erros)
                        alert('erros')
                    }
                } catch (error) {
                    alert('Hovem algum problema tente novamente mais tarde')
                }
            }

            cadastrar()
        },
        [nome,email, senha, resultado]
    )    

    const handleLimparResultoKeyPress = useCallback(
        () => {
            function limparResultadoKeyPress() {
                if(resultado.length !== 0) {
                    setResultado([])
                    console.log('ativo')
                }
            }

            limparResultadoKeyPress()
        },
        [resultado]
    )
    

    return (
        <div className="container-fluid h-100 mt-5">
                         
            {resultado.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={resultado} objeto="Usuários" acao="Cadastrado" />                   
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
                                onKeyPress ={handleLimparResultoKeyPress} 
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
                                onKeyPress ={handleLimparResultoKeyPress} 
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
                                onKeyPress ={handleLimparResultoKeyPress} 
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
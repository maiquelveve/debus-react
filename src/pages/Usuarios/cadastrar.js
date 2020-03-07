import React, { useState, useEffect } from 'react';
import { autenticado } from '../../services/auth';
import api from '../../services/api';
import AlertasResultados from '../../components/AlertasResultados';

function Cadastrar(props) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [resultado, setResultado] = useState([]);

    //Para não permitir que usuarios logados acessem essa página, só lembrando que isso funciona com o method ComponentDidMount()
    useEffect(
        () => {
            if(autenticado()) {
                props.history.replace('/')
            }
        },
        []
    )

    //Só tem isso para quando o cara começar a digitar sumir o alert
    useEffect(
        () => {
            setResultado([])
        },
        [nome, email, senha]
    )

    async function cadastrar(e){
        e.preventDefault()

        let usuario = {
            st_nome: nome,
            st_email: email,
            st_senha: senha
        }

        //Zerando as States para não ficar aparecendo as duas mensagens
        setResultado([])

        try {
            let retornoApi = await api.post('/usuarios/cadastrar', usuario)
            setResultado(retornoApi.data)

        } catch (error) {
            alert('Hovem algum problema tente novamente mais tarde')
        }
    }

    function fecharMsg() {
        setResultado([])
    }

    return (
        <div className="container-fluid h-100 mt-5">
            {/*             
            {resultado.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" onClick={fecharMsg} id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={resultado} objeto="Usuários" acao="Cadastrado" />                   
                    </div>
                </div>    
            } 
            */}
 
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form onSubmit={cadastrar}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control form-control-lg" value={nome} onChange={e => setNome(e.target.value)} placeholder="Informe o Nome" type="text" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} placeholder="Informe o Email" type="text" />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input className="form-control form-control-lg" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Informe a Senha" type="password" />
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
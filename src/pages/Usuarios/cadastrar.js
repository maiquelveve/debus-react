import React, { useState } from 'react';

function Cadastrar() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')

    function cadastrar(e){
        e.preventDefault()
    }

    return (
        <div className="container-fluid h-100 mt-5">
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
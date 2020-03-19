import React from 'react';

function Cadastrar() {
    return (
        <div className="container-fluid h-100 mt-5">
                         
            {/* {formErrors.length !== 0  &&
                <div className="row justify-content-center align-items-center h-100" id="alert-msg">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <AlertasResultados resultado={formErrors} objeto="Usuários" acao="Cadastrado" />                   
                    </div>
                </div>    
            }  */}
 
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form onSubmit={() => {}}>
                        <div className="form-group">
                            <label>RECEFI</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={''}
                                onChange={e => {}} 
                                onKeyPress ={() => {}} 
                                placeholder="Informe o RECEFI" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                value={''} 
                                onChange={e => {}} 
                                onKeyPress ={() => {}} 
                                placeholder="Informe o Celular"
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
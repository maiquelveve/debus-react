import React from 'react';

function AlertasResultados(props) {    

    let status = props.resultado[0].success >= 1 ? 'success' : 'error'
    
    switch(status) {
        case 'success': 
            props.resultado[0].msg = `${props.objeto} ${props.acao} com sucesso!`
            return(
                <div className="alert alert-success">
                    <h6>Sucesso!</h6>
                    <ul>
                        <li>{props.resultado[0].msg}</li>
                    </ul>
                </div>
            );

        case 'error': 
            props.resultado.shift()                
            return(                
                <div className="alert alert-danger">
                    <h6>{`${props.objeto} não pode ser ${props.acao}!`}</h6>
                    <ul>
                        { props.resultado.map( erro => (
                            <li key={erro.msg}>{erro.msg}</li>
                        ))}
                    </ul>
                </div>
            );
    }
    
}

export default AlertasResultados;
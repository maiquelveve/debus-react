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
            //Tem isso para nao dar pau. Não sei o que acontece...só da pau e da ruim ai mesmo com erro cai no isso do sucesso da pagina que chama    
            let erros = []
            props.resultado.map( err => {
                if(err.msg !== 'formError') {
                    erros = [...erros, err]
                }
            });
            
            return(                
                <div className="alert alert-danger">
                    <h6>{`${props.objeto} não pode ser ${props.acao}!`}</h6>
                    <ul>
                        { erros.map( erro =>  (
                            <li key={erro.msg}>{erro.msg}</li>
                        ))}
                    </ul>
                </div>
            );
        
        default:
            return(                
                <div className="alert alert-danger">
                    <h6>{`${props.objeto} não pode ser ${props.acao}!`}</h6>
                    <ul>
                        <li>Ocorreu um erro. Tente novamente mais tarde!</li>
                    </ul>
                </div>
            );
    }
    
}

export default AlertasResultados;
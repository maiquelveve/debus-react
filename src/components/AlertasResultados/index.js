import React from 'react';

function AlertasResultados(props) {    
    switch(props.statusResultado) {
        case 'success': 
            return(
                <div className="alert alert-success">
                    <ul>
                        <li>{props.msg[0]}</li>
                    </ul>
                </div>
            );

        case 'error': 
            return(
                <div className="alert alert-danger">
                    <ul>
                        { props.msg.map( erro => (
                            <li key={erro.msg}>{erro.msg}</li>
                        ))}
                    </ul>
                </div>
            );
    }
    
}

export default AlertasResultados;
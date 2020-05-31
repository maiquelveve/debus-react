import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSuccess = ({setOpen, open, messages}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {messages}
            </Alert>
        </Snackbar>
    )
}

export const AlertError = ({setOpen, open, messages}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    let erros = [];
    if(messages.length > 0) {
        messages.map( erro => {
            if(erro.msg !== 'formError') {
               erros = [...erros, erro]            
            } 
            return true
        })
    }
    
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                <ul>
                    { erros.map( erro =>  (
                        <li key={erro.msg}>{erro.msg}</li>
                    ))}
                </ul>
            </Alert>
        </Snackbar>
    )
}
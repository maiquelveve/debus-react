import React from 'react';
import { TextField } from '@material-ui/core';

export const InputTexto = (props) => {
    return(
        <TextField 
            label = { props.label } 
            variant = "standard" 
            disabled = { props.disabled } 
            value = { props.value }
            onChange = { props.setValue }
        />
    )
}

export const InputTextoOutLined = (props) => {
    return(
        <TextField 
            label = { props.label } 
            variant = "outlined" 
            disabled = { props.disabled } 
            value = { props.value }
            onChange = { props.setValue }
        />
    )
}

export const InputTextoFilled = (props) => {
    return(
        <TextField 
            label = { props.label } 
            variant = "filled" 
            disabled = { props.disabled } 
            value = { props.value }
            onChange = { props.setValue }
        />
    )
}
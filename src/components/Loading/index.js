import React from 'react'
import { CircularProgress } from '@material-ui/core';

import './styles.css'

export const Loading = () => {
    return(
        <div className="loading">
            <CircularProgress />
            <p>Carregando....</p>
        </div>
    )
}
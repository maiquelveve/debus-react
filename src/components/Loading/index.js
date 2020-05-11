import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';

import './styles.css'

export const Loading = () => {
    return(
        <div className="loading_circular">
            <CircularProgress />
            <p>Carregando....</p>
        </div>
    )
}

export function ExibirLoadingLayout() {
    const[exibirLoading, setExibirLoading] = useState(true)
    
    if(exibirLoading) {
        setTimeout(() => setExibirLoading(false), 500)
        return(
            <div className="loading_circular">
                <CircularProgress />
                <p>Carregando FAKE....</p>
            </div>
        )
    } else {
        return ''
    }
}
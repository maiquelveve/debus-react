import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';

import { validaToken }  from '../../services/auth';

function Viagens() {

    const [validacaoToken, setValidacaoToken] = useState(true)

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();

                if(!token) {
                    setValidacaoToken(token)
                    window.location.reload('/')
                }
            }
            fetchData();
        },
        []
    )
    
    return (
        <div>
            <h1>Viagens</h1>
        </div>
    );
}

export default withRouter(Viagens);
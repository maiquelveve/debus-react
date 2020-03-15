import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';

import { validaToken }  from '../../services/auth';

function Viagens() {

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
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
import React, {useEffect, useCallback, useState} from 'react';
import {withRouter} from 'react-router-dom';

import {validaTokenApi, autenticado}  from '../../services/auth';

function Viagens() {
    return (
        <div>
            <h1>Viagens</h1>
        </div>
    );
}

export default withRouter(Viagens);
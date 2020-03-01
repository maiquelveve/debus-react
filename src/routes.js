import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Viagens from './pages/Viagens';

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/viagens" component={Viagens} />
        </Switch>
    )
}

export default Routes;

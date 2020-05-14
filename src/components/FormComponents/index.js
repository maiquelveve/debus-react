/*
  Para usar o MATERIAL-UI deve ser intalado as seguintes dependências
    -> yarn add @material-ui/core  
    -> yarn add @material-ui/icons
    -> yarn add typeface-roboto
  
    ** Para ficar responsivo para web e mobile use isso 
      -> <meta name="viewport"content="minimum-scale=1, initial-scale=1, width=device-width" />
*/

import React from 'react';
import { Button } from '@material-ui/core';

export const ButtonEX = () => (
  <Button variant="contained" color="primary" >
    Disable elevation
  </Button>
)
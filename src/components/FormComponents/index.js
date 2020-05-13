//Para usar o MATERIAL-UI deve ser intalado as seguintes dependências
// yarn add @material-ui/core  
// yarn add @material-ui/icons
// yarn add typeface-roboto
// Para ficar responsivo para web e mobile use isso <meta name="viewport"content="minimum-scale=1, initial-scale=1, width=device-width"/>
//Se for trabalhar com data tem que instalar date-fns e @date-io/date-fns - yarn add date-fns e yarn add @date-io/date-fns

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField} from '@material-ui/core';

//campos data mais estilizados
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export const ButtonEX = () => (
    <Button variant="contained" color="primary" >
      Disable elevation
    </Button>
)










const useStylesDataEX = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
}));
  
export const DataEX = () => {
    const classes = useStylesDataEX();
  
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
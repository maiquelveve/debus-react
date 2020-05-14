/*Se for trabalhar com data tem que instalar 
     -> date-fns, 
     -> @date-io/date-fns^1.3.13  // pq a versão atual da erro de caracter
     -> @material-ui/pickers 
            * yarn add date-fns 
            * npm i @date-io/date-fns@1.3.13 
            * yarn add @material-ui/pickers
*/

import React, {useState} from 'react';
import 'date-fns';
import brLocale from 'date-fns/locale/pt-BR'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//Para editar as cores dos calendarios
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

//Variavel que define a COR do calendario
const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export const DataOKCancel = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
        <KeyboardDatePicker
          margin="normal"
          label={props.label}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          cancelLabel='Fechar'
          invalidDateMessage="Data não é valida"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export const DataSemOKCancel = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label={props.label}
            value={selectedDate}
            onChange={handleDateChange}
            disablePast={true}
            autoOk={true}
            inputVariant='standard'
            invalidDateMessage="Data não é valida"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    </ThemeProvider>  
  );
}

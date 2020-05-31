import React from 'react';
import MaskedInput from 'react-text-mask';

export const CpfMask = props => {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-' ,/\d/,/\d/]}
        placeholderChar={'\u2000'}
        showMask={false}
      />
    );
}

//Usar esse mais para quando o CPF for mostrado em um label, ou na table sei lá....os se não quiser que fiquei aparecendo a mascara antes de digitar.
export const CpfMaskFunction = cpf => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}
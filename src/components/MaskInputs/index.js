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
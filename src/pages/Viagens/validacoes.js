import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

export const validacao = async dados => {
    //Validando os dados INICIO
    let ViagemParaValidacao = {
        Vagas: dados.vagas,
        Horario: dados.horario,
        Origem: dados.idReferenciaOrigem === 0 ? '' : dados.idReferenciaOrigem,
        Destino: dados.idReferenciaDestino === 0 ? '' : dados.idReferenciaDestino,
        Veiculo: dados.id_veiculo === 0 ? '' : dados.id_veiculo
    }

    yup.setLocale(validacaoDefinicao);
    const addressSchema = yup.object().shape({
        Vagas: yup
            .string()
            .max(2)
            .required(),
        
        Horario: yup
            .string()
            .max(5)
            .min(5)
            .required(),
        
        Origem: yup
            .string()
            .max(50)
            .required(),
        
        Destino: yup
            .string()
            .max(50)
            .required(),
        
        Veiculo: yup
            .string()
            .max(50)
            .required(),    
            
    })

    let errosValidados = await addressSchema.validate(ViagemParaValidacao, { abortEarly: false })
        .then( () =>  [{ success: 1, msg:"formOk"}] )                    
        .catch( err => {
            let errosValidados =  [{success: 0, msg: 'formError'}]
            err.errors.map( err => {
                errosValidados = [...errosValidados, { msg: err}];
            })
            
            return errosValidados;
    })
    
    //Fazer aqui a validação se eh uma hora valida, talvez criar uma function que valide.
    if( dados.horario !== '' && !validaHora(dados.horario)) {
        errosValidados = [...errosValidados, { msg: 'Horário invalido.'}];
    }

    if(errosValidados[0].success === 0) {
        return errosValidados
    }
    //Validando os dados FINAL

    const dadosViagem = {
        en_situacao: 'aguardando confirmação',
        vagas: dados.vagas,
        hh_horario: dados.horario,
        nr_id_local_referencia_origem: dados.idReferenciaOrigem,
        nr_id_local_referencia_destino: dados.idReferenciaDestino,
        id_veiculo: dados.id_veiculo
    }

    return dadosViagem;
}

function validaHora(hora) {
    if(hora.substring(0,1) < 0 || hora.substring(1,2) < 0 || hora.substring(3,4) < 0 || hora.substring(4,5) < 0) {
        return false
    }

    /* VALIDAÇÂO DAS HORAS */
    //Valida 1 digito da HORA
    if(hora.substring(0,1) > 2) {
        return false
    }

    //Valida 2 digito da HORA
    if(hora.substring(0,1) == 2 && hora.substring(1,2) > 3) {
        return false
    }

    /* VALIDAÇÂO DAS MINITOS */
    //Valida 1 digito da MINUTOS
    if(hora.substring(3,4) > 5) {
        return false
    }

    return true;
}
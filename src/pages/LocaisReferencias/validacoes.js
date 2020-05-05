import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

export const validacao = async dados => {
    //Validando os dados INICIO
    let LocalReferenciaParaValidacao = {
        Local: dados.localReferencia,
        Cidade: dados.idCidade === 0 ? '' : dados.idCidade,
    }

    yup.setLocale(validacaoDefinicao);
    const addressSchema = yup.object().shape({
        Local: yup
            .string()
            .required(),
        
        Cidade: yup
            .string()
            .max(50)
            .required(),  
    })

    let errosValidados = await addressSchema.validate(LocalReferenciaParaValidacao, { abortEarly: false })
        .then( () =>  [{ success: 1, msg:"formOk"}] )                    
        .catch( err => {
            let errosValidados =  [{success: 0, msg: 'formError'}]
            err.errors.map( err => {
                errosValidados = [...errosValidados, { msg: err}];
                return true
            })
            
            return errosValidados;
    })
    //Validando os dados FINAL

    if(errosValidados[0].success === 0) {
        return errosValidados
    }

    const dadosLocalReferencia = {
        st_dsc: dados.localReferencia,
        id_cidade: dados.idCidade
    }

    return dadosLocalReferencia
}
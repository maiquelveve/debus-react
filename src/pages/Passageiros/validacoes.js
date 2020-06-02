import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

export const validacao = async dados => {
    //Validando os dados INICIO
    let PassageiroParaValidacao = {
        Nome: dados.nome.trim(), 
        CPF: dados.cpf.replace(/[^\d]+/g,'') ,
    }
    
    yup.setLocale(validacaoDefinicao);
    const addressSchema = yup.object().shape({
        Nome: yup
            .string()
            .min(2)
            .max(100)
            .required(),

        CPF: yup
            .string()
            .min(11)
            .max(11)
            .required(),
          
    })

    let errosValidados = await addressSchema.validate(PassageiroParaValidacao, { abortEarly: false })
        .then( () =>  [{ success: 1, msg:"formOk"}] )                    
        .catch( err => {
            let errosValidados =  [{success: 0, msg: 'formError'}]
            err.errors.map( err => {
                errosValidados = [...errosValidados, { msg: err}];
                return true
            })
            
            return errosValidados;
    })

    if(errosValidados[0].success === 0) {
        return errosValidados
    }
    //Validando os dados FINAL

    const dadosPassageiro = {
        st_nome: dados.nome,
        st_cpf: dados.cpf,
    }

    return dadosPassageiro;
}
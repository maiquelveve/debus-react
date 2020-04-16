import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { format, parseISO, isAfter } from 'date-fns'

export const validacao = async dados => {
    //Validando os dados INICIO
    let ViagemParaValidacao = {
        Vagas: dados.vagas === 0 || dados.vagas === ''  ? '' :  dados.vagas,
        Horario: dados.horario,
        Origem: dados.idReferenciaOrigem === 0 ? '' : dados.idReferenciaOrigem,
        Destino: dados.idReferenciaDestino === 0 ? '' : dados.idReferenciaDestino,
        Veiculo: dados.id_veiculo === 0 ? '' : dados.id_veiculo,
        Data: dados.data
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
            
        Data: yup   
            .string()
            .required()    
            
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
    
    //Valida de o Horario eh valido
    if( dados.horario !== '' && !validaHora(dados.horario)) {
        errosValidados = [...errosValidados, { msg: 'Horário invalido.'}];
    }

    //Valida de o Horario eh valido
    if( dados.data !== '' && !validaData(dados.data)) {
        errosValidados = [...errosValidados, { msg: 'Data invalida'}];
    }

    //Valida se a quantidade de vagas da viagem não eh maior que a quantidade de acentos do veiculo escolhido 
    if( (dados.vagas !== '' && dados.vagas !== 0) && dados.id_veiculo !== 0 && !await verificaVagasDisponivel(dados.vagas, dados.id_veiculo)) {
        errosValidados = [...errosValidados, { msg: 'Número de vagas é maior que a capacidade de lugares do véiculo'}];
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

function validaData(data) {
    const newYears = new Date('2019, 2, 29');
    console.log(newYears)
    
    // const date1 = '2018-04-11';
    // const date2 = '2018-04-02';
    // const newDate1 = parseISO(date1)
    // const newDate2 = parseISO(date2)
    // const resultado = isAfter(newDate1, newDate2)
    // console.log(resultado)

    //const formattedDate = format(newYears, 'yyyy-MM-dd');
    //console.log(formattedDate);
    return false
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

async function verificaVagasDisponivel(vagas, id_veiculo) {
    try {
        const veiculo = await api.get(`/veiculos/${id_veiculo}`)    

        if(vagas > veiculo.data.nr_lugares) {
            return false
        }

        return true

    } catch (error) {   
        AlertCatch('Ocorreu um erro ao validar se a quantidade de vagas é maior do que a capacidade de lugares do veículo.')
    }
}
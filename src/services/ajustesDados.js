export const ajustaDataFront = data => {
    return data.split('-').reverse().join('/')
}

export const ajustaHoraFront = (hora, isMinuto, isSegundo) => {
    hora = hora.split(':')
    let novaHora = hora[0]
    
    if(isMinuto) {
        novaHora = novaHora + ":" + hora[1]

        if(isSegundo) {
            novaHora = novaHora + ":" + hora[2]
        }
    }

    return novaHora
}

export const ajustaValorFront = valor => {
    return "R$ " + valor.toString().replace('.', ',')            
}
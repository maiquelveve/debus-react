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

export const ajustaPlacaFront = valor => {
    return valor.substring(0, 3) + '-' + valor.substring(3)
}

export const ajusteValorFront = valor => {
    if(valor === 0) {
        return 'À combinar'
    }

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
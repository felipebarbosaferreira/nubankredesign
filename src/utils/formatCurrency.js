export const getValueFormatted = number => {
    // return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return `R$ ${number.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`;
}

export const getValueFormattedHideNumbers = number => {
    return getValueFormatted(number).replace(/\d/g, '*');
}
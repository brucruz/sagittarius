const formatValue = (value: number): string =>
  // Intl.NumberFormat([], {
  //   style: 'decimal',
  //   currency: 'BRL',
  // }).format(value); // TODO
  Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximumFractionDigits: 1,
  }).format(value);

export default formatValue;

const formatValueWo$ = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);

export default formatValueWo$;

export default {
  transactionNotAuthorized: {
    text: 'Transação não autorizada',
    description:
      'O pagamento que você tentou fazer não foi autorizado pelo seu banco. Tente novamente com outro meio de pagamento ou entre em contato com o seu banco para obter mais detalhes.',
    codes: [
      '1000',
      '1002',
      '1005',
      '1009',
      '1013',
      '1019',
      '1020',
      '1024',
      '5088',
    ],
  },
  expiredCard: {
    text: 'Cartão vencido',
    description:
      'O pagamento que você tentou fazer não foi autorizado por que seu cartão de crédito está vencido. Tente novamente com outro meio de pagamento.',
    codes: ['1001', '2001'],
  },
  rejectedEmitter: {
    text: 'Rejeitado pelo emissor do cartão',
    description:
      'O pagamento que você tentou fazer não foi autorizado pelo seu banco. Tente novamente com outro meio de pagamento ou entre em contato com o seu banco para obter mais detalhes.',
    codes: ['1003', '1007', '1008', '1021', '1023'],
  },
  cardWithRestriction: {
    text: 'Cartão com restrição',
    description:
      'O pagamento que você tentou fazer não foi autorizado pelo seu banco por questões de segurança. Entre em contato com o seu banco para autorizar o pagamento ou então tente novamente com outro meio de pagamento.',
    codes: ['1004', '1022', '2000', '2004', '2007', '2008', '2009'],
  },
  internalError: {
    text: 'Erro interno',
    description:
      'Desculpe! O pagamento que você tentou fazer não conseguiu ser processado por um erro desconhecido. Por favor, tente novamente.',
    codes: [
      '5097',
      '9108',
      '9109',
      '9111',
      '9999',
      '5003',
      '5006',
      '5054',
      '5089',
      '5095',
    ],
  },
  incorrectCVV: {
    text: 'CVV inválido',
    description:
      'O pagamento que você tentou fazer não foi autorizado por que o código de segurança (ou CVV) informado está incorreto. Tente novamente se atentando ao preenchimento do cvv',
    codes: ['9124', '1045'],
  },
  invalidCard: {
    text: 'Cartão inválido',
    description:
      'O pagamento que você tentou fazer não foi autorizado por que os dados do cartão estão incorretos. Verifique se foram digitados corretamente os números do cartão, o nome impresso e a data de vencimento.',
    codes: ['1011'],
  },
  insufficientBalance: {
    text: 'Saldo insuficiente',
    description:
      'O pagamento que você tentou fazer não foi autorizado pelo seu banco por saldo insuficiente. Tente novamente com outro meio de pagamento ou entre em contato com o seu banco para obter mais detalhes.',
    codes: ['1016'],
  },
};

export interface IFormPayment {
  full_name?: string;
  document?: {
    type: 'cpf' | 'rne' | 'rg';
    document_number: string;
  };
  email?: string;
  tel?: string;
  payment_method?: 'credit_card' | 'boleto';
  address?: {
    cep: string;
    street: string;
    street_number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  card?: {
    card_id?: string;
    card_number?: string;
    card_holder_name?: string;
    card_expiration_month?: string;
    card_expiration_year?: string;
    card_cvv?: string;
  },
  amount?: number;
  installments?: string;
}
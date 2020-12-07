export default interface CardApiResponse {
  boleto_barcode: string;
  boleto_expiration_date: string;
  boleto_url: string;
  id: string;
  user_id: string;
  payment_method: string;
  object: string;
  foreign_id: string;
  isMain: boolean;
  foreign_date_created: string;
  foreign_date_updated: string;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  country: string;
  fingerprint: string;
  valid: boolean;
  billing_address: {
    object: string;
    id: number;
    name: string;
    address: {
      object: string;
      street: string;
      complementary: string;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    };
  };
  paying_customer: {
    object: string;
    id: number;
    external_id: string;
    type: string;
    country: string;
    document_number: string;
    document_type: string;
    name: string;
    email: string;
    phone_numbers: string[];
    born_at: string;
    birthday: string;
    gender: string;
    date_created: string;
    documents: [
      {
        object: string;
        id: string;
        type: 'cpf';
        number: string;
      },
    ];
  };
  expiration_date: string;
}
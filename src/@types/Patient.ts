import User from "./User";

export default interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  sex: 'male' | 'female';
  email: string;
  phone_whatsapp: string;
  document_id: string;
  document_type: 'RG' | 'CPF' | 'Passaporte' | 'RNE';
  height?: number;
  weight?: number;
  mobility_restrictions?: string;
  user_id: string;
  user: User;
  created_date: Date;
  updated_date: Date;
}

import { boolean } from "yup"

export default interface Card {
  id: string;
  user_id: string;
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
  expiration_date: string;
  created_date: string;
  updated_date: string;
}
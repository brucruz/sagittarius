import Company from './Company';

export default interface Lab {
  id: string;
  title: string;
  slug: string;
  company_id: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  collect_hour: string;
  open_hour: string;
  company: Company;
}

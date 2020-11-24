export default interface BinSearch {
  bank?: {
    name: string;
    phone: string;
    url: string;
  };
  country?: {
    alpha2: string;
    currency: string;
    emoji: string;
    latitude: number;
    longitude: number;
    name: string;
    numeric: string;
  };
  number?: {
    length: string;
    luhn: string;
  },
  type?: string;
  brand?: string;
  prepaid?: boolean;
  scheme?: string;
}
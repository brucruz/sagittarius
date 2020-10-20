import Price from './Price';

export default interface PriceFormatted extends Price {
  formatted_price: string;
  // currencyFormattedPrice: string;
  // numberFormattedPrice: string;
}

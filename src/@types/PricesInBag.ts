import PriceFormatted from './PriceFormatted';
import Lab from './Lab';

export default interface PricesInBag extends Lab {
  price: PriceFormatted[];
}

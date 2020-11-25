import { ReactElement, useState } from 'react';
import { Container } from '@/styles/components/organisms/CreditCardForm';
import Input from '@/components/atom/Input';
import cvvIcon from '@/assets/components/organisms/CreditCardForm/cvv.svg';
import Dropdown from '@/components/atom/Dropdown';
import diners from '@/assets/components/atoms/Input/diners-club.svg';
import amex from '@/assets/components/atoms/Input/american-express.svg';
import visa from '@/assets/components/atoms/Input/visa.svg';
import discover from '@/assets/components/atoms/Input/discover.svg';
import generic from '@/assets/components/atoms/Input/generic.svg';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';
import BinSearch from '@/@types/BinSearch';
import axios, { AxiosResponse } from 'axios';
import Button from '../atom/Button';

const creditCardBrands = {
  amex,
  visa,
  discover,
  generic,
  mastercard,
  diners,
};

const months = [
  { id: 1, label: '01', value: '1' },
  { id: 2, label: '02', value: '2' },
  { id: 3, label: '03', value: '3' },
  { id: 4, label: '04', value: '4' },
  { id: 5, label: '05', value: '5' },
  { id: 6, label: '06', value: '6' },
  { id: 7, label: '07', value: '7' },
  { id: 8, label: '08', value: '8' },
  { id: 9, label: '09', value: '9' },
  { id: 10, label: '10', value: '10' },
  { id: 11, label: '11', value: '11' },
  { id: 12, label: '12', value: '12' },
];

const currentYear = new Date().getFullYear() - 2000;

const years = Array.from(Array(50), (_, index) => ({
  id: index,
  value: `20${index + currentYear}`,
  label: `20${index + currentYear}`,
}));

const CreditCardForm = (): ReactElement => {
  const [creditCardBrand, setCreditCardBrand] = useState('generic');

  return (
    <Container className="credit-card-form">
      <Input
        className="input-credit"
        type="text"
        label="Número do cartão"
        name="ccnum"
        mask="9999 9999 9999 9999"
        onChange={event => {
          const creditCardNumber = event.target.value.replace(
            /[\s*/_*/]/gm,
            '',
          );

          if (creditCardNumber.length === 6 && creditCardNumber !== '') {
            axios
              .get(`https://lookup.binlist.net/${creditCardNumber}`, {
                headers: {
                  'Accept-Version': '3',
                },
              })
              .then((res: AxiosResponse<BinSearch>) =>
                setCreditCardBrand(res.data.scheme),
              )
              .catch(err => setCreditCardBrand('generic'));
          } else if (creditCardNumber.length < 6) {
            setCreditCardBrand('generic');
          }
        }}
        x-autocompletetype="cc-number"
        iconAfter={creditCardBrands[creditCardBrand]}
      />
      <Input
        className="input-credit"
        type="text"
        name="ccname"
        label="Nome impresso no cartão"
      />
      <div className="card-expiration-div">
        <div>
          <Dropdown
            defaultValue="Mês"
            type="small"
            options={months}
            className="small first-dropdown"
          />
        </div>
        <div>
          <Dropdown
            defaultValue="Ano"
            type="small"
            options={years}
            className="small first-dropdown"
          />
        </div>
      </div>
      <div className="cvv-div">
        <div>
          <Input
            className="input-credit"
            type="text"
            name="cvv"
            label="CVV"
            mask="999"
          />
        </div>
        <div>
          <img src={cvvIcon} alt="ícone de cvv" />
        </div>
      </div>
      <div className="installments-container">
        <Dropdown
          defaultValue="Parcelar em"
          options={[{ id: 1, label: 'R$ 1000,00', value: 1000 }]}
        />
      </div>
      <Button disabled>Pagar com Cartão de Crédito</Button>
    </Container>
  );
};

export default CreditCardForm;

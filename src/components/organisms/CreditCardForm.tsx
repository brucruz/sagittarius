import { ReactElement } from 'react';
import { Container } from '@/styles/components/organisms/CreditCardForm';
import Input from '@/components/atom/Input';
import cvvIcon from '@/assets/components/organisms/CreditCardForm/cvv.svg';
import Dropdown from '@/components/atom/Dropdown';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';
import Button from '../atom/Button';

interface IDateDropdown {
  id: number;
  label: string;
  value: string;
}

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

const years = Array.from(Array(50), (_, index) => ({
  id: index,
  value: `20${index >= 10 ? index : `0${index}`}`,
  label: `20${index >= 10 ? index : `0${index}`}`,
}));

const CreditCardForm = (): ReactElement => {
  return (
    <Container className="credit-card-form">
      <Input
        className="input-credit"
        type="text"
        label="Número do cartão"
        name="ccnum"
        mask="9999 9999 9999 9999"
        x-autocompletetype="cc-number"
        iconAfter={mastercard}
      />
      <Input
        className="input-credit"
        type="text"
        name="ccname"
        label="Nome impresso no cartão"
      />
      <div className="card-expiration-div">
        <div>
          <Dropdown defaultValue="Mês" options={months} />
        </div>
        <div>
          <Dropdown defaultValue="Ano" options={years} />
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
      <div>
        <label htmlFor="">Parcelar em: </label>
        {/* <Dropdown>
          <select name="" id="" value="">
            <option value="" disabled>
              1x de R$1000,00
            </option>
          </select>
        </Dropdown> */}
      </div>
      <Button>Pagar com Cartão de Crédito</Button>
    </Container>
  );
};

export default CreditCardForm;

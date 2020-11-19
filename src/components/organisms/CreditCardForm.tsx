import { ReactElement } from 'react';
import {
  Container,
  Dropdown,
} from '@/styles/components/organisms/CreditCardForm';
import InputMask from 'react-input-mask';
import cvvIcon from '@/assets/components/organisms/CreditCardForm/cvv.svg';
import Checkbox from '../atom/Checkbox';
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
      <div>
        <label htmlFor="">Número do cartão</label>
        <InputMask
          type="text"
          name=""
          id=""
          mask="9999 9999 9999 9999"
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <div>
        <label htmlFor="">Nome impresso no cartão</label>
        <input type="text" name="" id="" placeholder="Meu nome" />
      </div>
      <div>
        <label htmlFor="">Validade</label>
        <div>
          <Dropdown>
            <select name="" id="" defaultValue="">
              <option value="" disabled>
                Mês
              </option>
              {months.map((month: IDateDropdown) => (
                <option key={month.id} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </Dropdown>
          <Dropdown>
            <select name="" id="" defaultValue="">
              <option value="" disabled>
                Ano
              </option>
              {years.map((year: IDateDropdown) => (
                <option key={year.id} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </Dropdown>
        </div>
      </div>
      <div className="cvv-div">
        <label>CVV</label>
        <div>
          <InputMask mask="999" type="text" name="" id="" placeholder="123" />
          <img src={cvvIcon} alt="ícone de cvv" />
        </div>
      </div>
      <div>
        <label htmlFor="">Parcelar em: </label>
        <Dropdown>
          <select name="" id="" value="">
            <option value="" disabled>
              1x de R$1000,00
            </option>
          </select>
        </Dropdown>
      </div>
      <Checkbox
        style={{ marginTop: 24 }}
        label="Guardar dados para futuras compras"
        id="keep-card-checkbox"
      />
      <Button>Pagar com Cartão de Crédito</Button>
    </Container>
  );
};

export default CreditCardForm;

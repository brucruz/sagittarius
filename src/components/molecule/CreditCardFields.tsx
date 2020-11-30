import { ReactElement, useState } from 'react';
import Input from '@/components/atom/Input';
import Dropdown from '@/components/atom/Dropdown';
import { usePayment } from '@/hooks/payment';
import diners from '@/assets/components/atoms/Input/diners-club.svg';
import amex from '@/assets/components/atoms/Input/american-express.svg';
import visa from '@/assets/components/atoms/Input/visa.svg';
import discover from '@/assets/components/atoms/Input/discover.svg';
import generic from '@/assets/components/atoms/Input/generic.svg';
import cvvIcon from '@/assets/components/organisms/CreditCardForm/cvv.svg';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';
import axios, { AxiosResponse } from 'axios';
import BinSearch from '@/@types/BinSearch';
import { Container } from '@/styles/components/molecules/CreditCardFields';

const creditCardBrands = {
  amex,
  visa,
  discover,
  generic,
  mastercard,
  diners,
};

interface CreditCardFieldsProps {
  isModal?: boolean;
}

const months = [
  { id: 1, label: '01', value: '01' },
  { id: 2, label: '02', value: '02' },
  { id: 3, label: '03', value: '03' },
  { id: 4, label: '04', value: '04' },
  { id: 5, label: '05', value: '05' },
  { id: 6, label: '06', value: '06' },
  { id: 7, label: '07', value: '07' },
  { id: 8, label: '08', value: '08' },
  { id: 9, label: '09', value: '09' },
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

const CreditCardFields = ({ isModal }: CreditCardFieldsProps): ReactElement => {
  const { paymentData, setPaymentData } = usePayment();
  const [creditCardBrand, setCreditCardBrand] = useState('generic');

  function handleCreditCardNumberOnChange(value): void {
    const creditCardNumber = value.replace(/[\s*/_*/]/gm, '');

    setPaymentData({
      ...paymentData,
      card: { ...paymentData.card, card_number: creditCardNumber },
    });

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
        .catch(() => setCreditCardBrand('generic'));
    } else if (creditCardNumber.length < 6) {
      setCreditCardBrand('generic');
    }
  }

  return (
    <Container>
      <Input
        className="input-credit"
        type="text"
        label="Número do cartão"
        value={paymentData.card?.card_number}
        name="ccnum"
        mask="9999 9999 9999 9999"
        onChange={event => handleCreditCardNumberOnChange(event.target.value)}
        x-autocompletetype="cc-number"
        iconAfter={creditCardBrands[creditCardBrand]}
      />
      <Input
        className="input-credit"
        type="text"
        name="ccname"
        value={paymentData.card?.card_holder_name}
        onChange={event =>
          setPaymentData({
            ...paymentData,
            card: {
              ...paymentData.card,
              card_holder_name: event.target.value,
            },
          })
        }
        label="Nome impresso no cartão"
      />
      <div className="card-expiration-div">
        <div>
          <Dropdown
            defaultValue="Mês"
            options={months}
            type={isModal ? 'large' : 'small'}
            onModal={isModal}
            setValue={value =>
              setPaymentData({
                ...paymentData,
                card: { ...paymentData.card, card_expiration_month: value },
              })
            }
            value={paymentData.card?.card_expiration_month}
            className={`${!isModal && 'small'} first-dropdown`}
          />
        </div>
        <div>
          <Dropdown
            defaultValue="Ano"
            options={years}
            type={isModal ? 'large' : 'small'}
            onModal={isModal}
            setValue={value =>
              setPaymentData({
                ...paymentData,
                card: { ...paymentData.card, card_expiration_year: value },
              })
            }
            value={paymentData.card?.card_expiration_year}
            className={`${!isModal && 'small'} first-dropdown`}
          />
        </div>
      </div>
      <div className="cvv-div">
        <div>
          <Input
            className="input-credit"
            type="text"
            name="cvv"
            value={paymentData.card?.card_cvv}
            onChange={event => {
              const cvv = event.target.value.replace(/[\s*/_*/]/gm, '');
              setPaymentData({
                ...paymentData,
                card: { ...paymentData.card, card_cvv: cvv },
              });
            }}
            label="CVV"
            mask="999"
          />
        </div>
        <div>
          <img src={cvvIcon} alt="ícone de cvv" />
        </div>
      </div>
    </Container>
  );
};

export default CreditCardFields;

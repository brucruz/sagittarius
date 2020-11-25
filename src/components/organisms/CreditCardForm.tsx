import { ReactElement, useState, useEffect } from 'react';
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
import { usePayment } from '@/hooks/payment';
import { useBag } from '@/hooks/bag';
import formatValueWo$ from '@/utils/formatValueWo$';
import axios, { AxiosResponse } from 'axios';
import pagarme from 'pagarme';
import Api from '@/services/api';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
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

const CreditCardForm = (): ReactElement => {
  const [creditCardBrand, setCreditCardBrand] = useState('generic');
  const [isPaymentButtonDisabled, setIsPaymentButtonDisabled] = useState(true);
  const { paymentData, setPaymentData } = usePayment();
  const { bagTotalPriceFormatted, bagItems } = useBag();
  const { user } = useAuth();

  const amountFormatted = Number.parseInt(
    bagTotalPriceFormatted.replace(/[\s*/R$]/gm, '').replace(/,/, '.'),
    10,
  );

  const router = useRouter();

  useEffect(() => {
    if (
      !paymentData.card?.card_holder_name ||
      !paymentData.card?.card_number ||
      !paymentData.card?.card_cvv ||
      !paymentData.card?.card_expiration_month ||
      !paymentData.card?.card_expiration_year ||
      !paymentData.installments
    ) {
      setIsPaymentButtonDisabled(true);
    } else {
      setIsPaymentButtonDisabled(false);
    }
  }, [paymentData, setPaymentData]);

  if (!paymentData.amount) {
    setPaymentData({
      ...paymentData,
      amount: Number.parseInt(
        bagTotalPriceFormatted.replace(/[\s*/,/R$]/gm, ''),
        10,
      ),
    });
  }

  const installments = Array.from(Array(12), (_, index) => ({
    id: index,
    value: `${index + 1}x de R$${formatValueWo$(
      amountFormatted / (index + 1),
    )}`,
    label: `${index + 1}x de R$${formatValueWo$(
      amountFormatted / (index + 1),
    )}`,
  }));

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
        .catch(err => setCreditCardBrand('generic'));
    } else if (creditCardNumber.length < 6) {
      setCreditCardBrand('generic');
    }
  }

  function handlePaymentClick(): void {
    const items = [];

    bagItems.forEach(item => {
      item.price.forEach(price => {
        items.push({
          id: price.exam_id,
          title: price.exam.title,
          unit_price: price.price,
          quantity: 1,
          tangible: false,
        });
      });
    });

    pagarme.client
      .connect({ api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY })
      .then(client =>
        client.transactions.create({
          amount: paymentData.amount,
          card_number: paymentData.card.card_number,
          card_cvv: paymentData.card.card_cvv,
          card_expiration_date: `${paymentData.card.card_expiration_month}${paymentData.card.card_expiration_year[2]}${paymentData.card.card_expiration_year[3]}`,
          card_holder_name: paymentData.card.card_holder_name,
          payment_method: paymentData.payment_method,
          customer: {
            external_id: user.id,
            name: paymentData.full_name,
            email: paymentData.email,
            country: 'br',
            type: 'individual',
            documents: [
              {
                type: 'cpf',
                number: paymentData.document.document_number,
              },
            ],
            phone_numbers: [`+55${paymentData.tel}`],
          },
          billing: {
            name: paymentData.full_name,
            address: {
              street: paymentData.address.street,
              street_number: paymentData.address.street_number,
              zipcode: paymentData.address.cep,
              country: 'br',
              state: paymentData.address.state,
              city: paymentData.address.city,
            },
          },
          installments: paymentData.installments
            ? paymentData.installments.split('x')[0]
            : 1,
          items,
        }),
      )
      .then(transaction => {
        const url = window.location.pathname.split('pagamento')[0];
        const token = localStorage.getItem('@Heali:token');

        Api.post('/payments', transaction, {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }).then(() => {
          if (['paid', 'authorized'].includes(transaction.status)) {
            router.replace(`${url}obrigado`);
          } else if (transaction.status === 'processing') {
            router.replace(`${url}aguardando-aprovacao`);
          } else if (transaction.status === 'refused') {
            router.replace({
              pathname: `${url}erro-no-pagamento`,
              query: {
                status_erro: transaction.acquirer_response_code,
              },
            });
          }
        });
      });
  }

  return (
    <Container className="credit-card-form">
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
            card: { ...paymentData.card, card_holder_name: event.target.value },
          })
        }
        label="Nome impresso no cartão"
      />
      <div className="card-expiration-div">
        <div>
          <Dropdown
            defaultValue="Mês"
            type="small"
            options={months}
            setValue={value =>
              setPaymentData({
                ...paymentData,
                card: { ...paymentData.card, card_expiration_month: value },
              })
            }
            value={paymentData.card?.card_expiration_month}
            className="small first-dropdown"
          />
        </div>
        <div>
          <Dropdown
            defaultValue="Ano"
            type="small"
            options={years}
            setValue={value =>
              setPaymentData({
                ...paymentData,
                card: { ...paymentData.card, card_expiration_year: value },
              })
            }
            value={paymentData.card?.card_expiration_year}
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
      <div className="installments-container">
        <Dropdown
          defaultValue="Parcelar em"
          options={installments}
          value={paymentData.installments}
          setValue={value =>
            setPaymentData({
              ...paymentData,
              installments: value,
            })
          }
        />
      </div>
      <Button disabled={isPaymentButtonDisabled} onClick={handlePaymentClick}>
        Pagar com Cartão de Crédito
      </Button>
    </Container>
  );
};

export default CreditCardForm;

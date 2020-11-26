import { createContext, ReactElement, useContext, useState } from 'react';
import { IFormPayment } from '@/@types/Payment';

interface PaymentContextData {
  paymentData: IFormPayment;
  setPaymentData: (value: IFormPayment) => void;
}

const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData,
);

const PaymentProvider = ({ children }): ReactElement => {
  const [paymentData, setPaymentData] = useState<IFormPayment>({});

  return (
    <PaymentContext.Provider
      value={{
        paymentData,
        setPaymentData,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

function usePayment(): PaymentContextData {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error('useBag must be used within a PaymentProvider');
  }

  return context;
}

export { PaymentProvider, usePayment };

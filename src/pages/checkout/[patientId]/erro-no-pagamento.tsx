import PageTemplate from '@/components/templates/PageTemplate';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/atom/Button';
import { usePayment } from '@/hooks/payment';
import { ErrorContent } from '@/styles/pages/checkout/[patientId]/PaymentError';
import errors from '@/contents/pages/PaymentError/errors';
import { useBag } from '@/hooks/bag';
import { useAuth } from '@/hooks/auth';

interface ErrorInfo {
  text: string;
  description: string;
}
interface RouterQueryParams {
  status_erro?: string;
  patientId?: string;
}

export default function PaymentErrorPage(): ReactElement {
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({} as ErrorInfo);
  const {
    paymentData,
    setPaymentData,
    handlePaymentWithCreditCard,
  } = usePayment();
  const { bagItems } = useBag();
  const { user } = useAuth();
  const params: RouterQueryParams = router.query;

  useEffect(() => {
    const errorKeyFound = Object.keys(errors).filter(key =>
      errors[key].codes.includes(params.status_erro),
    )[0];

    setErrorInfo({
      text: errors[errorKeyFound]?.text,
      description: errors[errorKeyFound]?.description,
    });
  }, [params.status_erro]);

  const getButtonProperties = (
    error: string,
  ): { action: () => void; buttonText: string } => {
    const url = `/checkout/${params.patientId}/pagamento`;

    if (
      errors.transactionNotAuthorized.codes.includes(error) ||
      errors.expiredCard.codes.includes(error) ||
      errors.rejectedEmitter.codes.includes(error) ||
      errors.cardWithRestriction.codes.includes(error) ||
      errors.insufficientBalance.codes.includes(error)
    ) {
      return {
        action: () => {
          delete paymentData.payment_method;

          setPaymentData({
            ...paymentData,
            card: {},
          });

          router.replace(url);
        },
        buttonText: 'Tente novamente com outro meio de pagamento',
      };
    }
    if (
      errors.incorrectCVV.codes.includes(error) ||
      errors.invalidCard.codes.includes(error)
    ) {
      return {
        action: () => {
          setPaymentData({
            ...paymentData,
            payment_method: 'credit_card',
            verifyCard: true,
            card: {},
          });

          router.replace(url);
        },
        buttonText: 'Verificar dados do cartão',
      };
    }

    return {
      action: () => {
        handlePaymentWithCreditCard(bagItems, user);
      },
      buttonText: 'Tente novamente',
    };
  };

  return (
    <PageTemplate
      titleMain={{
        title: 'Erro ao processar seu pagamento',
        subTitle: errorInfo?.text,
      }}
    >
      <ErrorContent>
        <span>{errorInfo?.description}</span>
        <Button
          onClick={() => getButtonProperties(params.status_erro).action()}
        >
          {getButtonProperties(params.status_erro).buttonText}
        </Button>
      </ErrorContent>
    </PageTemplate>
  );
}

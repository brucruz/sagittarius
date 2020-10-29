import { useRouter } from 'next/router';
import PageTemplate from "@/components/templates/PageTemplate";
import Button from '@/components/atom/Button';
import TotalPriceBagContainer from '@/components/molecule/TotalPriceBagContainer';
import deleteIcon from '@/assets/pages/Cart/delete-icon.svg';

import { ItemsContainer, ConfirmOrder, BagContent } from '@/styles/pages/Cart';
import { useBag } from "@/hooks/bag";
import formatValueWo$ from "@/utils/formatValueWo$";
import { useAuth } from '@/hooks/auth';
import { useDates } from '@/hooks/dates';
import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '@/services/api';
import Patient from '@/@types/Patient';
import { format } from 'date-fns';
import { Header, HeaderContent } from '@/styles/pages/checkout/[patientId]/OrderReview';
import { useToast } from '@/hooks/toast';
import Price from '@/@types/Price';
import mixpanel from 'mixpanel-browser';
import User from '@/@types/User';

interface Quote {
  user: User;
  patient: Patient;
  price: Price[];
  dates: {
    from: string;
    to: string;
  };
  hours: string[];
}

const AskingRemainingInfo = () => {

};

const OrderReview = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { bagItems, bagTotalPrice, bagPriceCount, removeBagItem } = useBag();
  const { preferredDateFrom, preferredDateTo, preferredHours } = useDates();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const { patientId } = router.query;

  useEffect(() => {
    api
      .get<Patient>(`patients/${patientId}`, {
        headers: { Authorization: `Bearer: ${token}` },
      })
      .then(response => {
        const patientInApi = response.data;

        setPatient(patientInApi);
      }).catch(err => console.log(err));
  }, [patientId, token]);

  const prices = useMemo(() => {
    const preAdjustedLabsPrices = bagItems.map(lab => {
      const labPrices = lab.price.map(price => {
        const labPrice: Price = {
          id: price.id,
          exam_id: price.exam.id,
          price: price.price,
          exam: {
            id: price.exam.id,
            title: price.exam.title,
            slug: price.exam.slug,
            created_date: price.exam.created_date,
            updated_date: price.exam.updated_date,
            alternative_titles: price.exam.alternative_titles,
          },
          lab: price.lab,
          lab_id: price.lab_id,
          created_date: price.created_date,
        };

        return labPrice;
      });

      return labPrices;
    });

    const labsPrices = preAdjustedLabsPrices.flat();

    return labsPrices;
  }, [bagItems]);

  const formattedPreferredFromDate = preferredDateFrom ? format(preferredDateFrom,'dd/MM/yyyy') : '';
  const formattedPreferredToDate = preferredDateTo ? format(preferredDateTo, 'dd/MM/yyyy') : '';

  console.log(formattedPreferredFromDate);

  const quote = useMemo((): Quote | undefined => {
    if (patient && prices.length >= 0) {
      return {
        user,
        patient,
        price: prices,
        dates: {
          from: formattedPreferredFromDate,
          to: formattedPreferredToDate,
        },
        hours: preferredHours,
      };
    }
  }, [patient, prices, user]);

  const handleSubmitQuote = useCallback(async () => {
    if (prices.length < 1) {
      addToast({
        type: 'error',
        title: 'Não há exames selecionados',
        description: 'Você não adicionou nenhum exame, tente novamente.',
      });

      return;
    }

    await api
      .post<Quote>(`quotes`, quote, {
        headers: { Authorization: `Bearer: ${token}` },
      })
      .then(() => {
        addToast({
          type: 'success',
          title: 'Solicitação recebida',
        });

        user && mixpanel.identify(user.id);
        mixpanel.track('Request Schedule');

        router.push(`/checkout/${patient?.id}/obrigado`);
      })
      .catch(err => {
        console.log(err);

        addToast({
          type: 'error',
          title: 'Erro no agendamento',
          description:
            'Ocorreu um erro ao tentar receber a solicitação de agendamento, tente novamente',
        });
      });
  }, [token, quote, addToast, patient, router, user, prices]);

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
      titleMain={{ title: 'Meu Pedido' }}
    >
      <Header>
        {patient && (
          <HeaderContent>
            <h4>Paciente: <span>{`${patient.first_name} ${patient.last_name}`}</span></h4>

          </HeaderContent>
        )}

        {preferredDateFrom && preferredDateTo && preferredHours && (
          <HeaderContent>
            <h4>Datas selecionadas: <span>{`${formattedPreferredFromDate} à ${formattedPreferredToDate}`}</span></h4>
            <h4>Horários selecionados: {preferredHours.map(hour => (
              <p>{hour}</p>
        ))}</h4>
          </HeaderContent>
        )}
      </Header>

      <BagContent>
        <ItemsContainer>
          <div className="header-items-container">
            <div>
              <span>Exames ({bagPriceCount})</span>
            </div>
            <div>
              <span>Valor</span>
            </div>
          </div>
          <div className="content-items-container">
            {bagItems.map(item => {
              return(
                <div className="lab-item" key={item.id}>
                  <span className="title-lab-item">{item.company.title} - {item.title}</span>
                  {item.price.map(price => {
                    return(
                      <div className="exam-lab-item">
                        <div>
                          <span>{price.exam.title}</span>
                        </div>
                        <div>
                          <span>R$ {formatValueWo$(price.price)}</span>
                          <img onClick={() => removeBagItem(price, item)} src={deleteIcon} alt="Ícone de deletar exame"/>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="desktop-footer">
            <TotalPriceBagContainer totalPrice={bagTotalPrice}/>
          </div>
        </ItemsContainer>
        <ConfirmOrder>
          <TotalPriceBagContainer totalPrice={bagTotalPrice}/>
          <div>
            <Button
              onClick={handleSubmitQuote}
            >
              Confirmar Pedido
            </Button>
          </div>
        </ConfirmOrder>
      </BagContent>
    </PageTemplate>
  );
}

export default OrderReview;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import { format } from 'date-fns';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '@/services/api';

import PageTemplate from '@/components/templates/PageTemplate';
import Button from '@/components/atom/Button';
import TotalPriceBagContainer from '@/components/molecule/TotalPriceBagContainer';
import deleteIcon from '@/assets/pages/Cart/delete-icon.svg';
import Modal from '@/components/organisms/Modal';
import Input from '@/components/atom/Input';

import { ItemsContainer, ConfirmOrder, BagContent } from '@/styles/pages/Cart';
import {
  CloseButton,
  Header,
  HeaderContent,
  ModalFooter,
  ModalHeader,
} from '@/styles/pages/checkout/[patientId]/OrderReview';

import { useBag } from '@/hooks/bag';
import { useAuth } from '@/hooks/auth';
import { useDates } from '@/hooks/dates';
import { useToast } from '@/hooks/toast';

import Patient from '@/@types/Patient';
import Price from '@/@types/Price';
import User from '@/@types/User';

import formatValueWo$ from '@/utils/formatValueWo$';
import { FaWhatsapp } from 'react-icons/fa';
import Checkbox from '@/components/atom/Checkbox';
import { MdClose } from 'react-icons/md';
import getValidationErrors from '@/utils/getValidationErrors';

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

interface ModalData {
  openModal: boolean;
}

interface FormData {
  phone_whatsapp: string;
}

const AskingRemainingInfo = ({ openModal = false }: ModalData) => {
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    setDisplayModal(openModal);
  }, [openModal]);

  const formRef = useRef<FormHandles>(null);

  const router = useRouter();
  const { token, user, updateUser } = useAuth();
  const { addToast } = useToast();

  const { patientId } = router.query;

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Order Review',
    });
  }, [user]);

  const handleSubmit = useCallback(
    async ({ phone_whatsapp }: FormData) => {
      try {
        const updateUserData = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_whatsapp,
        };

        formRef.current?.setErrors({});

        const phoneRegExp = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;

        const schema = Yup.object().shape({
          phone_whatsapp: Yup.string().matches(
            phoneRegExp,
            'Digite o celular com DDD (somente números).',
          ),
        });

        await schema.validate(updateUserData, {
          abortEarly: false,
        });

        const { data: updatedUser } = await api.put<User>(
          '/profile/update',
          updateUserData,
          {
            headers: { Authorization: `Bearer: ${token}` },
          },
        );

        updateUser(updatedUser);

        user && mixpanel.identify(user.id);

        mixpanel.register(
          {
            whatsapp: updatedUser.phone_whatsapp,
          },
          1,
        );

        mixpanel.track('Updated Whatsapp');

        router.push({
          pathname: `/checkout/${patientId}/obrigado`,
        });

        addToast({
          type: 'success',
          title: 'Solicitação recebida',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err.response.data);

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao completar seu cadastro, tente novamente.',
        });
      }
    },
    [addToast, router],
  );

  return (
    <Modal isOpen={displayModal} setIsOpen={() => setDisplayModal(false)}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ModalHeader>
          <CloseButton onClick={() => setDisplayModal(false)}>
            <MdClose />
          </CloseButton>

          <h3>
            Ops!
            <br /> Complete seu cadastro.
          </h3>

          <h5>
            Para continuarmos, precisamos que complete os dados faltantes
            abaixo:
          </h5>

          <Input
            name="phone_whatsapp"
            label="Whatsapp"
            icon={FaWhatsapp}
            isSubmit
          />

          {/* <p>Termos de  política de privacidade</p>

          <Checkbox id='privacy-policy' label='Declaro que li e concordo com os termos de política de privacidade' /> */}
        </ModalHeader>

        <ModalFooter>
          <div>
            <Button type="submit">Atualizar Cadastro</Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

const OrderReview = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      })
      .catch(err => console.log(err));
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

  const formattedPreferredFromDate = preferredDateFrom
    ? format(preferredDateFrom, 'dd/MM/yyyy')
    : '';
  const formattedPreferredToDate = preferredDateTo
    ? format(preferredDateTo, 'dd/MM/yyyy')
    : '';

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

        if (!user.phone_whatsapp) {
          setModalOpen(true);

          return;
        }

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
            <h4>
              Paciente:{' '}
              <span>{`${patient.first_name} ${patient.last_name}`}</span>
            </h4>
          </HeaderContent>
        )}

        {preferredDateFrom && preferredDateTo && preferredHours && (
          <HeaderContent>
            <h4>
              Datas selecionadas:{' '}
              <span>{`${formattedPreferredFromDate} à ${formattedPreferredToDate}`}</span>
            </h4>
            <h4>
              Horários selecionados:{' '}
              {preferredHours.map(hour => (
                <p>{hour}</p>
              ))}
            </h4>
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
              return (
                <div className="lab-item" key={item.id}>
                  <span className="title-lab-item">
                    {item.company.title} - {item.title}
                  </span>
                  {item.price.map(price => {
                    return (
                      <div className="exam-lab-item">
                        <div>
                          <span>{price.exam.title}</span>
                        </div>
                        <div>
                          <span>R$ {formatValueWo$(price.price)}</span>
                          <img
                            onClick={() => removeBagItem(price, item)}
                            src={deleteIcon}
                            alt="Ícone de deletar exame"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="desktop-footer">
            <TotalPriceBagContainer totalPrice={bagTotalPrice} />
          </div>
        </ItemsContainer>
        <ConfirmOrder>
          <TotalPriceBagContainer totalPrice={bagTotalPrice} />
          <div>
            <Button onClick={handleSubmitQuote}>Confirmar Pedido</Button>
          </div>
        </ConfirmOrder>
      </BagContent>

      <AskingRemainingInfo openModal={modalOpen} />
    </PageTemplate>
  );
};

export default OrderReview;

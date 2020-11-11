import mixpanel from 'mixpanel-browser';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import PageTemplate from '@/components/templates/PageTemplate';
import { buildSearchQuery } from '@/helpers/searchExams';
import { useAuth } from '@/hooks/auth';
import { useBag } from '@/hooks/bag';
import { useSearchExam } from '@/hooks/searchExam';
import { useToast } from '@/hooks/toast';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import api from '@/services/api';
import getValidationErrors from '@/utils/getValidationErrors';
import Input from '@/components/atom/Input';
import { MdLock, MdMail, MdPerson } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { InputGroupTitle } from '@/styles/pages/SignUp';
import Button from '@/components/atom/Button';
import SEO from '@/components/atom/SEO';

interface RouterQueryParams {
  isBeforeSchedule?: boolean;
}

interface SigUpFormData {
  first_name: string;
  last_name: string;
  phone_whatsapp: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUpPage = (): ReactElement => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signIn, user } = useAuth();
  const { exams, address } = useSearchExam();
  const { bagItems } = useBag();

  const params: RouterQueryParams = router.query;

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Sign Up',
    });
  }, [user]);

  const authRedirect = useCallback(() => {
    const searchQueries = buildSearchQuery(address, exams);

    if (params.isBeforeSchedule && bagItems.length > 0) {
      router.push('/checkout/paciente');
    } else if (searchQueries && exams.length > 0 && address) {
      router.push({
        pathname: '/resultado',
        search: searchQueries || '',
      });
    } else {
      router.push('/');
    }
  }, [address, exams, router, bagItems, params]);

  const handleSubmit = useCallback(
    async (data: SigUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const phoneRegExp = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome obrigatório.'),
          last_name: Yup.string().required('Sobrenome obrigatório.'),
          phone_whatsapp: Yup.string()
            .matches(phoneRegExp, 'Digite o celular com DDD (somente números.)')
            .required(
              'Informe seu whatsapp para podermos nos comunicar com você.',
            ),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos.')
            .required('Sua senha precisa ter no mínimo 6 dígitos.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'A confirmação de senha deve ser idêntica à senha digitada.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, first_name, last_name, password, phone_whatsapp } = data;

        const postRequestContent = {
          first_name,
          last_name,
          phone_whatsapp,
          email,
          password,
        };

        await api.post('/users', postRequestContent);

        await signIn({
          email: data.email,
          password: data.password,
        });

        authRedirect();

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response.data.error === 'Email address already used') {
          addToast({
            type: 'error',
            title: 'Usuário já cadastrado',
            description:
              'O e-mail informado já está sendo utilizado por outro usuário, tente fazer login com este e-mail.',
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, signIn, authRedirect],
  );

  return (
    <PageTemplate
      buttonType={{
        type: 'link',
        backLinkUrl: {
          pathname: '/login',
          query: {
            isBeforeSchedule:
              params.isBeforeSchedule &&
              params.isBeforeSchedule.valueOf.toString(),
          },
        },
      }}
      titleMain={{
        title: 'Criar conta',
        subTitle: 'Digite seus dados para continuar',
      }}
    >
      <SEO
        title="Cadastre-se"
        description="Faça seu cadastro para agendar seus exames médicos de forma rápida, simples e segura"
        canonical="cadastro"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroupTitle>Dados Pessoais</InputGroupTitle>

        <Input name="first_name" label="Nome *" icon={MdPerson} isSubmit />
        <Input name="last_name" label="Sobrenome *" icon={MdPerson} isSubmit />

        <InputGroupTitle>Contato</InputGroupTitle>

        <Input name="email" label="E-mail *" icon={MdMail} isSubmit />
        <Input
          name="phone_whatsapp"
          label="WhatsApp *"
          icon={FaWhatsapp}
          isSubmit
        />

        <InputGroupTitle>Segurança</InputGroupTitle>

        <Input
          name="password"
          type="password"
          label="Senha *"
          icon={MdLock}
          isSubmit
        />
        <Input
          name="password_confirmation"
          type="password"
          label="Confirmação de Senha *"
          icon={MdLock}
          isSubmit
        />

        <Button
          type="submit"
          // disabled={!emailValue || !passwordValue}
        >
          Cadastrar
        </Button>
      </Form>
    </PageTemplate>
  );
};

export default SignUpPage;

import PageTemplate from '@/components/templates/PageTemplate';
import { ReactElement, useRef, useCallback, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdEmail } from 'react-icons/md';
import * as Yup from 'yup';
import api from '@/services/api';
import getValidationErrors from '@/utils/getValidationErrors';
import Input from '@/components/atom/Input';
import Button from '@/components/atom/Button';
import { useToast } from '@/hooks/toast';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import SEO from '@/components/atom/SEO';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPassword(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Forgot Password',
    });
  }, [user]);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        user && mixpanel.identify(user.id);
        mixpanel.track('User requested reset password');

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      }
    },
    [addToast, user],
  );

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
      titleMain={{
        title: 'Recupere sua senha',
        subTitle: 'Digite seus dados para continuar',
      }}
    >
      <SEO
        title="Esqueci minha senha"
        description="Informe seu e-mail para que você possa recuperar sua senha"
        canonical="esqueci-minha-senha"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          icon={MdEmail}
          isSubmit
          type="email"
          name="email"
          label="E-mail"
        />
        <Button type="submit" className="margin-top">
          Recuperar senha
        </Button>
      </Form>
    </PageTemplate>
  );
}

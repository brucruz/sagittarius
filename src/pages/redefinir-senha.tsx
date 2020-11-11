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
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import SEO from '@/components/atom/SEO';

interface QueryParams {
  token?: string;
}

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

export default function ResetPassword(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const router = useRouter();
  const params: QueryParams = router.query;

  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Reset Password',
    });
  }, [user]);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const { token } = params;

        if (!token) {
          throw new Error();
        }

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        });

        user && mixpanel.identify(user.id);
        mixpanel.track('Reset password');

        router.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao trocar senha',
          description: 'Ocorreu um erro ao trocar sua senha, tente novamente.',
        });
      }
    },
    [addToast, params, router, user],
  );

  return (
    <PageTemplate
      titleMain={{
        title: 'Troque sua senha',
        subTitle: 'Digite a nova senha continuar',
      }}
    >
      <SEO
        title="Redefina sua senha"
        description="Informe uma nova senha para que você possa continuar acessando a Heali"
        canonical="redefinir senha"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          icon={MdEmail}
          isSubmit
          type="password"
          name="password"
          label="Nova senha"
        />
        <Input
          icon={MdEmail}
          isSubmit
          type="password"
          name="password_confirmation"
          label="Confirmar nova senha"
        />
        <Button type="submit">Trocar senha</Button>
      </Form>
    </PageTemplate>
  );
}

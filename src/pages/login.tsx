import Link from 'next/link';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import FacebookLogin, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login/dist/facebook-login-render-props';
import { MdEmail, MdLock } from 'react-icons/md';
import PageTemplate from '@/components/templates/PageTemplate';
import Input from '@/components/atom/Input';
import Button from '@/components/atom/Button';
import { useAuth, AuthState } from '@/hooks/auth';
import { useToast } from '@/hooks/toast';
import getValidationErrors from '@/utils/getValidationErrors';
import {
  SocialButton,
  SocialButtonsContainer,
  RegisterLink,
  ForgotPassword,
} from '@/styles/pages/Login';
import api from '@/services/api';
import { buildSearchQuery } from '@/helpers/searchExams';
import { useSearchExam } from '@/hooks/searchExam';
import { useBag } from '@/hooks/bag';
import mixpanel from 'mixpanel-browser';
import SEO from '@/components/atom/SEO';

interface RouterQueryParams {
  isBeforeSchedule?: boolean;
}

interface FormProps {
  email?: string;
  password?: string;
}

export default function Login(): ReactElement {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const [formState, setFormState] = useState<FormProps>({
    email: '',
    password: '',
  });

  const { signIn, socialNetworkSignIn } = useAuth();
  const { addToast } = useToast();
  const { address, exams } = useSearchExam();
  const { bagItems } = useBag();
  const { user } = useAuth();

  const params: RouterQueryParams = router.query;

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Sign In',
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

  function saveUserAuthenticated(data: AuthState): void {
    socialNetworkSignIn(data);
    authRedirect();
  }

  async function handleGoogleLogin(response): Promise<void> {
    const onlineResponse = response as GoogleLoginResponse;

    const { data } = await api.post('/sessions/google', {
      googleTokenId: onlineResponse.tokenId,
    });

    saveUserAuthenticated(data);
  }

  async function handleFacebookLogin(
    response: ReactFacebookLoginInfo,
  ): Promise<void> {
    const { data } = await api.post('/sessions/facebook', {
      facebookTokenId: response.accessToken,
    });

    saveUserAuthenticated(data);
  }

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        authRedirect();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (
          err.response.data.message === 'Incorrect email/password combination'
        ) {
          addToast({
            type: 'error',
            title: 'Dados incorretos',
            description:
              'Os dados informados estão incorretos, cheque as credenciais.',
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [authRedirect, addToast, signIn],
  );

  const handleFormChange = useCallback(() => {
    setFormState({
      email: formRef.current.getFieldValue('email'),
      password: formRef.current.getFieldValue('password'),
    });
  }, []);

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
      titleMain={{
        title: 'Acesse sua conta',
        subTitle: 'Digite seus dados para continuar',
      }}
    >
      <SEO
        title="Acesse"
        description="Faça seu login para agendar seus exames médicos de forma rápida, simples e segura"
      />

      <Form ref={formRef} onSubmit={handleSubmit} onChange={handleFormChange}>
        <Input
          name="email"
          label="E-mail"
          type="email"
          icon={MdEmail}
          isSubmit
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          icon={MdLock}
          isSubmit
        />
        <Link href="">
          <ForgotPassword>Esqueci minha senha</ForgotPassword>
        </Link>
        <Button
          type="submit"
          disabled={!formState.password || !formState.email}
        >
          Entrar
        </Button>
        <span>Ou acesse com sua conta social</span>
        <SocialButtonsContainer>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ''}
            buttonText="Entrar com Google"
            render={renderProps => (
              <SocialButton onClick={renderProps.onClick}>Google</SocialButton>
            )}
            onSuccess={handleGoogleLogin}
          />
          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
            fields="name, email, picture"
            render={renderProps => (
              <SocialButton onClick={renderProps.onClick}>
                Facebook
              </SocialButton>
            )}
            callback={handleFacebookLogin}
          />
        </SocialButtonsContainer>
        <Link
          href={{
            pathname: '/cadastro',
            query: { isBeforeSchedule: !!params.isBeforeSchedule },
          }}
        >
          <RegisterLink>
            Não tem uma conta? <span>Cadastre-se</span>
          </RegisterLink>
        </Link>
      </Form>
    </PageTemplate>
  );
}

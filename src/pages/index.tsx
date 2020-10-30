import dynamic from 'next/dynamic';

import Accordion from "@/components/molecule/Accordion";
import Footer from "@/components/organisms/Footer";
import Section from "@/components/organisms/Section";
import { faqQuestions } from "@/contents/pages/Home/faq";
import howItWorks from "@/contents/pages/Home/howItWorks";
import ourServices from "@/contents/pages/Home/ourServices";
import MapsScript from "@/services/components/MapsScript";
import { PaymentOption, PaymentOptions, SectionAbout, SectionFAQ, SectionPayment } from "@/styles/pages/Home";
import WhatsappWidget from '@/components/atom/WhatsappWidget';
import Navbar from "../components/organisms/Navbar";
import InitialState from '@/components/molecule/HomeInitialState';
import mastercardImg from '@/assets/pages/Home/master-card.svg';
import visaImg from '@/assets/pages/Home/visa-card.svg';
import dinnerImg from '@/assets/pages/Home/dinner-card.svg';
import picpayImg from '@/assets/pages/Home/picpay-card.svg';
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import { useAuth } from '@/hooks/auth';

const SearchExam = dynamic(
  () => import("@/components/organisms/SearchExam"),
  {
    loading: () => <InitialState/>,
    ssr: true,
  }
);

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Home',
    });
  }, [user]);

  return (
    <>
      <MapsScript />

      <Navbar />

      <SearchExam />

      <SectionAbout id='sobre'>
        <h2>Sobre a Heali</h2>

        <article>
          <p>
            A Heali te conecta a uma rede de laboratórios parceiros. Você escolhe a melhorar opção para fazer seus exames médicos, pertinho do seu endereço.
          </p>
          <p>
          Compare preços e agende seus exames de forma rápida, simples e segura.
          </p>
        </article>
      </SectionAbout>

      <Section id='como-funciona' title='Como Funciona' articles={howItWorks}/>

      <Section id='nossos-servicos' title='Nossos Serviços' articles={ourServices}/>

      <SectionPayment id='pagamento'>
        <h2>Formas de Pagamento</h2>

        <p>Para facilitar ainda mais, aceitamos diversas formas de pagamento:</p>

        <PaymentOptions>
          <PaymentOption>
            <img src={visaImg} alt="Ícone cartão de crédito Visa" />
          </PaymentOption>

          <PaymentOption>
            <img src={mastercardImg} alt="Ícone cartão de crédito Mastercard" />
          </PaymentOption>

          <PaymentOption>
            <img src={dinnerImg} alt="Ícone cartão de crédito Dinner Club" />
          </PaymentOption>

          <PaymentOption>
            <img src={picpayImg} alt="Ícone Picpay" />
          </PaymentOption>
        </PaymentOptions>
      </SectionPayment>

      <SectionFAQ id='faq'>
        <h2>Perguntas Frequentes</h2>

        {faqQuestions?.map(question => {
        return (
          <Accordion
            key={`question-${question.id}`}
            text={question}
            index={question.id}
          />
        );
      })}
      </SectionFAQ>

      <Footer />
      <WhatsappWidget />

    </>
  )
}

export default Home;

import useSWR from 'swr';
import Accordion from "@/components/molecule/Accordion";
import Footer from "@/components/organisms/Footer";
import SearchExam from "@/components/organisms/SearchExam";
import Section from "@/components/organisms/Section";
import { faqQuestions } from "@/contents/pages/Home/faq";
import howItWorks from "@/contents/pages/Home/howItWorks";
import ourServices from "@/contents/pages/Home/ourServices";
import { PaymentOption, PaymentOptions, SectionAbout, SectionFAQ, SectionPayment } from "@/styles/pages/Home";
import { useEffect } from "react"
import Navbar from "../components/organisms/Navbar";
import { useFetch } from '../services/hooks/useFetch';

const Home = () => {
  const t = 'ok'

  const { data } = useFetch('/patients', {
    params: { test: 'aaaa' },
    headers: { Authorization: `Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDMyMTEzMDcsImV4cCI6MTYwNTgwMzMwNywic3ViIjoiYWFkZTUyNjItMjk3ZS00ZjM1LWE4NGYtYTQyNmFhMTU5Y2Q0In0.dkNRAG8TW8kYbxKpsN6gO0uUzqOnDsgN4WMdLbtcPmY` },
  });

  return (
    <>
      <Navbar />

      <SearchExam />

      <SectionAbout>
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

      <Section title='Como Funciona' articles={howItWorks}/>

      <Section title='Nossos Serviços' articles={ourServices}/>

      <SectionPayment>
        <h2>Formas de Pagamento</h2>

        <p>Para facilitar ainda mais, aceitamos diversas formas de pagamento:</p>

        <PaymentOptions>
          <PaymentOption>
            <p>Cartão de crédito</p>
          </PaymentOption>

          <PaymentOption>
            <p>Boleto bancário</p>
          </PaymentOption>

          <PaymentOption>
            <p>PicPay</p>
          </PaymentOption>

          <PaymentOption>
            <p>PIX (em breve)</p>
          </PaymentOption>
        </PaymentOptions>
      </SectionPayment>

      <SectionFAQ>
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
    </>
  )
}

export default Home;

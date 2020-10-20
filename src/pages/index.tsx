import Accordion from "@/components/molecule/Accordion";
import Footer from "@/components/organisms/Footer";
import SearchExam from "@/components/organisms/SearchExam";
import Section from "@/components/organisms/Section";
import { faqQuestions } from "@/contents/pages/Home/faq";
import howItWorks from "@/contents/pages/Home/howItWorks";
import ourServices from "@/contents/pages/Home/ourServices";
import MapsScript from "@/services/components/MapsScript";
import { PaymentOption, PaymentOptions, SectionAbout, SectionFAQ, SectionPayment } from "@/styles/pages/Home";
import { useEffect } from "react"
import Navbar from "../components/organisms/Navbar";

const Home = () => {
  const t = 'ok'

  useEffect(() => {
    console.log(t);
  }, [])


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

      <MapsScript />
    </>
  )
}

export default Home;

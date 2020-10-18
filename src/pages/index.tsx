import SearchExam from "@/components/organisms/SearchExam";
import Section from "@/components/organisms/Section";
import HowItWorks from "@/contents/pages/Home/HowItWorks";
import OurServices from "@/contents/pages/Home/OurServices";
import { SectionAbout } from "@/styles/pages/Home";
import { useEffect } from "react"
import Navbar from "../components/organisms/Navbar";

export default function Home() {
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

      <Section title='Como Funciona' articles={HowItWorks}/>

      <Section title='Nossos Serviços' articles={OurServices}/>
    </>
  )
}

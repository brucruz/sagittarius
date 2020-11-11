interface FaqQuestionsType {
  id: number;
  question: string;
  answer: string;
}

export const faqQuestions: FaqQuestionsType[] = [
  {
    id: 1,
    question: 'Posso agendar vários exames para o mesmo dia?',
    answer: `Na Heali, você consegue definir que todos os exames serão feitos no mesmo dia e local. Quem agenda os exames pela Heali tem a garantia que faremos o possível para que você faça todos os exames com a <strong>maior comodidade possível</strong> e isso inclui a <strong>praticidade</strong> de fazer <strong>todos no mesmo dia</strong>. Porém, algumas restrições podem se aplicar:<br><br>
    - Alguns exames possuem <strong>preparo específico</strong>, que podem ser simples como um jejum de algumas poucas horas ou mais complexos como tomar alguns dias de medicamentos. É possível que haja <strong>conflito entre os preparos dos exames</strong>. Nesses casos, precisamos que os exames sejam feitos em datas diferentes para que o resultado do exame não fique prejudicado ou que sua saúde e segurança fique em risco.<br><br>
    - O agendamento de exames está <strong>sujeito à disponibilidade do laboratório escolhido</strong>. Nesse caso, você pode optar por fazer seus exames numa data mais próxima, porém em dias diferentes, ou aguardar uma data mais distante em que seja possível conciliar os horários.`,
  },
  {
    id: 2,
    question: 'Tenho urgência em agendar. O que faço?',
    answer: `Dependendo do momento de confirmação do pagamento, <strong>você pode fazer seus exames hoje mesmo</strong>. Então, vale lembrar que o pagamento via boleto leva até 3 dias úteis para que a Heali consiga confirmá-lo. Em segundo lugar, precisamos confirmar se existem <strong>horários disponíveis</strong> para o dia e horário pretendido.<br><br>
    Se quiser agilizar seu exame, mande um <strong><a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5511936186364">whatsapp</a></strong> pra gente ou ainda um <strong>email para <a href="mailto:ola@heali.me">ola@heali.me</a></strong>.`,
  },
  {
    id: 3,
    question: 'Quando receberei as instruções de preparo do exame?',
    answer: `Assim que <strong>confirmarmos o pagamento</strong>, entraremos em contato contigo via <strong>email e whatsapp</strong> para te explicarmos todas as instruções de preparo do exame.`,
  },
  {
    id: 4,
    question: 'Como devo procede no dia do exame?',
    answer: `Fique tranquilo que vamos te passar todas as instruções. Você deve comparecer no dia e horário agendado e <strong>apresentar o voucher</strong> que vamos te encaminhar. Então, <strong>você será atendido normalmente</strong>. Em caso de dúvida, nos mande uma mensagem por email para <a href="mailto:ola@heali.me">ola@heali.me</a> ou por <a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5511936186364">whatsapp</a>.`,
  },
];

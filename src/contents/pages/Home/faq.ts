interface FaqQuestionsType {
  id: number;
  question: string;
  answer: string;
}

export const faqQuestions: FaqQuestionsType[] = [
  {
    id: 1,
    question: 'A Heali é um laboratório?',
    answer: `Não. A Heali permite que você pesquise, compare e agende
      seus exames de diversos laboratórios diferentes diretamente conosco.
      Dessa maneira, todo o processo de cotação, comparação de opções e
      encontrar o melhor horário fica por nossa conta.
      Então, escolha a forma de pagamento que preferir que
      repassaremos o valor pago aos laboratórios.
      Fique tranquilo, você não vai pagar mais por isso.<br><br>Ao final,
      basta você comparecer no dia e horário agendado com nosso voucher
      e fazer seus exames diretamente em nossos laboratórios parceiros.`,
  },
  {
    id: 2,
    question: 'Como faço para encontrar meus exames?',
    answer: `Você deve digitar cada exame que pretende encontrar na
      <a href="#search-input">barra de pesquisa aqui</a>,
      então clique na opção para
      adicionar à pesquisa. Por fim, digite seu endereço para que
      possamos indicar laboratórios mais próximos de você.
      Com os exames selecionados e o campo de endereço preenchido,
      basta clicar no botão “Pesquisar” para ver os resultados.`,
  },
  {
    id: 3,
    question: 'Não consigo localizar meus exames, o que eu faço?',
    answer: `Infelizmente, isso às vezes pode
      acontecer. Cada exame possui diversas grafias distintas,
      o que nos leva a trabalhar dia e noite para que a experiência de
      busca na Heali seja cada dia melhor.<br><br>Então, caso você não
      encontre os exames que procura, nos mande uma mensagem no email
      <a href="mailto:ola@heali.me">ola@heali.me</a> ou
      em nosso <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://api.whatsapp.com/send?phone=5511936186364"
      >whatsapp</a>,
      que iremos ajudá-lo o quanto antes.`,
  },
  {
    id: 4,
    question: 'Como eu faço para agendar vários exames de uma só vez?',
    answer: `Nós sabemos que muitas vezes, temos uma lista extensa de
      exames a fazer, então todo o site da Heali é preparado para que
      você pesquise e agende todos os exames de uma vez.
      <br><br>
      O processo é o mesmo: digite o exame que quer encontrar na
      <a href="#search-input">barra de pesquisa<a> e clique para adicionar
      cada um dos exames. Em seguida, informe seu endereço para
      encontrarmos laboratórios mais próximos a você. Com os exames
      selecionados e o campo de endereço preenchido, basta clicar no
      botão “Pesquisar” para ver os resultados. Então, escolha o laboratório
      que preferir e selecione os exames que deseja fazer nele. É possível
      adicionar exames em laboratórios diferentes, caso prefira. Por fim,
      informe os dados do paciente que fará os exames, escolha a forma de
      pagamento e pronto! Entraremos em contato para confirmar seu agendamento
      e no final basta comparecer no dia e local escolhido para fazer o exame
      diretamente no laboratório de sua escolha.
    `,
  },
  {
    id: 5,
    question:
      'Gostaria de agendar todos os exames para o mesmo dia, é possível?',
    answer: `Sim, é possível sim. Quem agenda os exames pela Heali tem a
      garantia que vamos fazer o possível para que você faça todos
      os exames com a maior comodidade possível e isso inclui a
      praticidade de fazer todos no mesmo dia. Porém, algumas restrições
      podem se aplicar:
      <br><br>
      - Alguns exames possuem preparo específico, que podem ser simples
      como um jejum de algumas poucas horas ou mais complexos como
      tomar alguns dias de medicamentos. É possível que haja conflito
      entre os preparos dos exames. Nesses casos, precisamos que os
      exames sejam feitos em datas diferentes para que o resultado
      do exame não fique prejudicado ou que sua saúde e segurança fique em risco.
      <br><br>
      - Também é possível que não haja horários disponíveis para
      fazer todos os exames no mesmo dia no local escolhido. Nesse caso,
      você pode optar por fazer seus exames numa data mais próxima,
      porém em dias diferentes, ou aguardar uma data mais distante em
      que seja possível conciliar os horários.
    `,
  },
  {
    id: 6,
    question:
      'Tenho muita urgência para agendar meus exames. Consigo agendar com a Heali a partir de qual data?',
    answer: `Dependendo do momento de confirmação do pagamento,
      você pode fazer seus exames hoje mesmo. Então, vale lembrar
      que o pagamento via boleto leva até 3 dias úteis para que
      a Heali consiga confirmá-lo. Em segundo lugar, precisamos
      confirmar se existem horários disponíveis para o dia e horário pretendido.
      <br><br>
      Se quiser agilizar seu exame, mande um <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://api.whatsapp.com/send?phone=5511936186364"
      >whatsapp</a> pra gente
      ou ainda um email para <a href="mailto:ola@heali.me">ola@heali.me</a>.
    `,
  },
  {
    id: 7,
    question: 'Nenhum laboratório faz todos os exames que preciso. O que faço?',
    answer: `Isso pode acontecer, especialmente se a lista de exames
      que você precisa for bastante extensa. Neste caso, o processo de
      agendamento no site da Heali é o mesmo, porém no momento
      de adicionar cada exame ao carrinho, você precisará escolher
      exames de dois ou mais laboratórios. No final, vamos te enviar
      as instruções para que você faça seus exames em cada um dos
      endereços escolhidos.`,
  },
  {
    id: 8,
    question:
      'Como funciona o pagamento? Eu pago para a Heali ou para o laboratório?',
    answer: `Se preferir toda a comodidade de agendar os exames
      diretamente com a Heali, você paga para nós e, em seguida,
      nós repassamos o valor para os laboratórios. Fique tranquilo,
      porque não vamos te cobrar a mais por isso.
    `,
  },
  {
    id: 9,
    question: 'Quais são as formas de pagamento aceitas?',
    answer: `Atualmente, nós aceitamos pagamento via cartão de
      crédito ou boleto bancário.`,
  },
  {
    id: 10,
    question: 'Quando receberei as instruções de preparo do exame?',
    answer: `Assim que confirmarmos o pagamento, entraremos
      em contato contigo via email e whatsapp para te explicarmos
      todas as instruções de preparo do exame.
    `,
  },
  {
    id: 11,
    question: 'No dia do exame, como devo proceder?',
    answer: `Fique tranquilo que vamos te passar todas as instruções.
      Você deve comparecer no dia e horário agendado e apresentar o
      voucher que vamos te encaminhar. Então, você será
      atendido normalmente. Em caso de dúvida, nos mande
      uma mensagem por email para <a href="mailto:ola@heali.me">ola@heali.me</a> ou
      por <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://api.whatsapp.com/send?phone=5511936186364"
      >whatsapp</a>.`,
  },
];

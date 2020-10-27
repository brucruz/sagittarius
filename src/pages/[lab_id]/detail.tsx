import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import PriceFormatted from '@/@types/PriceFormatted';
import PageTemplate from "@/components/templates/PageTemplate";
import useFetch from '@/services/hooks/useFetch';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import labIcon from '@/assets/components/molecules/LabInfo/lab.svg';
import clockIcon from '@/assets/components/molecules/LabInfo/clock.svg';
import locationIcon from '@/assets/components/molecules/LabInfo/location.svg';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { 
  Container,
  Content,
  CompanyTitle,
  BagContainer,
  ExamContainer,
  LabInfoContainer, 
} from '@/styles/pages/Lab/Detail';
import LabInfo from '@/components/molecule/LabInfo';
import Link from 'next/link';
import Button from '@/components/atom/Button';
import bagIcon from '@/assets/pages/LabDetail/bag-icon.svg';
import Checkbox from '@/components/atom/Checkbox';
import formatValueWo$ from '@/utils/formatValueWo$';
import { useBag } from '@/hooks/bag';
import PricesInBag from '@/@types/PricesInBag';
import { useAuth } from '@/hooks/auth';

interface QueryParamsProps {
  ids?: string[];
  add?: string;
  lat?: string;
  lng?: string;
  lab_id?: string,
}

interface LabPricesResultFromAPI extends LabResultFromAPI {
  prices: PriceFormatted[];
}

export default function Detail() {

  const [displayListExams, setDisplayListExams] = useState(true);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  
  const router = useRouter();
  const queryParams: QueryParamsProps = router.query;

  const { addBagItem } = useBag();
  const { user } = useAuth();

  const { data } = useFetch<LabPricesResultFromAPI>(`/search/${queryParams.lab_id}/results`, {
    params: {
      ids: queryParams && queryParams['ids[]'],
      add: queryParams && encodeURIComponent(queryParams.add),
      lat: queryParams && encodeURIComponent(queryParams.lat),
      lng: queryParams && encodeURIComponent(queryParams.lng),
    },
  });

  const handlePriceSelection = useCallback(
    (): void => {
      data.prices.map((price) => {

        if (!selectedExams.includes(price.exam_id)) return;

        const itemToAdd: PricesInBag = {
          id: price.lab.id,
          title: price.lab.title,
          slug: price.lab.slug,
          address: price.lab.address,
          city: price.lab.city,
          state: price.lab.state,
          latitude: price.lab.latitude,
          longitude: price.lab.longitude,
          collect_hour: price.lab.collect_hour,
          open_hour: price.lab.open_hour,
          company: price.lab.company,
          company_id: price.lab.company_id,
          price: [
            {
              id: price.id,
              price: price.price,
              formatted_price: price.formatted_price,
              created_date: price.created_date,
              exam: price.exam,
              exam_id: price.exam_id,
              lab_id: price.lab_id,
              lab: price.lab,
            },
          ],
          
        };

        addBagItem(itemToAdd);

        // ReactGA.event({
        //   category: 'select exam',
        //   action: 'add exam',
        //   label: `Added exam to bag: ${clickedPrice.exam.title} from lab ${
        //     clickedLab.company.title
        //   } - ${clickedLab.title} to bag ${user?.id && `- UserId ${user.id}`}`,
        // });

        user && mixpanel.identify(user.id);
        mixpanel.track('Add Exam To Bag', {
          Lab: price.lab.title,
          Company: price.lab.company.title,
          Exam: price.exam.title,
          Price: price.price,
        });
      })
    },
    [addBagItem, user],
  );
  
  function handleExamsChange(examId: string) {
    if (selectedExams.includes(examId)) {
      const exams = selectedExams.filter((exam) => exam !== examId);
      setSelectedExams(exams);
    } else { 
      setSelectedExams([ ...selectedExams, examId ]);
    }
  }
  
  return data ? (
    <>
      <Navbar />
        <Container>
          <Content>
            <CompanyTitle>
              <img src={data.lab.company.logo} alt="Logo da companhia"/>
              <div>
                <h1>{data.lab.title}</h1>
              </div>
            </CompanyTitle>
            <LabInfoContainer>
              <LabInfo icon={locationIcon}> 
                <LabInfo.InlineContent>
                  <LabInfo.Title>Localização</LabInfo.Title>
                  <Link href="">
                    <a>Ver no mapa</a>
                  </Link>
                </LabInfo.InlineContent>
                <LabInfo.Description>{data.lab.address}</LabInfo.Description>
              </LabInfo>
              <LabInfo icon={clockIcon}> 
                <LabInfo.Title>Horário de Atendimento</LabInfo.Title>
                <LabInfo.Description>{data.lab.open_hour}</LabInfo.Description>
                <LabInfo.Title>Horário de Coleta</LabInfo.Title>
                <LabInfo.Description>{data.lab.collect_hour}</LabInfo.Description>
              </LabInfo>
            </LabInfoContainer>
          </Content>
          <BagContainer>
            <div className="content-bag-container">
              <div className="header-content-bag-container">
                <span>Exames: {data.exams_found}</span>
                <button type="button" onClick={() => setDisplayListExams(!displayListExams)}>
                  {displayListExams ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </button>
              </div>
              {displayListExams && (
                <div className="list-exams">
                  <ExamContainer>
                    {data.prices.map((price) => {
                      return (
                        <div key={price.id}>
                          <Checkbox 
                            isChecked={selectedExams.includes(price.exam_id)}
                            onChange={() => handleExamsChange(price.exam_id)}
                            //description="Esse exame exige preparo" 
                            label={price.exam.title} 
                            id={price.exam.id}
                          />
                          <span>R$ {formatValueWo$(price.price)}</span>
                        </div>
                      )
                    })}
                  </ExamContainer>
                </div>
              )}
            </div>
            <div className="total-price-bag-container">
              <span>Valor Total:</span>
              <div className="content-price">
                <span>À vista R${formatValueWo$(data.total_price)} ou</span>
                <h2>12x de R$ {formatValueWo$((data.total_price / 12))}</h2>
              </div>
            </div>
            <div className="footer-bag-container">
              <Button onClick={() => handlePriceSelection()}>
                <img src={bagIcon} alt="Ícone de Carrinho"/>
                Adicionar ao Carrinho
              </Button>
            </div>
          </BagContainer>
        </Container>
      <Footer />
    </>
  ) : (<> </>)
}
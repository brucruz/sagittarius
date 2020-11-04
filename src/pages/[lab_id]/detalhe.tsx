import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import PriceFormatted from '@/@types/PriceFormatted';
import TotalPriceBagContainer from '@/components/molecule/TotalPriceBagContainer';
import PageTemplate from '@/components/templates/PageTemplate';
import {
  MdClose,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import Modal from '@/components/organisms/Modal';
import GoogleMap from '@/components/organisms/Map';
import useFetch from '@/services/hooks/useFetch';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import labIcon from '@/assets/components/molecules/LabInfo/lab.svg';
import clockIcon from '@/assets/components/molecules/LabInfo/clock.svg';
import locationIcon from '@/assets/components/molecules/LabInfo/location.svg';

import {
  Container,
  Content,
  CompanyTitle,
  BagContainer,
  ExamContainer,
  LabInfoContainer,
  ModalMapContent,
  ModalMapHeader,
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
import MapsScript from '@/services/components/MapsScript';
import { GetServerSideProps } from 'next';
import api from '@/services/api';

interface QueryParamsProps {
  ids?: string[];
  add?: string;
  lat?: string;
  lng?: string;
  lab_id?: string;
}

interface LabPricesResultFromAPI extends LabResultFromAPI {
  prices: PriceFormatted[];
}

interface LabDetailProps {
  labDetail: LabPricesResultFromAPI;
}

export default function Detail({ labDetail }: LabDetailProps) {
  const [displayListExams, setDisplayListExams] = useState(true);
  const [displayMap, setDisplayMap] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState<PriceFormatted[]>([]);

  const router = useRouter();

  const { addBagItems } = useBag();
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Lab Detail',
    });
  }, [user]);

  useEffect(() => {
    if (!labDetail) return;
    setSelectedPrices(labDetail.prices.map(price => price));
  }, [labDetail]);

  const selectedExamsTitles = selectedPrices.map(price => price.exam.title);
  const selectedPricesValues = selectedPrices.map(price => price.price);
  const selectedTotalPrice = selectedPricesValues.reduce(
    (total, price) => total + price,
    0,
  );

  const handlePriceSelection = useCallback((): void => {
    addBagItems(selectedPrices, labDetail.lab);

    user && mixpanel.identify(user.id);
    mixpanel.track('Add Exam To Bag', {
      Lab: labDetail.lab.title,
      Company: labDetail.lab.company.title,
      Exams: selectedExamsTitles,
      Prices: selectedPricesValues,
      'Total Price': selectedTotalPrice,
    });

    router.push('/carrinho');
  }, [addBagItems, selectedPrices, user]);

  function handlePriceChange(price: PriceFormatted) {
    if (selectedPrices.includes(price)) {
      const priceIndex = selectedPrices.findIndex(
        selectedPrice => price.id === selectedPrice.id,
      );
      const exams = selectedPrices.filter(
        (price, index) => index !== priceIndex && price,
      );
      setSelectedPrices(exams);
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  }

  const totalValue =
    selectedPrices.length > 0 &&
    selectedPrices.map(price => price.price)?.reduce((acc, cur) => acc + cur);

  return labDetail ? (
    <>
      <Navbar />
      <Container>
        <Content>
          <CompanyTitle>
            <img src={labDetail.lab.company.logo} alt="Logo da companhia" />
            <div>
              <h1>
                {labDetail.lab.company.title} - {labDetail.lab.title}
              </h1>
            </div>
          </CompanyTitle>
          <LabInfoContainer>
            <LabInfo icon={locationIcon}>
              <LabInfo.InlineContent>
                <LabInfo.Title>Localização</LabInfo.Title>
                <button type="button" onClick={() => setDisplayMap(true)}>
                  Ver no mapa
                </button>
              </LabInfo.InlineContent>
              <LabInfo.Description>{labDetail.lab.address}</LabInfo.Description>
            </LabInfo>
            <LabInfo icon={clockIcon}>
              <LabInfo.Title>Horário de Atendimento</LabInfo.Title>
              <LabInfo.Description>
                {labDetail.lab.open_hour}
              </LabInfo.Description>
              <LabInfo.Title>Horário de Coleta</LabInfo.Title>
              <LabInfo.Description>
                {labDetail.lab.collect_hour}
              </LabInfo.Description>
            </LabInfo>
          </LabInfoContainer>
        </Content>
        <BagContainer>
          <div className="content-bag-container">
            <div className="header-content-bag-container">
              <span>Exames: {labDetail.exams_found}</span>
              <button
                type="button"
                onClick={() => setDisplayListExams(!displayListExams)}
              >
                {displayListExams ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowUp />
                )}
              </button>
            </div>
            {displayListExams && (
              <div className="list-exams">
                <ExamContainer>
                  {labDetail.prices.map(price => {
                    return (
                      <div key={price.id}>
                        <Checkbox
                          isChecked={selectedPrices.includes(price)}
                          onChange={() => handlePriceChange(price)}
                          // description="Esse exame exige preparo"
                          label={price.exam.title}
                          id={price.exam.id}
                        />
                        <span>R$ {formatValueWo$(price.price)}</span>
                      </div>
                    );
                  })}
                </ExamContainer>
              </div>
            )}
          </div>
          <div className="total-price-bag-container">
            <span>Valor Total:</span>
            <div className="content-price">
              <span>À vista R${formatValueWo$(totalValue)} ou</span>
              <h2>12x de R$ {formatValueWo$(totalValue / 12)}</h2>
            </div>
          </div>
          <div className="footer-bag-container">
            <Button onClick={() => handlePriceSelection()}>
              <img src={bagIcon} alt="Ícone de Carrinho" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </BagContainer>
      </Container>
      <Modal isOpen={displayMap} setIsOpen={() => setDisplayMap(false)}>
        <ModalMapContent>
          <ModalMapHeader>
            <span>Localização</span>
            <MdClose onClick={() => setDisplayMap(false)} />
          </ModalMapHeader>
          <GoogleMap
            lat={Number(labDetail.lab.latitude)}
            lng={Number(labDetail.lab.longitude)}
          />
        </ModalMapContent>
      </Modal>
      <MapsScript />
      <Footer />
    </>
  ) : (
    <> </>
  );
}

export const getServerSideProps: GetServerSideProps<LabDetailProps> = async context => {
  const queryParams: QueryParamsProps = context.query;

  const { data } = await api.get<LabPricesResultFromAPI>(
    `/search/${queryParams.lab_id}/results`,
    {
      params: queryParams,
    },
  );

  return {
    props: {
      labDetail: data,
    },
  };
};

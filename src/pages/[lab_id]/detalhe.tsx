import { useState, useCallback, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import PriceFormatted from '@/@types/PriceFormatted';
import { useMediaQuery } from 'react-responsive';
import {
  MdClose,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import Modal from '@/components/organisms/Modal';
import GoogleMap from '@/components/organisms/Map';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
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
import Button from '@/components/atom/Button';
import bagIcon from '@/assets/pages/LabDetail/bag-icon.svg';
import Checkbox from '@/components/atom/Checkbox';
import formatValueWo$ from '@/utils/formatValueWo$';
import { useBag } from '@/hooks/bag';
import { useAuth } from '@/hooks/auth';
import MapsScript from '@/services/components/MapsScript';
import { GetServerSideProps } from 'next';
import api from '@/services/api';
import EditSearchWeb from '@/components/molecule/EditSearchWeb';
import EditSearchMobile from '@/components/molecule/EditSearchMobile';
import SEO from '@/components/atom/SEO';

interface QueryParamsProps {
  ids?: string[];
  'eSlg[]'?: string | string[];
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
  examsSlugs: string[] | string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export default function Detail({
  labDetail,
  examsSlugs,
  address,
  latitude,
  longitude,
}: LabDetailProps): ReactElement {
  const [displayListExams, setDisplayListExams] = useState(true);
  const [displayMap, setDisplayMap] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState<PriceFormatted[]>([]);
  const [isWeb, setIsWeb] = useState(false);

  const router = useRouter();

  const { addBagItems } = useBag();
  const { user } = useAuth();

  const webQuery = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setIsWeb(webQuery);
  }, [webQuery]);

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
  }, [
    addBagItems,
    selectedPrices,
    user,
    labDetail,
    router,
    selectedExamsTitles,
    selectedPricesValues,
    selectedTotalPrice,
  ]);

  function handlePriceChange(price: PriceFormatted): void {
    if (selectedPrices.includes(price)) {
      const priceIndex = selectedPrices.findIndex(
        selectedPrice => price.id === selectedPrice.id,
      );
      const exams = selectedPrices.filter(
        (examPrice, index) => index !== priceIndex && examPrice,
      );
      setSelectedPrices(exams);
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  }

  const totalValue =
    selectedPrices.length > 0 &&
    selectedPrices.map(price => price.price)?.reduce((acc, cur) => acc + cur);

  const examsTitles = labDetail.prices.map(price => price.exam.title);

  const addQuery = `add=${encodeURIComponent(address)}`;
  const latQuery = `lat=${encodeURIComponent(latitude)}`;
  const lngQuery = `lng=${encodeURIComponent(longitude)}`;

  const slugsQueryArray =
    typeof examsSlugs === 'string'
      ? `slg[]=${examsSlugs}`
      : examsSlugs.map(id => {
          const idFormatted = `slg[]=${id.toString()}`;

          return idFormatted;
        });

  const slugsQueryWithComma = slugsQueryArray.toString();

  const slugsQuery = slugsQueryWithComma.replace(/,/g, '&');

  const resultsSearchUrl = `?${slugsQuery}${address && `&${addQuery}`}${
    latitude && `&${latQuery}`
  }${longitude && `&${lngQuery}`}`;

  return labDetail ? (
    <>
      <SEO
        title={`${
          examsTitles.length === 1 ? `${examsTitles[0]}` : 'Exames'
        } em ${labDetail.lab.company.title} - ${labDetail.lab.title}`}
        description={`Agende aqui ${
          examsTitles.length === 1
            ? `o exame de ${examsTitles[0]}`
            : `os exames de ${examsTitles.join(', ')}`
        } no laboratório ${labDetail.lab.company.title} - ${
          labDetail.lab.title
        }`}
        canonical={`${labDetail.lab.slug}/${resultsSearchUrl}`}
      />

      <Navbar />
      {isWeb ? <EditSearchWeb /> : <EditSearchMobile />}
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
      params: {
        eSlg: queryParams['slg[]'],
        add: queryParams.add,
        lat: queryParams.lat,
        lng: queryParams.lng,
      },
    },
  );

  const examsSlugs = data.prices.map(price => price.exam.slug);

  return {
    props: {
      labDetail: data,
      examsSlugs,
      address: queryParams.add,
      latitude: queryParams.lat,
      longitude: queryParams.lng,
    },
  };
};

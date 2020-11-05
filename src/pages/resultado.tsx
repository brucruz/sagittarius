import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import NavBar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import {
  Content,
  Container,
  Card,
  CardHeader,
  CardFooter,
  HeaderInfo,
  // Stars,
  Price,
  LabResultList,
} from '@/styles/pages/LabResults';
import GoogleMap from '@/components/organisms/Map';
// import star from '@/assets/pages/LabResults/star-image.svg';
import { LabResultFromAPIFormatted } from '@/hooks/labResults';
import MapsScript from '@/services/components/MapsScript';
import { GetServerSideProps } from 'next';
import api from '@/services/api';
import formatDistance from '@/utils/formatDistance';
import formatValue from '@/utils/formatValue';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import { useRouter } from 'next/router';
import EditSearchMobile from '@/components/molecule/EditSearchMobile';
import EditSearchWeb from '@/components/molecule/EditSearchWeb';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import { useMediaQuery } from 'react-responsive';
import Lab from '@/@types/Lab';
import isArray from '@/utils/isArray';
import SEO from '@/components/atom/SEO';
import Exam from '@/@types/Exam';

interface QueryParamsProps {
  ids?: string[];
  add?: string;
  lat?: string;
  lng?: string;
}

interface LabResultCardProp {
  result: LabResultFromAPIFormatted;
  resultsSearchUrl: string;
}

interface LabResultsProps {
  labResults: LabResultFromAPIFormatted[];
  examsIds: string[] | string;
  exams: Exam[];
  address: string;
  lat: string;
  lng: string;
  // title: string;
}

const LabResultCard = ({
  result,
  resultsSearchUrl,
}: LabResultCardProp): ReactElement => {
  const router = useRouter();
  const { user } = useAuth();

  const handleTrackLabClick = useCallback(
    (lab: Lab): void => {
      user && mixpanel.identify(user.id);
      mixpanel.track('Select Lab', {
        Company: lab.company.title,
        Lab: lab.title,
      });

      router.push({
        pathname: `${result.lab.id}/detalhe`,
        search: resultsSearchUrl,
      });
    },
    [user, router, resultsSearchUrl, result],
  );

  return (
    <Card className="card">
      <CardHeader>
        <div className="img-div">
          <img src={result?.lab.company.logo} alt="Logo da companhia" />
        </div>
        <HeaderInfo>
          <h2>{`${result?.lab.company.title} - ${result?.lab.title}`}</h2>
          {/* <Stars>
            <img src={star} alt="Avaliações icon"/>
            <span>4.2 <span>(41 avaliações)</span></span>
          </Stars> */}
        </HeaderInfo>
      </CardHeader>
      <CardFooter>
        <div>
          <span className="amount-exams">
            {result?.exams_found} exames encontrados por:
          </span>
          <Price>
            <h2>12x de R$ {(result?.total_price / 12).toFixed(2)}</h2>
            <span>ou {result?.totalPriceFormatted}</span>
          </Price>
        </div>
        <button type="button" onClick={() => handleTrackLabClick(result.lab)}>
          Ver detalhes
        </button>
      </CardFooter>
    </Card>
  );
};

export default function LabResults({
  labResults,
  examsIds,
  address,
  exams,
  lat: latitude,
  lng: longitude,
}: // resultsSearchUrl
LabResultsProps): ReactElement {
  const [isWeb, setIsWeb] = useState(false);

  const { user } = useAuth();

  const webQuery = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setIsWeb(webQuery);
  }, [webQuery]);

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Lab Results',
    });
  }, [user]);

  //   const [scriptLoaded, setScriptLoaded] = useState(false);

  //   useEffect(() => {
  //     const googleMapScript = loadMapApi();
  //     googleMapScript.addEventListener('load', function () {
  //         setScriptLoaded(true);
  //     });
  // }, []);

  const labsLocation = useMemo(() => {
    const locations = labResults.map(result => {
      const { lab } = result;
      const marker = {
        name: `${lab.company.title} - ${lab.title}`,
        lat: lab.latitude,
        lng: lab.longitude,
        key: lab.id,
      };
      return marker;
    });
    return locations;
  }, [labResults]);

  const addQuery = `add=${address}`;
  const latQuery = `lat=${latitude}`;
  const lngQuery = `lng=${longitude}`;

  const idsQueryArray =
    typeof examsIds === 'string'
      ? `ids[]=${examsIds}`
      : examsIds.map(id => {
          const idFormatted = `ids[]=${id.toString()}`;

          return idFormatted;
        });

  const idsQueryWithComma = idsQueryArray.toString();

  const idsQuery = idsQueryWithComma.replace(/,/g, '&');

  const resultsSearchUrl = `?${idsQuery}&${addQuery}&${latQuery}&${lngQuery}`;

  const examsTitles = exams.map(exam => exam.title);

  // const geocoder = scriptLoaded && new google.maps.Geocoder();

  // scriptLoaded && geocoder.geocode({ address }, (results, status) => {
  //   if (status === "OK") {
  //     const firstResult = results[0];
  //     const addressComponents = firstResult.address_components;

  //     const neighbourhoodComponent = addressComponents.find(component => component.types.includes('sublocality'));
  //     const neighbourhood = neighbourhoodComponent.long_name;

  //     const cityComponent = addressComponents.find(component => component.types.includes('administrative_area_level_2'));
  //     const city = cityComponent.long_name;

  //     const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
  //     const state = stateComponent.short_name;
  //   } else {
  //     console.log("Geocode was not successful for the following reason: " + status);
  //   }
  // });

  return (
    <>
      <SEO
        title={`${
          examsTitles.length === 1
            ? `${examsTitles[0]} próximo a`
            : 'Exames próximos a'
        } ${address}`}
        description={`Escolha entre os ${
          labResults.length
        } laboratórios próximos a ${address} que oferecem ${
          examsTitles.length === 1
            ? `${examsTitles[0]}`
            : `os ${examsTitles.length} exames buscados (${examsTitles.join(
                ', ',
              )})`
        }`}
      />

      <NavBar />
      {isWeb && <EditSearchWeb />}
      <Container>
        <Content>
          <h1>Buscando {examsIds.length} Exames</h1>
          {!isWeb && <EditSearchMobile />}
          {labResults.length === 1 ? (
            <h3>{labResults.length} Laboratório encontrado</h3>
          ) : (
            <h3>{labResults.length} Laboratórios encontrados</h3>
          )}
          <LabResultList>
            {labResults.map(result => {
              return (
                <LabResultCard
                  key={result.lab.id}
                  result={result}
                  resultsSearchUrl={resultsSearchUrl}
                />
              );
            })}
          </LabResultList>
        </Content>
        {latitude && longitude && (
          <GoogleMap
            lat={Number(latitude)}
            lng={Number(longitude)}
            markers={labsLocation}
          />
        )}
      </Container>
      <MapsScript />
      <Footer />
    </>
  );
}

// eslint-disable-next-line consistent-return
export const getServerSideProps: GetServerSideProps<LabResultsProps> = async context => {
  const queryParams: QueryParamsProps = context.query;

  const examsIds = isArray(queryParams['ids[]'])
    ? queryParams['ids[]']
    : [queryParams['ids[]']];
  try {
    const { data } = await api.get<LabResultFromAPI[]>(`/search/results`, {
      params: context.query,
    });
    const ApiResults = data;

    const resultsFormatted = ApiResults.map(result => {
      return {
        ...result,
        distanceFormatted: formatDistance(result.distance),
        totalPriceFormatted: formatValue(result.total_price),
      };
    });

    const { data: exams } = await api.get<Exam[]>('exams/list', {
      params: {
        exam_ids: examsIds,
      },
    });

    return {
      props: {
        labResults: resultsFormatted,
        examsIds,
        exams,
        address: queryParams.add,
        lat: queryParams.lat,
        lng: queryParams.lng,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

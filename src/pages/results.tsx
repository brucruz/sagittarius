import { useCallback, useEffect, useMemo } from 'react';
import NavBar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { Content, Container, Card, CardHeader, CardFooter, HeaderInfo, Stars, Price, LabResultList } from '@/styles/pages/LabResults';
import GoogleMap from '@/components/organisms/Map';
import img from '@/assets/rect.svg';
import star from '@/assets/pages/LabResults/star-image.svg';
import { LabResultFromAPIFormatted } from '@/hooks/labResults';
import MapsScript from '@/services/components/MapsScript';
import { GetServerSideProps } from 'next';
import api from '@/services/api';
import formatDistance from '@/utils/formatDistance';
import formatValue from '@/utils/formatValue';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import Lab from '@/@types/Lab';
import isArray from '@/utils/isArray';

interface QueryParamsProps {
  ids?: string[];
  add?: string;
  lat?: string;
  lng?: string;
}

interface LabResultCardProp {
  result: LabResultFromAPIFormatted
  resultsSearchUrl: string;
}

interface LabResultsProps {
  labResults: LabResultFromAPIFormatted[];
  examsIds: string[] | string;
  address: string;
  lat: string;
  lng: string;
}

const LabResultCard = ({
  result,
  resultsSearchUrl
}: LabResultCardProp) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Lab Results',
    });
  }, [user]);

  const handleTrackLabClick = useCallback(
    (lab: Lab): void => {
      user && mixpanel.identify(user.id);
      mixpanel.track('Select Lab', {
        Company: lab.company.title,
        Lab: lab.title,
      });

      router.push({ pathname: `${result.lab.id}/detail`, search: resultsSearchUrl })
    },
    [user, router, resultsSearchUrl],
  );

  return (
    <Card className="card">
      <CardHeader>
        <div className="img-div">
          <img src={result?.lab.company.logo} alt="Logo da companhia"/>
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
          <span className="amount-exams">{result?.exams_found} exames encontrados por:</span>
          <Price>
            <h2>12x de R$ {((result?.total_price)/12).toFixed(2)}</h2>
            <span>ou {result?.totalPriceFormatted}</span>
          </Price>
        </div>
        <button onClick={() => handleTrackLabClick(result.lab)}>Ver detalhes</button>
      </CardFooter>
    </Card>
  );
}

export default function LabResults({
  labResults,
  examsIds,
  address,
  lat: latitude,
  lng: longitude,
  // resultsSearchUrl
}: LabResultsProps) {
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
    typeof examsIds === 'string' ?
    `ids[]=${examsIds}` :
      examsIds.map(id => {
        const idFormatted = `ids[]=${id.toString()}`;

        return idFormatted;
      });

  const idsQueryWithComma = idsQueryArray.toString();

  const idsQuery = idsQueryWithComma.replace(/,/g, '&');

  const resultsSearchUrl = `?${idsQuery}&${addQuery}&${latQuery}&${lngQuery}`;

  return (
    <>
      <NavBar />
        <Container>
          <Content>
            <h1>Buscando {examsIds.length} Exames</h1>

            {labResults.length === 1 ? (
              <h3>{labResults.length} Laboratório encontrado</h3>
            ) : (
              <h3>{labResults.length} Laboratórios encontrados</h3>
            )}

            <LabResultList>
              {labResults.map((result) => {
                return (
                  <LabResultCard result={result} resultsSearchUrl={resultsSearchUrl}/>
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

export const getServerSideProps: GetServerSideProps<LabResultsProps> = async (context) => {
  const queryParams: QueryParamsProps = context.query;

  const examsIds = isArray(queryParams['ids[]']) ? queryParams['ids[]'] : [queryParams['ids[]'] ];
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

    return {
      props: {
        labResults: resultsFormatted,
        examsIds,
        address: queryParams.add,
        lat: queryParams.lat,
        lng: queryParams.lng,
      },
    }
  } catch (err) {
    console.log(err);
  }

}

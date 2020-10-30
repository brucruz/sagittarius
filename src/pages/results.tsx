import { useCallback, useMemo } from 'react';
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
  examsIds: string[];
  lat: string;
  lng: string;
  resultsSearchUrl: string;
}

const LabResultCard = ({ result, resultsSearchUrl }: LabResultCardProp) => {
  const router = useRouter();
  const { user } = useAuth();

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

export default function LabResults({ labResults, examsIds, lat, lng, resultsSearchUrl }: LabResultsProps) {
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
          {lat && lng && (
            <GoogleMap
              lat={Number(lat)}
              lng={Number(lng)}
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

  const examsIds = queryParams['ids[]'];
  const address = queryParams.add;
  const latitude = Number(queryParams.lat);
  const longitude = Number(queryParams.lng);

  const addQuery = `add=${address}`;
  const latQuery = `lat=${latitude}`;
  const lngQuery = `lng=${longitude}`;

  const idsQueryArray = examsIds.map(id => {
    const idFormatted = `ids[]=${id.toString()}`;

    return idFormatted;
  });

  const idsQueryWithComma = idsQueryArray.toString();

  const idsQuery = idsQueryWithComma.replace(/,/g, '&');

  const resultsSearchUrl = `?${idsQuery}&${addQuery}&${latQuery}&${lngQuery}`;

  try {
    const { data } = await api.get<LabResultFromAPI[]>('/search/results', {
      params: {
        ids: examsIds,
        add: address,
        lat: latitude,
        lng: longitude,
        // completeOnly: options?.onlyExamsCompleteLabs,
        // dist: options?.maxDistance,
        // brands: options?.brands,
      },
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
        lat: queryParams.lat,
        lng: queryParams.lng,
        resultsSearchUrl,
      }
    }
  } catch (err) {
    console.log(err);
  }

}

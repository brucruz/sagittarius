import { useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import isArray from '@/utils/isArray';
import NavBar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { Content, Container, Card, CardHeader, CardFooter, HeaderInfo, Stars, Price, LabResultList } from '@/styles/pages/LabResults';
import GoogleMap from '@/components/organisms/Map';
import { useLabResults } from '@/hooks/labResults';
import { useSearchExam } from '@/hooks/searchExam';
import { useToast } from '@/hooks/toast';
import img from '@/assets/rect.svg';
import star from '@/assets/pages/LabResults/star-image.svg';
import { LabResultFromAPIFormatted } from '@/hooks/labResults';

interface QueryParamsProps {
  ids?: string[];
  add?: string;
  lat?: string;
  lng?: string;
}

interface LabResultCardProp {
  data: LabResultFromAPIFormatted
}

const LabResultCard = ({ data }: LabResultCardProp) => {
  console.log(data);
  return (
    <Card className="card">
      <CardHeader>
        <div className="img-div">
          <img src={data.lab.company.logo} alt="Logo da companhia"/>
        </div>
        <HeaderInfo>
          <h2>{data.lab?.title}</h2>
          {/* <Stars>
            <img src={star} alt="Avaliações icon"/>
            <span>4.2 <span>(41 avaliações)</span></span>
          </Stars> */}
        </HeaderInfo>
      </CardHeader>
      <CardFooter>
        <div>
          <span className="amount-exams">{data?.total_exams} exames encontrados por:</span>
          <Price>
            <h2>12x de R$ {((data?.total_price)/12).toFixed(2)}</h2>
            <span>ou {data?.totalPriceFormatted}</span>
          </Price>
        </div>
        <button>Ver detalhes</button>
      </CardFooter>
    </Card>
  );
}

export default function LabResults() {

  const router = useRouter();
  const queryParams: QueryParamsProps = router.query;

  const { exams, address } = useSearchExam();
  const { results, getLabResults } = useLabResults();
  const { addToast } = useToast();

  const labsLocation = useMemo(() => {
    const locations = results.map(result => {
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
  }, [results]);

  const examsIds = useMemo(() => {
    const ids = exams.map(exam => exam.id);

    return ids;
  }, [exams]);

  useEffect(() => {
    if (queryParams) {
      getLabResults({
        examsIds: queryParams['ids[]'],
        address: queryParams.add,
        latitude: Number(queryParams.lat),
        longitude: Number(queryParams.lng),
      });
    } else if (examsIds && address) {
      getLabResults({
        examsIds,
        address: address.address,
        latitude: address.latitude,
        longitude: address.longitude,
      });
    } else {
      router.push('/');
      addToast({
        type: 'info',
        title: 'Informações faltantes',
        description:
          'Para pesquisar, informe os exames e um endereço de referência',
      });
    }
  }, [examsIds, address, getLabResults, queryParams, addToast, router]);

  return (
    <>
      <NavBar />
        <Container>
          <Content>
            <h1>Buscando 3 Exames</h1> 
            <LabResultList>
              {results.map((lab) => {
                console.log(lab);
                return (
                  <LabResultCard data={lab}/>
                );
              })}
            </LabResultList>
          </Content>
          {queryParams?.lat && (
            <GoogleMap
              lat={Number(queryParams?.lat)}
              lng={Number(queryParams?.lng)}
              markers={labsLocation}
            />
          )}
        </Container>
      <Footer />
    </>    
  );
}
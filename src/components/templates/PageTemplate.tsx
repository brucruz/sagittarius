import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import PageHeader from '../molecule/PageHeader';
import TitleMain from '../molecule/TitleMain';
import { Container } from '../../styles/components/templates/PageTemplate';
import { HTMLAttributes } from 'react';
import { UrlObject } from 'url';
interface PageTemplateProps extends HTMLAttributes<HTMLDivElement>{
  titleMain?: {
    title?: string,
    subTitle?: string,
  };
  backLinkUrl: UrlObject | string;
}

const PageTemplate = ({ children, titleMain, backLinkUrl }: PageTemplateProps) => {
  return (
    <>
      <Navbar />
        <Container>
          <PageHeader type='link' backLinkUrl={backLinkUrl}/>

          {titleMain && <TitleMain title={titleMain.title} subtitle={titleMain.subTitle}/> }

          <div>
            { children }
          </div>
        </Container>
      <Footer />
    </>
  );
}

export default PageTemplate;

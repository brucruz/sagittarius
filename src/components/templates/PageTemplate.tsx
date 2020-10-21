import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import PageHeader from '../molecule/PageHeader';
import TitleMain from '../molecule/TitleMain';
import { Container } from '../../styles/components/templates/PageTemplate';

interface PageTemplateProps extends HTMLDivElement {
  titleMain?: {
    title?: string,
    subTitle?: string,
  };
  backLinkUrl: string;
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
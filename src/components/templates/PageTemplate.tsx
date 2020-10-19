import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import PageHeader from '../molecule/PageHeader';
import TitleMain from '../molecule/TitleMain';
import { Container } from '../../styles/components/templates/PageTemplate';

interface PageTemplate {
  titleMain?: {
    title?: string,
    subTitle?: string,
  };
  backButtonCallback: () => void;
}

const PageTemplate: React.FC<PageTemplate> = ({ children, titleMain, backButtonCallback }) => {
  return (
    <>
      <Navbar />
        <Container>
          <PageHeader type='button' backButtonStateCallback={backButtonCallback}/>

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
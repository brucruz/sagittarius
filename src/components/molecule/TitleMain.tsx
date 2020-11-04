import { ReactElement } from 'react';
import { TitleMainContainer } from '@/styles/components/molecules/TitleMain';

interface TitleMainProps {
  title: string;
  subtitle?: string;
}

const TitleMain = ({ title, subtitle }: TitleMainProps): ReactElement => {
  return (
    <TitleMainContainer>
      <h1>{title}</h1>

      {subtitle && <h3>{subtitle}</h3>}
    </TitleMainContainer>
  );
};

export default TitleMain;

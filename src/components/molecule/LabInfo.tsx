import { HTMLAttributes, ReactElement } from 'react';
import {
  Container,
  Content,
  ContainerInline,
} from '@/styles/components/molecules/LabInfo';

interface LabInfo extends HTMLAttributes<HTMLDivElement> {
  icon: any;
}

const Title = ({ children }): ReactElement => {
  return <h2>{children}</h2>;
};

const Description = ({ children }): ReactElement => {
  return <p>{children}</p>;
};

const InlineContent = ({ children }): ReactElement => {
  return <ContainerInline>{children}</ContainerInline>;
};

const LabInfo = ({ icon, children }: LabInfo): ReactElement => {
  return (
    <Container>
      <div>
        <img src={icon} alt="ícone" />
      </div>
      <Content>{children}</Content>
    </Container>
  );
};

LabInfo.Title = Title;
LabInfo.Description = Description;
LabInfo.InlineContent = InlineContent;

export default LabInfo;

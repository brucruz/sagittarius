import { HTMLAttributes } from 'react';
import {
  Container,
  Content,
  ContainerInline,
} from '@/styles/components/molecules/LabInfo';

interface LabInfo extends HTMLAttributes<HTMLDivElement> {
  icon: any;
}

const Title = ({ children }) => {
  return <h2>{children}</h2>;
};

const Description = ({ children }) => {
  return <p>{children}</p>;
};

const InlineContent = ({ children }) => {
  return <ContainerInline>{children}</ContainerInline>;
};

const LabInfo = ({ icon, children }: LabInfo) => {
  return (
    <Container>
      <div>
        <img src={icon} />
      </div>
      <Content>{children}</Content>
    </Container>
  );
};

LabInfo.Title = Title;
LabInfo.Description = Description;
LabInfo.InlineContent = InlineContent;

export default LabInfo;

import { NextComponentType } from 'next';
import {
  Container,
  SectionItem,
  SectionItemImg,
  SectionItemText,
} from '@/styles/components/organisms/Section';
import { HTMLAttributes, ReactElement } from 'react';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: {
    id: number;
    image: any;
    title: string;
    text: string;
  }[];
}

const Section = ({ title, articles, ...rest }: SectionProps): ReactElement => {
  return (
    <Container {...rest}>
      <h2>{title}</h2>

      <div className="items-div">
        {articles.map(article => (
          <SectionItem key={article.id}>
            <SectionItemImg>
              <img src={article.image} alt="" />
            </SectionItemImg>

            <SectionItemText>
              <h3>{article.title}</h3>

              <p>{article.text}</p>
            </SectionItemText>
          </SectionItem>
        ))}
      </div>
    </Container>
  );
};

export default Section;

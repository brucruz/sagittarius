import { NextComponentType } from 'next'
import { Container, SectionItem, SectionItemImg, SectionItemText } from "@/styles/components/organisms/Section";

interface SectionProps {
  title: string;
  articles: {
    id: number;
    image: any;
    title: string;
    text: string;
  }[]
}

const Section = ({
  title,
  articles,
}: SectionProps) => {
  return (
    <Container>
      <h2>{title}</h2>

      {articles.map(article => (
        <SectionItem key={article.id}>
          <SectionItemImg>
            <img src={article.image} alt=""/>
          </SectionItemImg>

          <SectionItemText>
            <h3>{article.title}</h3>

            <p>{article.text}</p>
          </SectionItemText>
        </SectionItem>
      ))}
    </Container>
  )
}

export default Section;

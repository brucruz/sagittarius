import leftArrow from '@/assets/components/atoms/ButtonBack/leftArrow.svg';
import { LinkBackContainer } from '@/styles/components/atom/LinkBack';
import Link from 'next/link';

interface LinkBackProps {
  url: string;
}

const LinkBack = ({url}: LinkBackProps) => {
  return (
    <Link href={url}>
      <LinkBackContainer>
        <img src={leftArrow} alt="voltar"/>
      </LinkBackContainer>
    </Link>
  )
}

export default LinkBack;

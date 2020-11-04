import leftArrow from '@/assets/components/atoms/ButtonBack/leftArrow.svg';
import { LinkBackContainer } from '@/styles/components/atom/LinkBack';
import Link from 'next/link';
import { ReactElement } from 'react';
import { UrlObject } from 'url';

interface LinkBackProps {
  url: UrlObject | string;
}

const LinkBack = ({ url }: LinkBackProps): ReactElement => {
  return (
    <Link href={url}>
      <LinkBackContainer>
        <img src={leftArrow} alt="voltar" />
      </LinkBackContainer>
    </Link>
  );
};

export default LinkBack;

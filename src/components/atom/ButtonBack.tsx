import leftArrow from '@/assets/components/atoms/ButtonBack/leftArrow.svg';
import { ButtonBackContainer } from '@/styles/components/atom/ButtonBack';
import { ButtonHTMLAttributes } from 'react';

const ButtonBack = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <ButtonBackContainer {...rest}>
      <img src={leftArrow} alt="voltar" />
    </ButtonBackContainer>
  );
};

export default ButtonBack;

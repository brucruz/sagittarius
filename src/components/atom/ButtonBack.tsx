import leftArrow from '@/assets/components/atoms/ButtonBack/leftArrow.svg';
import { ButtonBackContainer } from '@/styles/components/atom/ButtonBack';
import { ButtonHTMLAttributes, ReactElement } from 'react';

const ButtonBack = ({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  return (
    <ButtonBackContainer {...rest}>
      <img src={leftArrow} alt="voltar" />
    </ButtonBackContainer>
  );
};

export default ButtonBack;

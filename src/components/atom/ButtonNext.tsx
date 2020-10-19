import next from '@/assets/components/atoms/next.svg';
import { Container } from '@/styles/components/atom/ButtonNext';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonNextProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const ButtonNext = ({text, ...rest}: ButtonNextProps) => {
  return (
    <Container {...rest}>
      <p>{text.toUpperCase()}</p>

      <img src={next} alt=""/>
    </Container>
  )
}

export default ButtonNext;

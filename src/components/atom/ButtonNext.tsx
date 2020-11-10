import next from '@/assets/components/atoms/next.svg';
import { Container } from '@/styles/components/atom/ButtonNext';
import { ButtonHTMLAttributes, ReactElement } from 'react';

type ButtonNextProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const ButtonNext = ({
  text,
  disabled,
  ...rest
}: ButtonNextProps): ReactElement => {
  return (
    <Container data-testid="button-next-atom" disabled={disabled} {...rest}>
      <p>{text}</p>

      <img src={next} alt="" />
    </Container>
  );
};

export default ButtonNext;

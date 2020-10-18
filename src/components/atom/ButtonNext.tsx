import next from '@/assets/components/atoms/next.svg';
import { Container } from '@/styles/components/atom/ButtonNext';

interface ButtonNextProps {
  text: string;
}

const ButtonNext = ({text}: ButtonNextProps) => {
  return (
    <Container>
      <p>{text.toUpperCase()}</p>

      <img src={next} alt=""/>
    </Container>
  )
}

export default ButtonNext;

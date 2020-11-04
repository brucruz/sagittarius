import { ReactElement } from 'react';
import formatValueWo$ from '@/utils/formatValueWo$';
import { Container } from '@/styles/components/molecules/TotalPriceBagContainer';

interface TotalPriceBagContainerProps {
  totalPrice: number;
}

const TotalPriceBagContainer = ({
  totalPrice,
}: TotalPriceBagContainerProps): ReactElement => {
  return (
    <Container>
      <span>Valor Total:</span>
      <div className="content-price">
        <span>À vista R${formatValueWo$(totalPrice)} ou</span>
        <h2>12x de R$ {formatValueWo$(totalPrice / 12)}</h2>
      </div>
    </Container>
  );
};

export default TotalPriceBagContainer;

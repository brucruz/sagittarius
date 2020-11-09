import { render, fireEvent } from '@testing-library/react';
import ButtonBack from '@/components/atom/ButtonBack';
import leftArrow from '@/assets/components/atoms/ButtonBack/leftArrow.svg';
import { ButtonHTMLAttributes } from 'react';

interface ButtonBackTestProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const setup = ({ onClick }: ButtonBackTestProps): any => {
  const { getByTestId } = render(
    <ButtonBack onClick={onClick}>
      <img src={leftArrow} alt="voltar" />
    </ButtonBack>,
  );
  return { getByTestId };
};

describe('<ButtonBack />', () => {
  it('Should render Button Back component', () => {
    const { getByTestId } = setup({});
    expect(getByTestId('button-back-atom')).toBeDefined();
  });

  it('onClick should works with any function', () => {
    const onClick = jest.fn(() => console.log('Hello World'));

    const { getByTestId } = setup({
      onClick,
    });

    fireEvent.click(getByTestId('button-back-atom'));
    expect(onClick).toHaveBeenCalled();
  });
});

import { render, fireEvent } from '@testing-library/react';
import { ButtonHTMLAttributes } from 'react';
import ButtonNext from '@/components/atom/ButtonNext';

interface ButtonNextTestProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

const setup = ({ text, disabled, onClick }: ButtonNextTestProps): any => {
  const { getByTestId } = render(
    <ButtonNext text={text} disabled={disabled} onClick={onClick} />,
  );

  return { getByTestId };
};

describe('<ButtonNext />', () => {
  it('Should render ButtonNext component', () => {
    const { getByTestId } = setup({ text: 'Any Text Here', disabled: false });
    expect(getByTestId('button-next-atom')).toBeDefined();
  });

  it('ButtonNext should work with any onClick function', () => {
    const onClick = jest.fn(() => console.log('Hello World'));

    const { getByTestId } = setup({
      text: 'any text here',
      disabled: false,
      onClick,
    });

    fireEvent.click(getByTestId('button-next-atom'));
    expect(onClick).toHaveBeenCalled();
  });

  it('ButtonNext should not to fire onClick if it is disabled', () => {
    const onClick = jest.fn(() => console.log('Hello World'));

    const { getByTestId } = setup({
      text: 'any text here',
      disabled: true,
      onClick,
    });

    fireEvent.click(getByTestId('button-next-atom'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

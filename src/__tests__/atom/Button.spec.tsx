import { fireEvent, render } from '@testing-library/react';
import Button from '@/components/atom/Button';
import { ButtonHTMLAttributes } from 'react';

interface ButtonTestProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const setup = ({ children, onClick }: ButtonTestProps): any => {
  const { getByTestId } = render(<Button onClick={onClick}>{children}</Button>);
  return { getByTestId };
};

describe('<Button />', () => {
  it('Should render Button component', () => {
    const { getByTestId } = setup({ children: 'any text here' });
    expect(getByTestId('button-atom')).toBeDefined();
  });

  it('Should render button with an A tag', () => {
    const { getByTestId } = setup(<a>Any Text Here</a>);
    expect(getByTestId('button-atom')).toBeDefined();
  });

  it('Should works onClick with any function', () => {
    const onClick = jest.fn(() => console.log('Hello World'));

    const { getByTestId } = setup({
      children: 'any text here',
      onClick,
    });

    fireEvent.click(getByTestId('button-atom'));
    expect(onClick).toHaveBeenCalled();
  });
});

import { render } from '@testing-library/react';
import HeaderSpace from '@/components/atom/HeaderSpace';

const setup = (): any => {
  const { getByTestId } = render(<HeaderSpace />);
  return { getByTestId };
};

describe('<HeaderSpace />', () => {
  it('Should render HeaderSpace component', () => {
    const { getByTestId } = setup();

    expect(getByTestId('header-space-atom')).toBeDefined();
  });
});

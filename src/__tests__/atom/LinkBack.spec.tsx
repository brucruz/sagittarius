import LinkBack from '@/components/atom/LinkBack';
import { render } from '@testing-library/react';
import { UrlObject } from 'url';

import '@testing-library/jest-dom';

interface LinkBackTestProps {
  url: UrlObject | string;
}

const setup = ({ url }: LinkBackTestProps): any => {
  const { getByTestId } = render(<LinkBack url={url} />);
  return { getByTestId };
};

describe('<LinkBack />', () => {
  it('Should render Link Back component', () => {
    const { getByTestId } = setup({ url: 'heali.me' });
    expect(getByTestId('link-back-atom')).toBeDefined();
  });

  it('Should has href', () => {
    const url = '/heali.me';

    const { getByTestId } = setup({ url });

    expect(getByTestId('link-back-atom')).toHaveAttribute('href', url);
  });
});
